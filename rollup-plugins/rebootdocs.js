import fs from 'fs'
import path from 'path'
import frontmatter from 'front-matter'
import { createFilter } from '@rollup/pluginutils';

import marked from 'marked'
import shelljs from 'shelljs'

import YAML from 'js-yaml'

import { Liquid } from '@reboot-ui/liquidjs';

import { isProduction } from './build-env'

function getLiquidEngine (options = {}) {
    const lqengine = new Liquid(options);

    lqengine.plugin(require('./rollup-plugins/liquidjs/tag-highlight'))
    lqengine.plugin(require('./rollup-plugins/liquidjs/filter-markdownify'))

    return lqengine;
}

function loadSiteData () {
    const sitedata = {};
    const basedir = path.resolve(__dirname, './src/pages/reboot-ui/_data')

    const ymls = fs.readdirSync(basedir)

    ymls.forEach((ymlname) => {
        const ext = path.extname(ymlname);
        const filename = path.resolve(basedir, ymlname);
        const fieldname = ymlname.replace( new RegExp(`${ext}$`), '' )

        const filecontent = YAML.safeLoad(
            fs.readFileSync(filename, 'utf8')
        )

        sitedata[fieldname] = filecontent;
    })

    return sitedata;
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

    const navs = [];
    const sitedata = loadSiteData();
    const lqglobals = {
        site: { data: sitedata },
    }

    options.globals = lqglobals;

    const lqengine = getLiquidEngine(options.liquidjs);
    const lqengine2 = getLiquidEngine({
        ...options.liquidjs,
        tagDelimiterLeft: '{%-',
        tagDelimiterRight: '-%}',
        outputDelimiterLeft: '{{-',
        outputDelimiterRight: '-}}',
    });

    const plugin = {
        name: 'rebootdocs',

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
            
            result = lqengine.parseAndRenderSync(result, {...lqglobals}, {globals: lqglobals})
            result = lqengine2.parseAndRenderSync(result, {...lqglobals}, {globals: lqglobals})
            
            result = marked(result, {
                highlight: function(code) {
                    return code;
                },
                ...options.marked,
            })
            
            const relname = path.relative(options.basedir, id)
            const extname = path.extname(id)
            const basename = path.basename(id)

            const [type = 'common'] = path.posix.normalize(relname).split('/') || []
            const regexp = new RegExp(`${extname}$`, 'i')
            
            const name = basename.replace(regexp, '')
            const reljsonpath = relname.replace(regexp, '.json')
            
            navs.push({
                type: type,
                relpath: reljsonpath,
                name: name,
            })

            const code = {
                name: name,
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
                code: `export default ${options.outputOnly ? toSource(null) : toSource(code)}`,
                map: { mappings: '' }
            }
        }

    };

    return plugin;

};

export default markdown;