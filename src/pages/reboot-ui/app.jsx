import React from 'react'
import Router, { route } from 'preact-router';
import Match, { Link } from 'preact-router/match';
import { createHashHistory } from 'history';

import './app.scss';
import { Layout, Navbar, Nav } from '../../library/reboot-ui'

import { getJSON } from '../../utils/fetch'
import { ucfirst, unprefix } from '../../utils/string'

const DOC_VERSION = process.env.DOC_VERSION

window.__static_prefix__ = window.__static_prefix__ || './reboot-ui/static'

function parseNavData (navData) {
  const sortCb = (a, b) => a.name < b.name ? -1 : 1

  return {
    components: navData.filter(info => info.type === 'components').sort(sortCb),
    content: navData.filter(info => info.type === 'content').sort(sortCb),
    layout: navData.filter(info => info.type === 'layout').sort(sortCb),
    extend: navData.filter(info => info.type === 'extend').sort(sortCb),
    utilities: navData.filter(info => info.type === 'utilities').sort(sortCb),
    all: navData,
  }
}

class Redirect extends React.Component {
  componentWillMount() {
    route(this.props.to, true);
  }

  render() {
    return null;
  }
}

const HASH_ROUTE = createHashHistory()

export default function App () {
  const [navData, setNavData] = React.useState(parseNavData([]));
  const [curPageData, setCurPageData] = React.useState({ relpath: null });

  const fetchNavData = () => {
    // fetch initial data
    return getJSON(`${window.__static_prefix__}/docs/${DOC_VERSION}/manifest.json`)
      .catch(error => null)
      .then(json => {
        const data = parseNavData(json || [])

        setNavData(data)

        return data
      })
  }

  const updateCurRelpath = (relpath) => {
    setCurPageData({
      ...curPageData,
      relpath,
    })
  }

  const fetchMainContent = (jsonpath = curPageData.relpath) => {
    if (!jsonpath) return ;

    // fetch initial data
    return getJSON(`${window.__static_prefix__}/docs/${DOC_VERSION}/${jsonpath}`)
      .catch(error => null)
      .then(json => {
        setCurPageData({
          relpath: jsonpath,
          ...json,
        })

        return json;
      })
  }

  React.useEffect(() => {
    fetchNavData()
  }, []);

  const NAVKEYS = Object.keys(navData).filter(x => x !== 'all')

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
              {NAVKEYS.map((toc) => {
                return (
                  <Match path={`/${toc}/:basename`}>
                    {({ matches, path: curRoutePath }) => {
                      return (
                        <div
                          key={`toc-${toc}`}
                          class={[
                            "bd-toc-item",
                            matches && "active"
                          ].filter(x => x).join(' ')}
                        >
                          <Link
                            class="bd-toc-link"
                            href={`/${navData[toc][0] ? `${navData[toc][0].relpath}` : ''}`}
                          >
                            {ucfirst(toc)}
                          </Link>

                          <ul class="nav bd-sidenav">
                            {navData[toc].map(info => {
                              const matches = `/${info.relpath}` === curRoutePath;

                              return (
                                <li
                                  className={[
                                    matches && 'active bd-sidenav-active'                                
                                  ].filter(x => x).join(' ')}
                                >
                                  {matches && <a href="javascript:void(0);">{info.attributes.title}</a>}
                                  {!matches && (
                                    <Link href={`/${info.relpath}`}>
                                      {info.attributes.title}
                                    </Link>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )
                    }}
                  </Match>
                )
              })}
            </Nav>
          </Layout.Col>

          <Router
            onChange={(evt) => {
              fetchMainContent(unprefix('/', evt.url))
            }}
            history={HASH_ROUTE}
          >
            {navData.all && navData.all[0] && navData.all[0].relpath ? (
              <Redirect path="/" to={navData.all[0].relpath} />
            ) : (
              <div path="/">loading...</div>
            )}
            {navData.components.map((component, idx) => {
              return (
                <Layout.Col
                  {...idx === 0 && { default: true }}
                  path={`/${component.relpath}`}
                  as="main" className="py-md-3 pl-md-5 bd-content" md={{ span: 9 }} xl={{ span: 8 }}
                  {...curPageData.html && {
                    dangerouslySetInnerHTML: { __html: curPageData.html }
                  }}
                />
              )
              })}
          </Router>
        </Layout.Row>
      </Layout.Container>
    </>
  );
}