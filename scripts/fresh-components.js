const fs = require('fs')
const path = require('path')

const shelljs = require('shelljs')

const UI_ROOT = path.resolve(__dirname, '../src/library/reboot-ui')
const COM_ROOT = path.resolve(UI_ROOT, '@components')

const { getAllComponents } = require('../rollup-utils/build')
const allComponentNames = getAllComponents(COM_ROOT)

allComponentNames
.filter(comname => {
    if (comname === 'common') return 
    if (comname.startsWith('helper-')) return
    
    return true
})
.forEach(comname => {
    const newJsx = path.resolve(COM_ROOT, `./${comname}/${comname}.jsx`)
    if (!fs.existsSync(newJsx))
        fs.writeFileSync(newJsx,
`\
import React from 'react'

import {
    resolveJSXElement,
    rclassnames
} from '../common'

export default function ({
    as: _as = 'div',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            className={rclassnames(props, [
            ])}
        >
            {children}
        </JSXEl>
    )
}
`
        )
    
    const newScss = path.resolve(COM_ROOT, `./${comname}/${comname}.scss`)
    if (!fs.existsSync(newScss)) {
        const hasBsStyle = fs.existsSync(path.resolve(COM_ROOT, `./style/bootstrap/_${comname}.scss`))
        fs.writeFileSync(newScss,
`\
@import "../style/base";
${hasBsStyle ? `\n@import "../style/bootstrap/${comname}";` : ''}
`
                    )
    }

    const newIndex = path.resolve(COM_ROOT, `./${comname}/index.js`)
    if (!fs.existsSync(newIndex)) {
        fs.writeFileSync(newIndex,
`\
export { default } from './${comname}.jsx'

import './${comname}.scss'
`
        )
    }
})

console.info(`success!`)