import React from 'react'

import { useInterval } from '../../utils/react-hooks/use-timer'

import Main from './main/index.jsx'

import './style.styl'

export default function App () {
  const [autoCount, setAutoCount] = React.useState(0);

  React.useEffect(() => {
    // fetch initial data
  }, []);

  useInterval(() => {
    setAutoCount(autoCount + 1)
  }, 1000);

  return (
    <div className="sample-preact-layer">
      <h1 style={{textAlign: 'center'}}>
        Sample: Twitter Profile Card<br />
        Counter: {autoCount}
      </h1>
      <Main style={{margin: '0 auto', width: '600px'}} />
    </div>
  );
}