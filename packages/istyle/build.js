const path = require('path')
const rollup = require('rollup')

const { getConfigItem } = require('../../helpers/rollup-utils')
const externalModulesWhenBuild = require('../../helpers/package-externals')



const copy = require('rollup-plugin-copy');

function buildEsm () {
  const { output: outputConfig, ...rollupConfig } = getConfigItem({
      format: 'esm',
      name: path.basename(__dirname),
      input: 'src/index.ts',
      mvvm_type: 'react',
      pkg_type: 'ui',
      use_uglify: false,
      babel_options: {},
      ts_options: {"useTsconfigDeclarationDir":true},
      postcss_options: {},
      postConfig: (rollup_cfg) => {
        rollup_cfg.output.file = 'es/index.js'
        rollup_cfg.output.sourcemap = false

        rollup_cfg.external = Array.from(externalModulesWhenBuild.forEsm)

        rollup_cfg.plugins.unshift(
          copy({
            targets: [
              {
                src: 'src/istyle.scss',
                dest: 'es',
                rename: 'index.scss'
              }
            ]
          })
        )
      }
  })

  // build es
  rollup.rollup(rollupConfig)
      .then((bundle) => {
          return bundle.write(outputConfig)
      })
      .then(() => {
          console.log('[istyle -- esm >>]build finished!')
      })
}



buildEsm();
