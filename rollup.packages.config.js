import fs from 'fs';
import path from 'path';
import { EOL } from 'os';


import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss'
import copyGlob from 'rollup-plugin-copy-glob';

const uglifyName = uglify().name
const postcssName = postcss().name

import { getConfigItem } from './rollup-fn.js'

const { getAllComponents } = require('./rollup-utils/build.js')
const UI_ROOT = path.resolve(__dirname, './src/library/reboot-ui')
const COM_ROOT = path.resolve(UI_ROOT, '@components')
const allComponentNames = getAllComponents(COM_ROOT)

function getPostConfig (com_name, target = 'es') {
    let dest_base, format
    switch (target) {
        default:
        case 'es':
            dest_base = 'es'
            format = 'esm'
            break;
        case 'lib':
            dest_base = 'lib'
            format = 'cjs'
            break;
    }
    return (rollup_cfg) => {
        switch (com_name) {
            case '__ESM_ENTRY__':
                rollup_cfg.input = rollup_cfg.input.replace('__ESM_ENTRY__/index.js', 'index.no-style.js')
                rollup_cfg.output.file = `${dest_base}/index.js`
                break;
            case '__LIB_ENTRY__':
                rollup_cfg.input = rollup_cfg.input.replace('__LIB_ENTRY__/index.js', 'index.no-style.js')
                rollup_cfg.output.file = `${dest_base}/index.js`
                break;
            default:
                rollup_cfg.output.file = `${dest_base}/${com_name}/index.js`
    
                if (target === 'lib') {
                    const newFile = rollup_cfg.input.replace('index.js', 'index.style.js')
                    if (fs.existsSync(path.resolve(__dirname, newFile)))
                        rollup_cfg.input = newFile
                }
                break;
        }

        rollup_cfg.output.format = format
        rollup_cfg.output.sourcemap = false
        
        rollup_cfg.plugins = rollup_cfg.plugins.filter(item => item.name !== uglifyName)

        rollup_cfg.external = [
            'react',
            'react-dom',
            'preact',
            'classnames',
            'react-transition-group',

            '@popperjs/core',
            '@popperjs/core/lib/popper-lite',
            '@popperjs/core/lib/modifiers/flip',
            '@popperjs/core/lib/modifiers/preventOverflow',
            '@popperjs/core/lib/modifiers/offset',
            '@popperjs/core/lib/modifiers/arrow',
            '@popperjs/core/lib/modifiers/computeStyles',
            '@popperjs/core/lib/modifiers/applyStyles',
        ]

        const externalComs = allComponentNames
        .filter(com_name => {
            if (com_name === 'style') return false
            if (com_name === 'common') return false
            return true;
        })
        if (target === 'es') {
            rollup_cfg.plugins.unshift(
                copyGlob([
                    {
                        files: path.resolve(COM_ROOT, `./${com_name}/${com_name}.scss`),
                        dest: `${dest_base}/style`
                    },
                ]),
                // @notice: repeative, but no matter
                copyGlob([
                    {
                        files: path.resolve(COM_ROOT, `./style/**/*.scss`),
                        dest: `${dest_base}/style`
                    },
                ])
            )

            rollup_cfg.external = rollup_cfg.external
                .concat(
                    ['../common']
                )
                .concat(externalComs.map(com_name => `../${com_name}/${com_name}`))
        }

        if (com_name === '__ESM_ENTRY__')
            rollup_cfg.external = rollup_cfg.external.concat(externalComs.map(com_name => `./${com_name}`))
        
        if (com_name === '__LIB_ENTRY__')
            rollup_cfg.external = rollup_cfg.external.concat(externalComs.map(com_name => `./${com_name}`))
    }
}

console.log('allComponentNames:', allComponentNames.join(EOL));

const buildTargets = []

allComponentNames
.concat('__ESM_ENTRY__')
.forEach(name => {
    buildTargets.push(
        getConfigItem(name, {
            mvvm_type: 'react',
            app_type: 'library/reboot-ui/@components',
            babel_options: {
                runtimeHelpers: true,
                presets: [
					[ '@babel/preset-env', {
                        // useBuiltIns: 'usage',
                        // corejs: 3,
                        loose: true,
                        targets: {
                            "browsers": [
                                "last 2 versions",
                                {
                                    "chrome": "49",
                                    "edge": "13",
                                    "firefox": "36",
                                    "safari": "10",
                                    "ios": "10",
                                    "samsung": "5",
                                    "opera": "36",
                                    "electron": "1"
                                }
                            ]
                        },
					} ],
					[ '@babel/preset-react', {
                    }]
                ],
                plugins: [
                ]
            },
            postcss_options: {
                minimize: false,
                sourceMap: false,
            },
            preferConst: true,
            postConfig: getPostConfig(name, 'es')
        })
    )
})

allComponentNames
.concat('__LIB_ENTRY__')
.forEach(name => {
    buildTargets.push(
        getConfigItem(name, {
            mvvm_type: 'react',
            app_type: 'library/reboot-ui/@components',
            babel_options: {},
            postConfig: getPostConfig(name, 'lib')
        })
    )
})

export default buildTargets
