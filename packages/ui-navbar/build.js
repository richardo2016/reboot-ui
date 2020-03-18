const path = require('path')
const rollup = require('rollup')

const { getConfigItem } = require('../../helpers/rollup-utils')
const externalModulesWhenBuild = require('../../helpers/package-externals')

function buildLib () {
  const { output: outputConfig, ...rollupConfig } = getConfigItem({
      format: 'cjs',
      name: path.basename(__dirname),
      input: 'src/index.style.js',
      mvvm_type: 'react',
      pkg_type: 'ui',
      use_uglify: false,
      babel_options: {},
      postConfig: (rollup_cfg) => {
        rollup_cfg.output.file = 'lib/index.js'
        rollup_cfg.external = Array.from(externalModulesWhenBuild.forLib)
      }
  })

  // build lib
  rollup.rollup(rollupConfig)
      .then((bundle) => {
          return bundle.write(outputConfig)
      })
      .then(() => {
          console.log('[ui-navbar -- lib]build finished!')
      })
}

function buildEsm () {
  const { output: outputConfig, ...rollupConfig } = getConfigItem({
      format: 'esm',
      name: path.basename(__dirname),
      input: 'src/index.js',
      mvvm_type: 'react',
      pkg_type: 'ui',
      use_uglify: false,
      babel_options: {},
      postConfig: (rollup_cfg) => {
        rollup_cfg.output.file = 'es/index.js'
        rollup_cfg.output.sourcemap = false

        rollup_cfg.external = Array.from(externalModulesWhenBuild.forEsm)
      }
  })

  // build es
  rollup.rollup(rollupConfig)
      .then((bundle) => {
          return bundle.write(outputConfig)
      })
      .then(() => {
          console.log('[ui-navbar -- esm]build finished!')
      })
}

buildLib()
buildEsm()
