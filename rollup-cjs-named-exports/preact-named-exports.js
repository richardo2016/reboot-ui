import preact from 'preact';
import { version as preactVersion } from 'preact/package.json'
import compat from 'preact/compat'

import * as reactIs from 'react-is';
import { version as reactIsVersion } from 'react-is/package.json'

const compatPreact = Array.from(
    new Set(
        [].concat(Object.keys(compat))
    )
).filter(key => !preact.hasOwnProperty(key))

export default {
    preact: compatPreact,
    [`node_modules/preact/dist/preact.js`]: compatPreact,
    [`node_modules/_preact@${preactVersion}@preact/dist/preact.js`]: compatPreact,
    [`node_modules/preact/dist/preact.module.js`]: compatPreact,
    [`node_modules/_preact@${preactVersion}@preact/dist/preact.module.js`]: compatPreact,
    [`node_modules/preact/dist/preact.umd.js`]: compatPreact,
    [`node_modules/_preact@${preactVersion}@preact/dist/preact.umd.js`]: compatPreact,

    'react-is': Object.keys(reactIs),
    [`node_modules/_react-is@${reactIsVersion}@react-is/index.js`]: Object.keys(reactIs),
}