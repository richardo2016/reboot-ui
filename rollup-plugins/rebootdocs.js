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

function addLeadInfoForPage (html, attributes) {
    return `\
<h1 class="bd-title" id="content">${attributes.title}</h1>\
<p class="bd-lead">${attributes.description}</p>\
${html}\
`
}
 
const defaults = {
  dom: false,
  exclude: null,
  include: ['**/*.md', '**/*.markdown'],
  basedir: process.cwd(),
  destjsondir: null
};

function sortNavs (navs) {
    return navs.sort((a, b) => a.relpath < b.relpath ? -1 : 1)
}

function normalizeToPosixPath (relpath) {
    return path.normalize(relpath).split(path.sep).join(path.posix.sep)
}

// export a function that can take configuration options
const markdown = (inputopts = {}) => {
    const options = Object.assign({}, defaults, inputopts);

    // include or exclude files
    const filter = createFilter(options.include, options.exclude);

    const navs = {};
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
                Object.keys(navs).forEach(versionType => {
                    const jsonpath = path.resolve(options.destjsondir, `${versionType}/manifest.json`)
                    shelljs.mkdir('-p', path.dirname(jsonpath))

                    fs.writeFileSync(jsonpath, toSource(sortNavs(navs[versionType]), { pretty: !isProduction }))
                });
            }
        },

        // transform source code
        transform: (sourcecode, id) => {
            // exit without transforming if the filter prohibits this id
            if (!filter(id)) return null;

            /* transform :start */
            const fm = frontmatter(sourcecode)
            let result = fm.body
            
            result = lqengine.parseAndRenderSync(result, {...lqglobals}, {globals: lqglobals})
            result = lqengine2.parseAndRenderSync(result, {...lqglobals}, {globals: lqglobals})
            
            const markedOptions = {
                highlight: function(code) { return code },
                ...options.marked,
            }
            result = marked(result, markedOptions)
            /* transform :end */

            const basedir = path.normalize(options.basedir)
            const relname = path.relative(basedir, id)
            const extname = path.extname(id)
            const basename = path.basename(id)
            const platform_relname = path.normalize(relname)

            const [versionType, group = 'common'] = path.normalize(relname).split(path.sep) || []
            const regexp = new RegExp(`${extname}$`, 'i')
            
            const name = basename.replace(regexp, '')
            const reljsonpath = platform_relname.replace(regexp, '.json')

            result = addLeadInfoForPage(result, fm.attributes)

            const navInfo = {
                name,
                versionType,
                type: group,
                group,
                basename,
                relpath: normalizeToPosixPath(platform_relname).replace(regexp, '.json'),
                attributes: fm.attributes,
            }

            // console.log('navInfo', navInfo);
            
            navs[versionType] = navs[versionType] || [];
            navs[versionType].push(navInfo)
            const pageInfo = {...navInfo, html: result}

            if (inputopts.destjsondir) {
                const jsonpath = path.resolve(options.destjsondir, reljsonpath)
                shelljs.mkdir('-p', path.dirname(jsonpath))
                fs.writeFileSync(jsonpath, toSource(pageInfo, { pretty: !isProduction }))
            }
            
            return {
                code: `export default ${options.writeFileOnly ? toSource(null) : toSource(pageInfo)}`,
                map: { mappings: '' }
            }
        }

    };

    return plugin;

};

export default markdown;