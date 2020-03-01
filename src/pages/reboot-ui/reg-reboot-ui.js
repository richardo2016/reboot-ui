import React from 'react'
import ReactDOM from 'react-dom'

import * as RebootUI from '../../library/reboot-ui'
import * as stringUtils from '../../utils/string'
import classnames from 'classnames'

Object.keys(RebootUI).forEach(comName => {
    window[comName] = RebootUI[comName]
})

window.React = React;
window.ReactDOM = ReactDOM;

window.stringUtils = stringUtils;
window.classnames = classnames;