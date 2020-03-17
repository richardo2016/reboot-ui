import React from 'react'

import App from './app.jsx';

import './app.scss';

import './docs/4.4'
import './docs/4.4-jsx'

import { getJSON } from '../utils/fetch'

const fetchSiteData = () => {
    return getJSON(`${window.__static_prefix__}/doc-data/data.json`)
      .catch(error => null)
      .then(data => {
        window.site = window.siteDataWrapper = data;
  
        return data
      })
}

fetchSiteData()
    .then(() => {
        React.render(
            <App />,
            document.querySelector('#app')
        )
    })
