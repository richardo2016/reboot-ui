import * as react from 'react';
import { version as reactVersion } from 'react/package.json'
import * as reactDom from 'react-dom';
import { version as reactDomVersion } from 'react-dom/package.json'
import * as reactIs from 'react-is';
import { version as reactIsVersion } from 'react-is/package.json'
import * as propTypes from 'prop-types';
import { version as propTypesVersion } from 'prop-types/package.json';

export default {
    react: Object.keys(react),
    [`node_modules/_react@${reactVersion}@react/index.js`]: Object.keys(react),
    'react-dom': Object.keys(reactDom),
    [`node_modules/_react-dom@${reactDomVersion}@react-dom/index.js`]: Object.keys(reactDom),
    'react-is': Object.keys(reactIs),
    [`node_modules/_react-is@${reactIsVersion}@react-is/index.js`]: Object.keys(reactIs),
    
    'prop-types': Object.keys(propTypes),
    [`node_modules/_prop-types@${propTypesVersion}@prop-types/index.js`]: Object.keys(propTypes),
}