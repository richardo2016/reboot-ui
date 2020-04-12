const fs = require('fs')
const path = require('path')
const lmerge = require('lodash.merge')

const ejs = require('ejs')

const shelljs = require('shelljs')
const monoPkgJson = require('../package.json')
const lernaConfig = require('../lerna.json')

monoPkgJson['mono:config'] = Object.assign({
  scope: monoPkgJson.name,
}, monoPkgJson['mono:config']);

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

const TPL_DIR = path.resolve(__dirname, './tpls/package')

const readEjs = (relpath) => {
  return fs.readFileSync(path.resolve(TPL_DIR, relpath)).toString()
}

packages.forEach(({
  name: comname,
  pkgname,
  pkgscope = monoPkgJson['mono:config'].scope,
  buildLib,
  buildDist,
  buildEsm = true,
  buildFragment = '',
  useTs = false,
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
  const fullpkgname = `@${pkgscope}/${comPkgname}`

  const ejsCtx = {
    pkg: {
      name: comPkgname,
      fullpkgname,
      description: `${(isInternal ? 'Internal package ' : '')}${(isUIComponent ? 'UI Component ' : '')}${isOther ? 'package ' : ''}of @${pkgscope}`,
    },
    repoinfo: {
      gitpath: `${pkgscope}/${monoPkgJson['name']}`,
    },
    pkgdirname: comDirname,
    comname,
    pkgmeta: { isInternal, isUIComponent, isOther },
    buildmeta: {
      useTs,
      ts_options: { useTsconfigDeclarationDir: true },
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
      if (prev.version) 

      jsonObj = lmerge({}, prev, jsonObj);

      jsonObj.version = version;
      jsonObj.files = files;
      
      const devDependencies = lmerge({}, jsonObj.devDependencies, lernaConfig.devDependencies)
      delete jsonObj.devDependencies;
      jsonObj.devDependencies = devDependencies
    }
    const output = JSON.stringify(jsonObj, null, '  ')
    fs.writeFileSync(pkgJsonpath, output)
  }

  buildFile: {
    const rollupBuildFile = path.resolve(comDir, 'build.js')
    if (!fs.existsSync(path.dirname(rollupBuildFile))) shelljs.mkdir(path.dirname(rollupBuildFile))

    fs.writeFileSync(
      rollupBuildFile,
      ejs.render(ejs.render(readEjs('build.js.ejs'), ejsCtx))
    )
  }

  entryFiles: {
    ;[
      useTs ? 'index.ts' : 'index.js',
      useTs ? 'src/index.ts' : 'src/index.js',
    ].forEach((_entryFile) => {
      entryFile = path.resolve(comDir, _entryFile)

      if (!fs.existsSync(path.dirname(entryFile))) shelljs.mkdir(path.dirname(entryFile))
      if (!fs.existsSync(entryFile))
        fs.writeFileSync(
          entryFile,
          ejs.render(ejs.render(readEjs(_entryFile), ejsCtx))
        )
    })
  }

  _npmIgnore:  {
    const npmIgnoreFile = path.resolve(comDir, '.npmignore')
    if (!fs.existsSync(path.dirname(npmIgnoreFile))) shelljs.mkdir(path.dirname(npmIgnoreFile))
    fs.writeFileSync(
      npmIgnoreFile,
      ejs.render(ejs.render(readEjs('.npmignore'), ejsCtx))
    )
  }

  tsAbout: {
    if (useTs) {
      const dtsEntry = path.resolve(comDir, '@types/index.d.ts')
      if (!fs.existsSync(path.dirname(dtsEntry))) shelljs.mkdir(path.dirname(dtsEntry))
      fs.writeFileSync(
        dtsEntry,
        ejs.render(ejs.render(readEjs('@types/index.d.ts'), ejsCtx))
      )

      const tsconfig = path.resolve(comDir, 'tsconfig.json')
      if (!fs.existsSync(path.dirname(tsconfig))) shelljs.mkdir(path.dirname(tsconfig))
      fs.writeFileSync(
        tsconfig,
        ejs.render(ejs.render(readEjs('tsconfig.json'), ejsCtx))
      )
    }
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