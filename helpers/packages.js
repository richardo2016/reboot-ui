module.exports = [
    {
        name: 'common',
        pkgname: 'common',
    },
    /* internal :start */
    {
        name: 'istyle',
        pkgname: 'istyle',
        // buildEsm: false,
        buildFragment1: `\
function buildStyle () {
  const { output: outputConfig, ...rollupConfig } = getConfigItem({
      format: 'esm',
      name: path.basename(__dirname),
      input: 'src/index.js',
      mvvm_type: 'react',
      pkg_type: 'ui',
      use_uglify: false,
      babel_options: {},
      postcss_options: {},
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
      })
}
`,
    },
    {
        name: 'icomponent-anchor',
        pkgname: 'icomponent-anchor',
    },
    {
        name: 'icomponent-collapse',
        pkgname: 'icomponent-collapse',
    },
    {
        name: 'icomponent-popper',
        pkgname: 'icomponent-popper',
    },
    {
        name: 'internal-size-resolver',
        pkgname: 'internal-size-resolver',
    },
    /* internal :end */
    /* ui components :start */
    {
        name: 'layout',
        pkgname: 'ui-layout',
    },
    {
        name: 'row',
        pkgname: 'ui-row',
    },
    {
        name: 'col',
        pkgname: 'ui-col',
    },
    {
        name: 'container',
        pkgname: 'ui-container',
    },
    {
        name: 'alert',
        pkgname: 'ui-alert',
    },
    {
        name: 'navbar',
        pkgname: 'ui-navbar',
    },
    {
        name: 'nav',
        pkgname: 'ui-nav',
    },
    {
        name: 'nav-tab',
        pkgname: 'ui-nav-tab',
    },
    {
        name: 'table',
        pkgname: 'ui-table',
    },
    {
        name: 'dropdown',
        pkgname: 'ui-dropdown',
    },
    {
        name: 'button-toolbar',
        pkgname: 'ui-button-toolbar',
    },
    {
        name: 'button-group',
        pkgname: 'ui-button-group',
    },
    {
        name: 'button',
        pkgname: 'ui-button',
    },
    {
        name: 'badge',
        pkgname: 'ui-badge',
    },
    {
        name: 'breadcrumb',
        pkgname: 'ui-breadcrumb',
    },
    {
        name: 'collapse',
        pkgname: 'ui-collapse',
    },
    {
        name: 'card',
        pkgname: 'ui-card',
    },
    {
        name: 'carousel',
        pkgname: 'ui-carousel',
    },
    {
        name: 'input-group',
        pkgname: 'ui-input-group',
    },
    {
        name: 'input',
        pkgname: 'ui-input',
    },
    {
        name: 'checkbox',
        pkgname: 'ui-checkbox',
    },
    {
        name: 'radio',
        pkgname: 'ui-radio',
    },
    {
        name: 'select',
        pkgname: 'ui-select',
    },
    {
        name: 'textarea',
        pkgname: 'ui-textarea',
    },
    {
        name: 'popover',
        pkgname: 'ui-popover',
    },
    {
        name: 'progress',
        pkgname: 'ui-progress',
    },
    {
        name: 'spinner',
        pkgname: 'ui-spinner',
    },
    {
        name: 'jumbotron',
        pkgname: 'ui-jumbotron',
    },
    {
        name: 'list-group',
        pkgname: 'ui-list-group',
    },
    {
        name: 'modal',
        pkgname: 'ui-modal',
    },
    {
        name: 'tooltip',
        pkgname: 'ui-tooltip',
    },
    {
        name: 'form',
        pkgname: 'ui-form',
    },
    {
        name: 'pagination',
        pkgname: 'ui-pagination',
    },
    /* ui components :end */
]