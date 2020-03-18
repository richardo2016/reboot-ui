const fs = require('fs')
const path = require('path')
const lmerge = require('lodash.merge')

const shelljs = require('shelljs')
const monoPkgJson = require('../package.json')

const PKG_DIR = path.resolve(__dirname, '../packages')

const packages = require('../helpers/packages')

const readJson = (jsonpath) => {
  let result = {}
  try {
    result = JSON.parse(fs.readFileSync(jsonpath))
  } catch (error) { }

  return result
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

packages.forEach(({
  name: comname,
  pkgname,
  buildLib,
  buildEsm = true,
}) => {
  if (buildLib === undefined && pkgname.indexOf('ui-') === 0) buildLib = true;
  else if (buildLib === undefined) buildLib = false;

  const comPkgname = pkgname || `ui-${comname}`
  const comDirname = comPkgname
  const comDir = path.resolve(PKG_DIR, `./${comDirname}`)
  if (!fs.existsSync(comDir)) shelljs.mkdir(comDir)

  const pkgJsonpath = path.resolve(comDir, `./package.json`)

  pkgJsonpath: {
    let jsonObj = JSON.parse(
      `\
{
  "name": "@reboot-ui/${comPkgname}",
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
  }
}
`
    )
    if (fs.existsSync(pkgJsonpath)) {
      const prev = readJson(pkgJsonpath)
      jsonObj = lmerge({}, jsonObj, prev)
      jsonObj.devDependencies = lmerge({}, jsonObj.devDependencies, monoPkgJson.devDependencies)
    }
    fs.writeFileSync(
      pkgJsonpath,
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
          console.log('[${comPkgname} -- lib]build finished!')
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
          console.log('[${comPkgname} -- esm]build finished!')
      })
}

${buildLib ? `buildLib()` : ''}
${buildEsm ? `buildEsm()` : ''}
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
  }
})

console.info(`write pkg manifest success!`)