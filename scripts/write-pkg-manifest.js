const fs = require('fs')
const path = require('path')
const lmerge = require('lodash.merge')

const ejs = require('ejs')

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
const prettyJson = (input) => {
  return JSON.stringify(input, null, '  ')
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const TPL_DIR = path.resolve(__dirname, './tpls/package')

const readEjs = (relpath) => {
  return fs.readFileSync(path.resolve(TPL_DIR, relpath)).toString()
}

packages.forEach(({
  name: comname,
  pkgname,
  buildLib,
  buildDist,
  buildEsm = true,
  buildFragment = ''
}) => {
  if (buildLib === undefined && pkgname.indexOf('ui-') === 0) buildLib = true;
  if (buildDist === undefined && pkgname.indexOf('ui-') === 0) buildDist = true;

  const comPkgname = pkgname || `ui-${comname}`
  const comDirname = comPkgname
  const comDir = path.resolve(PKG_DIR, `./${comDirname}`)
  if (!fs.existsSync(comDir)) shelljs.mkdir(comDir)

  const isInternal = comPkgname.startsWith(`internal-`);
  const isUIComponent = comPkgname.startsWith(`ui-`);
  const isOther = !isInternal || isUIComponent;

  const pkgJsonpath = path.resolve(comDir, `./package.json`)
  const fullpkgname = `@reboot-ui/${comPkgname}`

  const ejsCtx = {
    pkg: {
      name: comPkgname,
      fullpkgname,
      description: `${(isInternal ? 'Internal package ' : '')}${(isUIComponent ? 'UI Component ' : '')}${isOther ? 'package ' : ''}of @reboot-ui`,
    },
    pkgdirname: comDirname,
    comname,
    pkgmeta: { isInternal, isUIComponent, isOther },
    buildmeta: {
      buildDist,
      buildEsm,
      buildLib,
      buildFragment,
    }
  }

  pkgJsonpath: {
    const ejsRaw = ejs.render(readEjs('package.json'), ejsCtx)
    let jsonObj = JSON.parse(ejsRaw)
    if (fs.existsSync(pkgJsonpath)) {
      const prev = readJson(pkgJsonpath)
      const files = Array.from(new Set([...jsonObj.files, ...prev.files]));
      delete jsonObj.files;
      const version = prev.version || jsonObj.version;

      jsonObj = lmerge({}, prev, jsonObj);

      jsonObj.version = version;
      jsonObj.files = files;
      
      const devDependencies = lmerge({}, jsonObj.devDependencies, monoPkgJson.devDependencies)
      delete jsonObj.devDependencies;
      jsonObj.devDependencies = devDependencies
    }
    if (isUIComponent)
      monoPkgJson.dependencies[fullpkgname] = '*.*';// `^${jsonObj.version}`;
    fs.writeFileSync(pkgJsonpath, prettyJson(jsonObj) + '\n')
  }

  buildFile: {
    const rollupBuildFile = path.resolve(comDir, 'build.js')
    if (!fs.existsSync(path.dirname(rollupBuildFile))) shelljs.mkdir(path.dirname(rollupBuildFile))

    fs.writeFileSync(
      rollupBuildFile,
      ejs.render(ejs.render(readEjs('build.js.ejs'), ejsCtx))
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

  _npmIgnore:  {
    const npmIgnoreFile = path.resolve(comDir, '.npmignore')
    if (!fs.existsSync(path.dirname(npmIgnoreFile))) shelljs.mkdir(path.dirname(npmIgnoreFile))
    fs.writeFileSync(
      npmIgnoreFile,
      ejs.render(ejs.render(readEjs('.npmignore'), ejsCtx))
      )
  }

  README: {
    const READMEFile = path.resolve(comDir, 'README.md')
    if (!fs.existsSync(path.dirname(READMEFile))) shelljs.mkdir(path.dirname(READMEFile))
    if (!fs.existsSync(READMEFile))
      fs.writeFileSync(
        READMEFile,
        ejs.render(ejs.render(readEjs('README.md'), ejsCtx))
      )
  }
})

console.info(`write pkg manifest success!`)

fs.writeFileSync(
  path.resolve(__dirname, '../package.json'),
  prettyJson(monoPkgJson)
)