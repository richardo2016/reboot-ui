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

function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function getComponentCamelCaseName (comDir) {
    return comDir.split('-').map(frag => capitalize(frag)).join('')
}

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
        if (!fs.existsSync(rollup_cfg.input)) {
            rollup_cfg.input = rollup_cfg.input.replace('index.js', `${com_name}.jsx`)
            rollup_cfg.output.file = `${dest_base}/${com_name}/${com_name}.js`
        } else {
            rollup_cfg.output.file = `${dest_base}/${com_name}/index.js`
        }

        /**
         * @enum 'es' for es
         * @enum 'cjs' for lib
         */
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
                ).concat(
                    allComponentNames
                        .filter(com_name => com_name.startsWith('helper-'))
                        .map(com_name => `../${com_name}/helper-anchor`)
                )
        }
    }
}

console.log('allComponentNames:', allComponentNames.join(EOL));

const buildTargets = []

allComponentNames.forEach(name => {
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
                        exclude: [
                        ]
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

allComponentNames.forEach(name => {
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
