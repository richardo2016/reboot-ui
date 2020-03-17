const path = require('path')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const uglify = require('rollup-plugin-uglify')

const buble = require('@rollup/plugin-buble')
const babel = require('rollup-plugin-babel')

const alias = require('@rollup/plugin-alias')
const resolveAliases = require('rollup-plugin-resolve-aliases')
const replace = require('@rollup/plugin-replace')
const pug = require('rollup-plugin-pug')
const postcss = require('rollup-plugin-postcss')
const image = require('@rollup/plugin-image')
const json = require('@rollup/plugin-json')
const cleanup = require('rollup-plugin-cleanup')

const reactNamedExports = require('./rollup-cjs-named-exports/react-named-exports');
const preactNamedExports = require('./rollup-cjs-named-exports/preact-named-exports');

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = process.env.NODE_ENV === 'production'

const ROOT = path.resolve(__dirname, '../')

function ucfirst (str = '') {
    if (typeof str !== 'string') return ''
    
    return (str[0] || '').toUpperCase() + (str.slice(1) || '')
}

const getComponentName = exports.getComponentName = function (dir) {
	return dir.split('-').map(frag => ucfirst(frag)).join('')
}

exports.getConfigItem = function (opts) {
	const {
		/**
		 * - react
		 * - preact
		 * 
		 */
		mvvm_type = 'preact',
		pkg_type = 'ui',
		input = '',
        format = 'umd',
		production: isProduction = production,

		babel_options = undefined,
		preact_options = {},
		postcss_options = {},

		use_uglify = production,
		
		postConfig,
	} = opts || {};
	
	let {
		name: umdName = '',
	} = opts || {};

	switch (pkg_type) {
		case 'ui':
			umdName = getComponentName(umdName)
			break
		default:
			break
	}

	switch (mvvm_type) {
		case 'react':
		case 'preact':
			break
		default:
			throw new Error(`unsupported mvvm_type ${mvvm_type}!`)
	}

	const use_react = mvvm_type === 'react'
	const use_preact = mvvm_type === 'preact'

	const use_babel = !!babel_options;
	const use_buble = !use_babel && (use_react || use_preact);

	const rollup_cfg = {
		input,
		output: {
			file: `dist/index.js`,
			format: format, // immediately-invoked function expression — suitable for <script> tags
			sourcemap: !isProduction,
			name: umdName,
		},
		plugins: [
			alias({
			}),
			replace({
				'window.process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
				'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
			}),
			postcss({
				extract: true,
				plugins: [],
				minimize: isProduction,
				sourceMap: !isProduction,
				...postcss_options,
			}),
			pug(),
			image(),
			json(),
			use_buble && buble({
				objectAssign: 'Object.assign',
			}),
			use_babel && babel({
				babelrc: false,
				exclude: 'node_modules/**',
				presets: [
					[ '@babel/preset-env', {
						"modules": false
					} ],
					(use_react || use_preact) && '@babel/preset-react'
				].filter(x => x),
				...babel_options
			}),
			
			resolve({
				browser: true,
				extensions: ['.mjs', '.js', '.jsx', '.json', '.node']
				// main: true
			}),
			commonjs({
				namedExports: {
					...use_react && reactNamedExports,
					// add hooks exports when using preact, but you still need to import 'preact/hooks' and patch preact by your self,
					...use_preact && preactNamedExports,
				},
				sourceMap: !isProduction
			}),
			use_uglify && uglify(), // minify, but only in production
		]
	}

	if (use_react) {
		rollup_cfg.output.globals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
		rollup_cfg.external = [ 'react', 'react-dom' ]
	} else if (use_preact) {
		rollup_cfg.plugins.unshift(
			resolveAliases({
				aliases: {
					...preact_options.compat_mode === 'compat' && {
						'react': path.resolve(ROOT,  './node_modules/preact/compat/dist/compat.module.js'),
						'react-dom': path.resolve(ROOT,  './node_modules/preact/compat/dist/compat.module.js'),
					},
					...preact_options.compat_mode === 'hooks' && {
						'react': path.resolve(ROOT,  './node_modules/preact/hooks/dist/hooks.module.js'),
						'react-dom': path.resolve(ROOT,  './node_modules/preact/hooks/dist/hooks.module.js'),
					},
					...(!['compat', 'hooks'].includes(preact_options.compat_mode)) && {
						'react': path.resolve(ROOT,  './node_modules/preact/dist/preact.js'),
						'react-dom': path.resolve(ROOT,  './node_modules/preact/dist/preact.js'),
					},
					'preact/hooks': path.resolve(ROOT, './node_modules/preact/hooks/dist/hooks.js'),
					'preact/compat': path.resolve(ROOT, './node_modules/preact/compat/dist/compat.js'),
				},
				mainFields: ['module', 'main']
			})
		)
	}

	if (production) {
		rollup_cfg.plugins.push(
			cleanup({
				comments: 'none',
				extensions: [ '.js', '.css' ]
			})
		)
	}

	if (typeof postConfig === 'function')
		postConfig(rollup_cfg)

	return rollup_cfg;
}