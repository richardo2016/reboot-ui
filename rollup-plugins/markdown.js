import path from 'path'
import frontmatter from 'front-matter'
import { createFilter } from '@rollup/pluginutils';

import marked from 'marked'
import nunjucks from 'nunjucks'

function registerNunjucksTag () {
    const env = new nunjucks.Environment();

    require('./rollup-plugins/nunjucks/tag-capture')(env);
    require('./rollup-plugins/nunjucks/tag-highlight')(env);

    return env;
}

const toSource = function (str) {
    return JSON.stringify(str)
}
 
const defaults = {
  dom: false,
  exclude: null,
  include: ['**/*.md', '**/*.markdown'],
  basedir: process.cwd()
};

// export a function that can take configuration options
const markdown = (options = {}) => {
    options = Object.assign({}, defaults, options);

    // include or exclude files
    const filter = createFilter(options.include, options.exclude);

    const njenv = registerNunjucksTag();

    const plugin = {
        name: 'markdown',

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

            const code = {
                name: basename.replace(new RegExp(`${extname}$`, 'i'), ''),
                type,
                basename,
                relname,
                frontmatter: (fm),
                source: (sourcecode),
                html: (result),
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