const fs = require('fs')
const path = require('path')

const componentDirs = fs.readdirSync(
    path.resolve(__dirname, '../packages')
).filter(dname => 
    dname.indexOf('ui-') === 0
    || dname.indexOf('internal-') === 0
    || dname.indexOf('icomponent-') === 0
)

module.exports = [
    'react',
    'react-dom',
    'preact',
    'classnames',
    'react-transition-group',

    '@popperjs/core',
    '@popperjs/core/lib/popper-lite',
    '@popperjs/core/lib/modifiers/flip',
    '@popperjs/core/lib/modifiers/preventOverflow',
    '@popperjs/core/lib/modifiers/offset',
    '@popperjs/core/lib/modifiers/arrow',
    '@popperjs/core/lib/modifiers/computeStyles',
    '@popperjs/core/lib/modifiers/applyStyles',
]
// .concat(componentDirs.map(com_dname => `../../${com_dname}/${com_dname}`))
// .concat(componentDirs.map(com_dname => `../../${com_dname}/index.js`))
// .concat(componentDirs.map(com_dname => `../../${com_dname}`))
.concat(componentDirs.map(com_dname => `@reboot-ui/${com_dname}`))