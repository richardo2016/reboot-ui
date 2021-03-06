const fs = require('fs')
const path = require('path')

const replace = require('@rollup/plugin-replace');
const rebootdocs = require('./rollup-plugins/rebootdocs');
const shelljs = require('shelljs');

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const { isProduction } = require('./rollup-plugins/build-env')
const { getConfigItem } = require('./helpers/rollup-utils')
const DOC_DIST_DIR = `docs`

const docsConfig = getConfigItem({
    input: 'src/docs/index.js',
    format: 'iife',
    name: 'RebootUIDocs',
    mvvm_type: 'preact',
    use_uglify: isProduction,
    babel_options: {
        plugins: [
            /**
             * @see https://github.com/ant-design/babel-plugin-import
             */
            ['import', {
                // set `reboot-ui` for published version
                "libraryName": "reboot-ui",
                // set `es` for for published version
                // "libraryDirectory": "src",
                "customName": (name) => {
                    if (isProduction) return `@reboot-ui/ui-${name}`
                    return path.resolve(__dirname, `packages/ui-${name}/src/index.ts`)
                },
                "style": true,
                "customStyleName": (name) => {
                    if (isProduction) return `@reboot-ui/ui-${name}/es/index.scss`
                    return path.resolve(__dirname, `packages/ui-${name}/src/${name}.scss`)
                },
            }]
        ]
    },
    preact_options: { compat_mode: 'compat' },
    postConfig: (rollup_cfg) => {
        rollup_cfg.output.file = `dist/${DOC_DIST_DIR}/index.js`
        
        const basedir = path.resolve(__dirname, `./src/docs/`)
        const destdir = path.resolve(__dirname, `./dist/${DOC_DIST_DIR}/`)
        const allDocVersions = fs.readdirSync(path.resolve(basedir, 'docs'))
        const REBOOT_DOC_VERSION = process.env.REBOOT_DOC_VERSION || allDocVersions[0];

        rollup_cfg.plugins.unshift(
            replace({
                'process.env.REBOOT_DOC_VERSION': JSON.stringify(REBOOT_DOC_VERSION),
                [`process.env.REBOOT_DOC_VERSIONS`]: JSON.stringify(allDocVersions.join(';')),
            }),
        )

        const LIQUID_INCLUDE_BASE = path.resolve(__dirname, './src/docs/_includes')

        rollup_cfg.plugins.unshift(
            rebootdocs({
                writeFileOnly: true,
                basedir: basedir,
                destjsondir: path.resolve(destdir, 'doc-data'),
                sourcecodedir: path.resolve(__dirname, `./src/`),
                liquidjs: {
                    root: LIQUID_INCLUDE_BASE,
                    extname: '',
                    dynamicPartials: false
                },
                sitedata: {
                    repo: 'https://github.com/richardo2016/reboot-ui'
                }
            })
        )

        rollup_cfg.plugins.push(
            ((options) => {
                return {
                    name: 'afterbuild',
                    writeBundle (bundle) {
                        if (!isProduction) return 

                        const ghdest = path.resolve(`./docs/reboot-ui/`)
                        const pdest = path.dirname(ghdest)
                        shelljs.rm('-rf', ghdest)
                        shelljs.mkdir('-p', pdest)
                        
                        const distDir = path.resolve(`./dist/${DOC_DIST_DIR}`)
                        shelljs.cp('-fR', distDir + '/', ghdest)

                        shelljs.cp('-fR', path.resolve(`./static/`), ghdest)
                    }
                }
            })({})
        )
    }
})

module.exports = [
    docsConfig
];