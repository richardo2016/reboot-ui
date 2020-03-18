const fs = require('fs')
const path = require('path')
const frontmatter = require('front-matter')
const { createFilter } = require('@rollup/pluginutils')

const marked = require('marked')
const shelljs = require('shelljs')
const YAML = require('js-yaml')
const htmlEscaper = require('html-escaper')

const { Liquid } = require('@reboot-ui/liquidjs')

const { isProduction } = require('./build-env')

const { Prism } = require('../rollup-plugins/prism')

/**
 * @description for customize marked render
 */
function getMarkedRender () {
    const renderer = new marked.Renderer();
    const origCode = renderer.code;

    function wrapToFigureTag(html) {
        return ''
        + '<figure class="highlight">'
        + html
        + '</figure>\n';
    }

    renderer.code = function (code, infostring, escaped) {
        let lang = (infostring || '').match(/\S*/)[0];
        if (!lang) return code
        
        switch (lang) {
            case 'reboot_jsx':
                lang = 'jsx';
                code = Prism.highlight(htmlEscaper.unescape(code), Prism.languages[lang], lang)

                const html = ''
                + `<pre><code class="${this.options.langPrefix}${escape(lang, true)}">`
                + code
                + '</code></pre>\n'

                return ''
                + `<div class="bd-clipboard">
                    <button type="button" class="btn-sample-collapse" title="" data-original-title="Toggle the sample">
                        Toggle
                    </button>
                    <button type="button" class="btn-clipboard" title="" data-original-title="Copy to clipboard">
                        Copy
                    </button>
                </div>`
                + wrapToFigureTag(html);
            default:
                return wrapToFigureTag(
                    origCode.call(this, code, infostring, escaped)
                );
        }
      }

    return renderer
}

function getLiquidEngine (options = {}) {
    const lqengine = new Liquid(options);

    lqengine.plugin(require('../rollup-plugins/liquidjs/tag-reboot_mvvm'))
    lqengine.plugin(require('../rollup-plugins/liquidjs/tag-highlight'))
    lqengine.plugin(require('../rollup-plugins/liquidjs/filter-markdownify'))

    return lqengine;
}

function loadSiteData ({
    basedir = '_data'
}) {
    const sitedata = {};

    const ymls = fs.readdirSync(basedir)

    ymls.forEach((ymlname) => {
        const ext = path.extname(ymlname);
        const filename = path.resolve(basedir, ymlname);
        const fieldname = ymlname.replace( new RegExp(`${ext}$`), '' )

        const filecontent = YAML.safeLoad(fs.readFileSync(filename, 'utf8'))

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
module.exports = function rollupPluginRebootDocs (inputopts = {}) {
    const options = Object.assign({}, defaults, inputopts);

    const basedir = path.normalize(options.basedir)

    // include or exclude files
    const filter = createFilter(options.include, options.exclude);

    const versionedNavs = {};
    const sitedata = loadSiteData({
        basedir: path.resolve(basedir, '_data')
    });
    const sitedataWrapper = { data: sitedata }
    const lqglobals = {
        site: sitedataWrapper,
    }

    options.globals = lqglobals;

    const lqengine = getLiquidEngine({...options.liquidjs});
    const lqengine2 = getLiquidEngine({
        ...options.liquidjs,
        tagDelimiterLeft: '{%-',
        tagDelimiterRight: '-%}',
        outputDelimiterLeft: '{{-',
        outputDelimiterRight: '-}}',
    });

    const markedRenderer = getMarkedRender();

    const plugin = {
        name: 'rebootdocs',

        writeBundle: () => {
            if (inputopts.destjsondir) {
                Object.keys(versionedNavs).forEach(versionType => {
                    const jsonpath = path.resolve(options.destjsondir, `${versionType}/manifest.json`)
                    shelljs.mkdir('-p', path.dirname(jsonpath))

                    fs.writeFileSync(
                        jsonpath,
                        toSource(
                            sortNavs(versionedNavs[versionType]),
                            { pretty: !isProduction }
                        )
                    )
                });

                const siteDataFilePath = path.resolve(options.destjsondir, `data.json`)
                shelljs.mkdir('-p', path.dirname(siteDataFilePath))
                fs.writeFileSync(siteDataFilePath, toSource(sitedataWrapper, {pretty: true}))
            }

            if (options.sourcecodedir) {
                const sourceDataFilePath = path.resolve(options.sourcecodedir, './reboot-ui/@data/data.json')
                shelljs.mkdir('-p', path.dirname(sourceDataFilePath))
                if (!fs.existsSync(sourceDataFilePath))
                    fs.writeFileSync(sourceDataFilePath, toSource({
                        breakpoints: sitedataWrapper.data.breakpoints,
                        colors: sitedataWrapper.data.colors,
                        'theme-colors': sitedataWrapper.data['theme-colors'],
                    }, {pretty: isProduction}))
            }
        },

        // transform source code
        transform: (sourcecode, id) => {
            // exit without transforming if the filter prohibits this id
            if (!filter(id)) return null;

            /* transform :start */
            const fm = frontmatter(sourcecode)
            let result = fm.body
            
            result = lqengine.parseAndRenderSync(result, {...lqglobals}, {globals: {NOHIGHTLITHGT: false}})
            // result = lqengine2.parseAndRenderSync(result, {...lqglobals}, {globals: {NOHIGHTLITHGT: true}})
            
            const markedOptions = {
                ...options.marked,
                renderer: markedRenderer,
                highlight: (code, lang) => {
                    if (!Prism.languages[lang]) return code;

                    return Prism.highlight(code, Prism.languages[lang], lang)
                },
                xhtml: false,
                gfm: true,
            }
            result = marked(result, markedOptions)

            const relname = path.relative(basedir, id)
            const extname = path.extname(id)
            const basename = path.basename(id)
            const platform_relname = path.normalize(relname)

            const [_, versionType, group = 'common', ...rest] = path.normalize(relname).split(path.sep) || []
            const version_platform_relname = [versionType, group, ...rest].join(path.sep);

            // console.log('relname', relname, version_platform_relname);
            const regexp = new RegExp(`${extname}$`, 'i')
            
            const name = basename.replace(regexp, '')
            const reljsonpath = version_platform_relname.replace(regexp, '.json')

            result = addLeadInfoForPage(result, fm.attributes)

            const navInfo = {
                name,
                versionType,
                type: group,
                group,
                basename,
                relpath: normalizeToPosixPath(version_platform_relname).replace(regexp, '.json'),
                attributes: fm.attributes,
            }
            
            versionedNavs[versionType] = versionedNavs[versionType] || [];
            let idx = versionedNavs[versionType].findIndex(item => item.name === navInfo.name)
            if (idx === -1) versionedNavs[versionType].push(navInfo)
            else versionedNavs[versionType][idx] = navInfo
            
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