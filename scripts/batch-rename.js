const fs = require('fs')
const path = require('path')

const shelljs = require('shelljs')

const UI_ROOT = path.resolve(__dirname, '../src/library/reboot-ui')
const COM_ROOT = path.resolve(UI_ROOT, '@components')
const allComponentNames = fs.readdirSync( COM_ROOT )
    .filter(name => {
        if (name === 'common') return false
        if (name === 'style') return false
        if (name.startsWith('_')) return false
        if (!fs.statSync(path.join(COM_ROOT, name)).isDirectory()) return false

        return true
    })

console.log('allComponentNames', allComponentNames);

allComponentNames.forEach(comname => {
    function capitalize (str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase()
    }

    function getComponentCamelCaseName (comDir) {
        return comDir.split('-').map(frag => capitalize(frag)).join('')
    }
    
    const oldJsx = path.resolve(COM_ROOT, `./${comname}/component.jsx`)
    const newJsx = path.resolve(COM_ROOT, `./${comname}/${comname}.jsx`)

    if (fs.existsSync(oldJsx)) shelljs.mv(oldJsx, newJsx)
    
    const oldScss = path.resolve(COM_ROOT, `./${comname}/component.scss`)
    const newScss = path.resolve(COM_ROOT, `./${comname}/${comname}.scss`)

    if (fs.existsSync(oldScss)) shelljs.mv(oldScss, newScss)

    if (comname !== 'layout-grid')
        fs.writeFileSync(
            path.resolve(COM_ROOT, `./${comname}/index.js`),
`\
export { default } from './${comname}.jsx'

import './${comname}.scss'
`
        )
})

console.info(`success!`)