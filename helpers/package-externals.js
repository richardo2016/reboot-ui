const fs = require('fs')
const path = require('path')

const externalComponents = fs.readdirSync(
    path.resolve(__dirname, '../packages')
).filter(dirname => dirname.indexOf('ui-') === 0)

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
.concat('../../common')
.concat(externalComponents.map(com_name => `../../${com_name}/${com_name}`))
.concat(externalComponents.map(com_name => `../../${com_name}/index.js`))
.concat(externalComponents.map(com_name => `../../${com_name}`))