import fs from 'fs'
import path from 'path'
import frontmatter from 'front-matter'
import { createFilter } from '@rollup/pluginutils';

import marked from 'marked'
import nunjucks from 'nunjucks'
import shelljs from 'shelljs'

import { isProduction } from './build-env'

function registerNunjucksTag () {
    const env = new nunjucks.Environment();

    require('./rollup-plugins/nunjucks/tag-capture')(env);
    require('./rollup-plugins/nunjucks/tag-highlight')(env);

    return env;
}

const toSource = function (input, { pretty = false } = {}) {
    if (pretty)
        return JSON.stringify(input, null, '\t')
        
    return JSON.stringify(input)
}
 
const defaults = {
  dom: false,
  exclude: null,
  include: ['**/*.md', '**/*.markdown'],
  basedir: process.cwd(),
  destjsondir: null
};

// export a function that can take configuration options
const markdown = (inputopts = {}) => {
    const options = Object.assign({}, defaults, inputopts);

    // include or exclude files
    const filter = createFilter(options.include, options.exclude);

    const njenv = registerNunjucksTag();

    const navs = [];

    const plugin = {
        name: 'markdown',

        writeBundle: () => {
            if (inputopts.destjsondir) {
                const jsonpath = path.resolve(options.destjsondir, 'manifest.json')
                shelljs.mkdir('-p', path.dirname(jsonpath))
                fs.writeFileSync(jsonpath, toSource(navs, { pretty: !isProduction }))
            }
        },

        // transform source code
        transform: (sourcecode, id) => {
            // exit without transforming if the filter prohibits this id
            if (!filter(id)) return null;

            const fm = frontmatter(sourcecode)
            let result = fm.body
            
            result = marked(result, {
                highlight: function(code) {
                    return require('highlight.js').highlightAuto(code, ['html']).value;
                },
                ...options.marked,
            })
            result = njenv.renderString(result, {})
            
            const relname = path.relative(options.basedir, id)
            const extname = path.extname(id)
            const basename = path.basename(id)

            const [type = 'common'] = path.posix.normalize(relname).split('/') || []
            const regexp = new RegExp(`${extname}$`, 'i')

            const reljsonpath = relname.replace(regexp, '.json')
            navs.push(reljsonpath)

            const code = {
                name: basename.replace(regexp, ''),
                type,
                basename,
                relname: reljsonpath,
                attributes: fm.attributes,
                html: (result),
            }

            if (inputopts.destjsondir) {
                const jsonpath = path.resolve(options.destjsondir, reljsonpath)
                shelljs.mkdir('-p', path.dirname(jsonpath))
                fs.writeFileSync(jsonpath, toSource(code, { pretty: !isProduction }))
            }
            
            return {
                code: `export default ${toSource(code)}`,
                map: { mappings: '' }
            }
        }

    };

    return plugin;

};

export default markdown;