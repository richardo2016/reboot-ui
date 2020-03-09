import fs from 'fs';
import path from 'path';

import replace from '@rollup/plugin-replace';
import rebootdocs from './rollup-plugins/rebootdocs';

import shelljs from 'shelljs'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
import { isProduction as production } from './rollup-plugins/build-env'

import { getConfigItem } from './rollup-fn.js'

export default [
	getConfigItem('reboot-ui', {
		format: 'umd',
		name: 'RebootUI',
		mvvm_type: 'preact',
		app_type: 'library',
		babel_options: {},
		postConfig: (rollup_cfg) => {
			rollup_cfg.output.globals = {
				'react': 'React',
				'react-dom': 'ReactDOM',
				'preact': 'preact',
			}
			rollup_cfg.external = [ 'react', 'react-dom', 'preact' ]
		}
	}),
	getConfigItem('reboot-ui', {
		format: 'iife',
		name: 'RebootUIDocs',
		mvvm_type: 'preact',
		app_type: 'pages',
		babel_options: {},
		preact_options: { compat_mode: 'compat', },
		postConfig: (rollup_cfg) => {
			const basedir = path.resolve(__dirname, `./src/pages/reboot-ui/docs/`)
			const destdir = path.resolve(__dirname, `./build/pages/reboot-ui/static/docs/`)
			const allDocVersions = fs.readdirSync(basedir)
			const REBOOT_DOC_VERSION = process.env.REBOOT_DOC_VERSION || allDocVersions[0];

			rollup_cfg.plugins.unshift(
				replace({
					'process.env.REBOOT_DOC_VERSION': JSON.stringify(REBOOT_DOC_VERSION),
					[`process.env.REBOOT_DOC_VERSIONS`]: JSON.stringify(allDocVersions.join(';')),
				}),
			)

			const LIQUID_INCLUDE_BASE = path.resolve(__dirname, './src/pages/reboot-ui/_includes')

			rollup_cfg.plugins.unshift(
				rebootdocs({
					writeFileOnly: true,
					basedir: basedir,
					destjsondir: destdir,
					sourcecodedir: path.resolve(__dirname, `./src/`),
					liquidjs: {
						root: LIQUID_INCLUDE_BASE,
						extname: '',
						dynamicPartials: false
					},
				})
			)

			rollup_cfg.plugins.push(
				((options) => {
					return {
						name: 'afterbuild',
						writeBundle (bundle) {
							if (!production) return 

							const dest = path.resolve(`./docs/reboot-ui/`)
							const pdest = path.dirname(dest)
							shelljs.rm('-rf', dest)
							shelljs.mkdir('-p', pdest)
							
							shelljs.cp('-fR', path.resolve(`./build/pages/reboot-ui`), pdest)

							shelljs.cp('-fR', path.resolve(`./static/`), dest)
						}
					}
				})({})
			)
		}
	})
];
