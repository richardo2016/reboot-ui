const fs = require('fs')
const path = require('path')

const limitedPkg = process.env.PACKAGE_NAME || process.env.PKG_NAME || process.env.PKG

exports.getAllComponents = (COM_ROOT) => {
    return fs.readdirSync( COM_ROOT )
        .filter(name => {
            // all base components must existed
            if (name.startsWith('helper-')) return true
            if (name === 'common') return true
            
            if (limitedPkg && name !== limitedPkg) return false;

            if (name === 'style') return false
            if (name.startsWith('_')) return false
            if (!fs.statSync(path.join(COM_ROOT, name)).isDirectory()) return false

            return true
        })
}


exports.capitalize = function (str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

exports.getComponentCamelCaseName = function (comDir) {
    return comDir.split('-').map(frag => capitalize(frag)).join('')
}