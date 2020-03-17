const react = require('react');
const { version: reactVersion } = require('react/package.json');
const reactDom = require('react-dom');
const { version: reactDomVersion } = require('react-dom/package.json');
const reactIs = require('react-is');
const { version: reactIsVersion } = require('react-is/package.json');
const propTypes = require('prop-types');
const { version: propTypesVersion } = require('prop-types/package.json');

exports.default = {
    react: Object.keys(react),
    [`node_modules/_react@${reactVersion}@react/index.js`]: Object.keys(react),
    'react-dom': Object.keys(reactDom),
    [`node_modules/_react-dom@${reactDomVersion}@react-dom/index.js`]: Object.keys(reactDom),
    'react-is': Object.keys(reactIs),
    [`node_modules/_react-is@${reactIsVersion}@react-is/index.js`]: Object.keys(reactIs),
    
    'prop-types': Object.keys(propTypes),
    [`node_modules/_prop-types@${propTypesVersion}@prop-types/index.js`]: Object.keys(propTypes),
}