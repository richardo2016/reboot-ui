import React from 'react'
import useInterval from '../../utils/react-hooks/use-interval'

import './app.scss';

import { Layout, Navbar } from '../../library/reboot-ui'

import './setup';

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
    <>
      <Navbar as={'header'} className="bg-navbar navbar-expand navbar-dark flex-column flex-md-row">
        <a class="navbar-brand mr-0 mr-md-2 d-inline-flex align-items-center" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="d-inline-block align-top mr-2" viewBox="0 0 612 612" role="img" focusable="false"><title>Bootstrap</title><path fill="currentColor" d="M510 8a94.3 94.3 0 0 1 94 94v408a94.3 94.3 0 0 1-94 94H102a94.3 94.3 0 0 1-94-94V102a94.3 94.3 0 0 1 94-94h408m0-8H102C45.9 0 0 45.9 0 102v408c0 56.1 45.9 102 102 102h408c56.1 0 102-45.9 102-102V102C612 45.9 566.1 0 510 0z"></path><path fill="currentColor" d="M196.77 471.5V154.43h124.15c54.27 0 91 31.64 91 79.1 0 33-24.17 63.72-54.71 69.21v1.76c43.07 5.49 70.75 35.82 70.75 78 0 55.81-40 89-107.45 89zm39.55-180.4h63.28c46.8 0 72.29-18.68 72.29-53 0-31.42-21.53-48.78-60-48.78h-75.57zm78.22 145.46c47.68 0 72.73-19.34 72.73-56s-25.93-55.37-76.46-55.37h-74.49v111.4z"></path></svg>
            Reboot UI
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
                {/* <span class="sr-only">(current)</span> */}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Components</a>
            </li>
          </ul>
        </div>
      </Navbar>
      <Layout.Container className="app" fluid>
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
    </>
  );
}