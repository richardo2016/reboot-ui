import React from 'react'
import useInterval from '../../utils/react-hooks/use-interval'

import './style.styl'

export default function App () {
  const [count, setCount] = React.useState(0);
  const [autoCount, setAutoCount] = React.useState(0);

  React.useEffect(() => {
    // fetch initial data
  }, []);

  useInterval(() => {
    setAutoCount(autoCount + 1)
  }, 1000);

  return (
    <div class="app">
      <h1>assets-rollup-mvvm: preact</h1>
      <button
        class="app-inner"
        onClick={() => setCount(count + 1)}
        >
        count: {count}
      </button>
      <p style={{ color: 'black' }}>
        autoCount: {autoCount}
      </p>
    </div>
  );
}