const preact = require('preact');
const { version: preactVersion } = require('preact/package.json');
const compat = require('preact/compat');

const reactIs = require('react-is');
const { version: reactIsVersion } = require('react-is/package.json');

const compatPreact = Array.from(
    new Set(
        [].concat(Object.keys(compat))
    )
).filter(key => !preact.hasOwnProperty(key))

exports.default = {
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