const fs = require('fs')
const path = require('path')

export const getAllComponents = (COM_ROOT) => {
    return fs.readdirSync( COM_ROOT )
        .filter(name => {
            // all base components must existed
            if (name.startsWith('helper-')) return true
            if (name === 'common') return true
            
            if (process.env.PACKAGE_NAME && name !== process.env.PACKAGE_NAME) return false;

            if (name === 'style') return false
            if (name.startsWith('_')) return false
            if (!fs.statSync(path.join(COM_ROOT, name)).isDirectory()) return false

            return true
        })
}