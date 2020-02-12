import React from 'react'
import Router from 'preact-router';
import Match, { Link } from 'preact-router/match';

import useInterval from '../../utils/react-hooks/use-interval'

import './app.scss';
import { Layout, Navbar, Nav } from '../../library/reboot-ui'

import { getJSON } from '../../utils/fetch'

window.__static_prefix__ = window.__static_prefix__ || './reboot-ui/static'

export default function App () {
  const [count, setCount] = React.useState(0);
  const [autoCount, setAutoCount] = React.useState(0);

  const [curPageData, setCurPageData] = React.useState(null);

  React.useEffect(() => {
    // fetch initial data
    getJSON(`${window.__static_prefix__}/docs/components/navs.json`)
      .catch(error => null)
      .then(json => {
        setCurPageData(json || null)
      })
  }, []);

  useInterval(() => {
    setAutoCount(autoCount + 1)
  }, 1000);

  return (
    <>
      <Navbar as={'header'} className="bd-navbar navbar-expand navbar-dark flex-column flex-md-row">
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
        <Layout.Row className="flex-xl-nowrap">
          <Layout.Col className="bd-sidebar" md={{ span: 3 }} xl={{ span: 2 }}>
            <Nav className="bd-links" id="bd-docs-nav">
              <div class="bd-toc-item active">
                <a class="bd-toc-link" href="/docs/4.4/components/alerts/">
                  Components
                </a>

                <ul class="nav bd-sidenav">
                  <li>
                    <a href="/docs/4.4/components/alerts/">
                      Alerts
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/badge/">
                      Badge
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/breadcrumb/">
                      Breadcrumb
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/buttons/">
                      Buttons
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/button-group/">
                      Button group
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/card/">
                      Card
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/carousel/">
                      Carousel
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/collapse/">
                      Collapse
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/dropdowns/">
                      Dropdowns
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/forms/">
                      Forms
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/input-group/">
                      Input group
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/jumbotron/">
                      Jumbotron
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/list-group/">
                      List group
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/media-object/">
                      Media object
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/modal/">
                      Modal
                    </a>
                  </li>
                  <li class="active bd-sidenav-active">
                    <a href="/docs/4.4/components/navs/">
                      Navs
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/navbar/">
                      Navbar
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/pagination/">
                      Pagination
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/popovers/">
                      Popovers
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/progress/">
                      Progress
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/scrollspy/">
                      Scrollspy
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/spinners/">
                      Spinners
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/toasts/">
                      Toasts
                    </a>
                  </li>
                  <li>
                    <a href="/docs/4.4/components/tooltips/">
                      Tooltips
                    </a>
                  </li>
                </ul>
              </div>
            </Nav>
          </Layout.Col>

          <Layout.Col as="main" className="py-md-3 pl-md-5 bd-content" md={{ span: 9 }} xl={{ span: 8 }}>
            <Router>
              <div default>
                {curPageData ? (
                  <div className="bd-markdown-content" dangerouslySetInnerHTML={{ __html: curPageData.html }}></div>
                ) : null}
              </div>
            </Router>
          </Layout.Col>
        </Layout.Row>
      </Layout.Container>
    </>
  );
}