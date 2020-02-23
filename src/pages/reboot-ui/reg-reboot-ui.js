import React from 'react'
import ReactDOM from 'react-dom'

import * as RebootUI from '../../library/reboot-ui'

Object.keys(RebootUI).forEach(comName => {
    window[comName] = RebootUI[comName]
})

window.React = React;
window.ReactDOM = ReactDOM;