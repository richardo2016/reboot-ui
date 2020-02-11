import '../../utils/preact-helpers/preact-hooks-patch'
import * as React from 'preact'

import App from './app.jsx';

React.render(
    <App />,
    document.querySelector('#app')
)
// console.log('123')
