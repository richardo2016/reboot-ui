import React from 'react'
import useInterval from '../../utils/react-hooks/use-interval'

import { Layout } from '../../library/reboot-ui'

import './setup';
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
      <Layout.Container size={'sm'}>
        <Layout.Row>
          <h1>assets-rollup-mvvm: react</h1>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span={6} offset={3} />
        </Layout.Row>
        <Layout.Row>
          <Layout.Col sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 3 }} />
        </Layout.Row>
        <Layout.Row>
          <Layout.Col sm={{ span: 6, offset: 1 }} md={{ span: 4, offset: 3 }} lg={{ span: 3, offset: 2 }} />
        </Layout.Row>
        <button
          class="app-inner"
          onClick={() => setCount(count + 1)}
          >
          count: {count}
        </button>
        <p style={{ color: 'black' }}>
          autoCount: {autoCount}
        </p>
      </Layout.Container>
    </div>
  );
}