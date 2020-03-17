const fs = require('fs')
const path = require('path')
const lmerge = require('lodash.merge')

const shelljs = require('shelljs')
const monoPkgJson = require('../package.json')

const PKG_DIR = path.resolve(__dirname, '../packages')

const ALL_COMPONENT_NAMES = [
    'layout',
    'row',
    'col',
    'container',
    'alert',
    'navbar',
    'nav',
    'nav-tab',
    'table',
    'dropdown',
    'button-toolbar',
    'button-group',
    'button',
    'badge',
    'breadcrumb',
    'collapse',
    'card',
    'carousel',
    'input-group',
    'input',
    'checkbox',
    'radio',
    'select',
    'textarea',
    'popover',
    'progress',
    'spinner',
    'jumbotron',
    'list-group',
    'modal',
    'tooltip',
    'form',
    'pagination',
]

ALL_COMPONENT_NAMES.forEach(comname => {
    function capitalize (str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }
    
    const comDirname = `ui-${comname}`
    const comDir = path.resolve(PKG_DIR, `./${comDirname}`)
    if (!fs.existsSync(comDir)) shelljs.mkdir(comDir)

    const pkgJson = path.resolve(comDir, `./package.json`)

    pkgJson: {
      let jsonObj = JSON.parse(
`\
{
  "name": "@reboot-ui/${comDirname}",
  "version": "0.1.0",
  "description": "UI Component of Reboot UI",
  "author": "Richardo2016 <richardo2016@gmail.com>",
  "homepage": "https://github.com/richardo2016/reboot-ui/packages/${comDirname}#readme",
  "license": "ISC",
  "main": "lib/index.js",
  "module": "./es/index.js",
  "browser": "./dist/index.min.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib",
    "es",
    "dist"
  ],
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/richardo2016/reboot-ui/packages/${comDirname}"
  },
  "scripts": {
    "build": "cross-env NODE_ENV=production node build.js",
    "dev-build": "cross-env NODE_ENV=developement rollup -c",
    "watch": "cross-env ROLLUP_WATCH=true rollup -c -w",
    "dev": "npm-run-all --parallel start watch",
    "test": "jest"
  },
  "bugs": {
    "url": "https://github.com/richardo2016/reboot-ui/issues"
  },
  "dependencies": {
    "@popperjs/core": "^2.0.6",
    "classnames": "^2.2.6",
    "react-transition-group": "^4.3.0"
  }
}
`
      )
      if (fs.existsSync(pkgJson)) jsonObj = lmerge({}, jsonObj, pkgJson)
      jsonObj.devDependencies = monoPkgJson.devDependencies
      fs.writeFileSync(
        pkgJson,
        JSON.stringify(jsonObj, null, '  ')
      )
    }

    buildFile: {
      const rollupBuildFile = path.resolve(comDir, 'build.js')
      if (!fs.existsSync(path.dirname(rollupBuildFile))) shelljs.mkdir(path.dirname(rollupBuildFile))

    fs.writeFileSync(
      rollupBuildFile,
`\
const path = require('path')
const rollup = require('rollup')

const { getConfigItem } = require('../../helpers/rollup-utils')
const externalModules = require('../../helpers/package-externals')

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
        rollup_cfg.external = Array.from(externalModules)
      }
  })

  // build lib
  rollup.rollup(rollupConfig)
      .then((bundle) => {
          return bundle.write(outputConfig)
      })
      .then(() => {
          console.log('[${comDirname} -- lib]build finished!')
      })
}

function buildEs () {
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

        rollup_cfg.external = Array.from(externalModules)
      }
  })

  // build es
  rollup.rollup(rollupConfig)
      .then((bundle) => {
          return bundle.write(outputConfig)
      })
      .then(() => {
          console.log('[${comDirname} -- esm]build finished!')
      })
}

buildLib()
buildEs()
`
    )
    }

    indexFile: {
      const entryFile = path.resolve(comDir, 'index.js')
      if (!fs.existsSync(path.dirname(entryFile))) shelljs.mkdir(path.dirname(entryFile))
    if (!fs.existsSync(entryFile))
    fs.writeFileSync(
      entryFile,
`\
export { default } from './src/index.js'
`
    )

    mvFromOld: {
      if (false && !process.env.MOVED) {
        const OLD_UI_ROOT = path.resolve(__dirname, '../src/library/reboot-ui')
        const OLD_COM_ROOT = path.resolve(OLD_UI_ROOT, '@components')

        const oldDir = path.resolve(OLD_COM_ROOT, `./${comname}`)
        if (fs.existsSync(oldDir)) {
          fs.readdirSync(oldDir)
            .forEach(relname => {
              const source = path.resolve(oldDir, relname)
              const dest = path.resolve(comDir, `./src/${relname}`)
              if (!fs.existsSync(dest))
                shelljs.cp('-f', source, dest)
            })
        }
      }
    }
    }
})

console.info(`write pkg manifest success!`)