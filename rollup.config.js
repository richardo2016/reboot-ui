import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import copyGlob from 'rollup-plugin-copy-glob';

import buble from '@rollup/plugin-buble';

import alias from '@rollup/plugin-alias';
import resolveAliases from 'rollup-plugin-resolve-aliases'
import replace from '@rollup/plugin-replace';
import pug from 'rollup-plugin-pug';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import cleanup from 'rollup-plugin-cleanup';
import rebootmarkdown from './rollup-plugins/markdown';

import preactHooks from 'preact/hooks';

import shelljs from 'shelljs'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

function getConfigItem (name, opts) {
	const {
		/**
		 * - react
		 * - preact
		 * 
		 */
		mvvm_type = 'preact',

		app_type = 'pages',
		production: isProduction = production,
		postConfig,
		name: umdName = '',
	} = opts || {};

	switch (mvvm_type) {
		case 'react':
		case 'preact':
			break
		default:
			throw new Error(`unsupported mvvm_type ${mvvm_type}!`)
	}

	const use_react = mvvm_type === 'react'
	const use_preact = mvvm_type === 'preact'

	let {
		format = app_type === 'sdks' ? 'umd' : 'iife'
	} = opts || {}

	const use_buble = use_preact || use_react || app_type === 'sdks';

	const rollup_cfg = {
		input: `src/${app_type}/${name}/index.js`,
		output: {
			file: `build/${app_type}/${name}/index.js`,
			format: format, // immediately-invoked function expression — suitable for <script> tags
			sourcemap: !isProduction,
			name: umdName
		},
		plugins: [
			alias({
			}),
			replace({
				// no `moment` used
				[`require('moment')`]: JSON.stringify(null),
				'window.process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
				'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
			}),
			postcss({
				extract: true,
				plugins: [],
				minimize: isProduction
			}),
			pug(),
			image(),
			use_buble && buble({
				objectAssign: 'Object.assign',
			}),
			
			resolve({
				browser: true,
				extensions: ['.mjs', '.js', '.jsx', '.json', '.node']
				// main: true
			}),
			commonjs({
				namedExports: {
					// add hooks exports when using preact, but you still need to import 'preact/hooks' and patch preact by your self,
					[path.resolve(__dirname,  './node_modules/preact/dist/preact.js')]: Object.keys(preactHooks),
					[path.resolve(__dirname,  './node_modules/preact/dist/preact.module.js')]: Object.keys(preactHooks),
					[path.resolve(__dirname,  './node_modules/preact/dist/preact.umd.js')]: Object.keys(preactHooks)
				},
				sourceMap: !isProduction
			}), // converts date-fns to ES modules
			isProduction && uglify(), // minify, but only in production
		]
	}

	if (use_react) {
		rollup_cfg.output.globals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
		rollup_cfg.external = [ 'react', 'react-dom' ]

		rollup_cfg.plugins.push(
			copyGlob(
				[
					{
						files: 'node_modules/react/umd/react.production.min.js',
						dest: `build/${app_type}/${name}/cdn`
					},
					{
						files: 'node_modules/react-dom/umd/react-dom.production.min.js',
						dest: `build/${app_type}/${name}/cdn`
					}
				]
			)
		)
	} else if (use_preact) {
		rollup_cfg.plugins.unshift(
			resolveAliases({
				aliases: {
					'react': path.resolve(__dirname,  './node_modules/preact/dist/preact.js'),
					'react-dom': path.resolve(__dirname,  './node_modules/preact/dist/preact.js'),
					'preact/hooks': path.resolve(__dirname, './node_modules/preact/hooks/dist/hooks.js'),
					'preact/compat': path.resolve(__dirname, './node_modules/preact/compat/dist/compat.js'),
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

export default [
	getConfigItem('reboot-ui', { format: 'umd', name: 'RebootUI', mvvm_type: 'preact', app_type: 'library' }),
	getConfigItem('reboot-ui', {
		format: 'iife',
		name: 'RebootUISample',
		mvvm_type: 'preact',
		app_type: 'pages',
		postConfig: (rollup_cfg) => {
			rollup_cfg.plugins.unshift(
				rebootmarkdown({
					basedir: path.resolve(__dirname, './src/pages/reboot-ui/docs'),
				})
			)

			rollup_cfg.plugins.push(
				((options) => {
					return {
						name: 'afterbuild',
						writeBundle (bundle) {
							if (!production) return 

							const dest = path.resolve(`./docs`)
							shelljs.rm('-rf', path.resolve(dest, './reboot-ui'))
							shelljs.mkdir('-p', dest)
							shelljs.cp(
								'-fR',
								path.resolve(`./build/pages/reboot-ui`),
								dest
							)
						}
					}
				})({})
			)
		}
	}),
];
