import React from 'react'
import Router, { route } from 'preact-router';
import Match, { Link } from 'preact-router/match';
import { createHashHistory } from 'history';
import classnames from 'classnames'

import './reg-reboot-ui'

import { getJSON } from '../utils/fetch'
import { ucfirst, unprefix, prefix } from '../utils/string'

import allDocVersions from './envs/docVersions'

const REBOOT_DOC_VERSION = process.env.REBOOT_DOC_VERSION

window.__static_prefix__ = window.__static_prefix__ || './reboot-ui/static'

function parseNavData (versionedNavData) {
  const sortCb = (a, b) => a.name < b.name ? -1 : 1

  return {
    'getting-started': [
      'introduction.md',
      // 'download.md',
      // 'contents.md',
      'browsers-devices.md',
      'javascript.md',
      'theming.md',
      // 'build-tools.md',
    ].map(fname => 
      versionedNavData.find(info => info.group === 'getting-started' && info.basename === fname)
    ).filter(x => x),
    layout: [
      'overview.md',
      'grid.md',
      'utilities-for-layout.md',
    ].map(fname => 
      versionedNavData.find(info => info.group === 'layout' && info.basename === fname)
    ).filter(x => x),
    content: versionedNavData.filter(info => info.group === 'content').sort(sortCb),
    components: versionedNavData.filter(info => info.group === 'components').sort(sortCb),
    extend: versionedNavData.filter(info => info.group === 'extend').sort(sortCb),
    utilities: versionedNavData.filter(info => info.group === 'utilities').sort(sortCb),
    all: versionedNavData,
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

const evalDocJs = () => {
  const allJSScripts = document.querySelectorAll('script[data-js-id]')

  allJSScripts.forEach(script => {
    if (script.getAttribute('data-finished')) return ;
    
    script.setAttribute('data-finished', true)
    const ID = script.getAttribute('data-js-id')

    try {
      const jsscript = script.innerText;
      script.remove();

      const newScript = document.createElement('script')
      newScript.id = ID;
      newScript.innerHTML = jsscript;
      document.body.appendChild(newScript);

      newScript.remove();
    } catch(error) {
      console.log(`[error] occured when running example <script data-js-id=${ID}>`)
    }
  })
}

const hideDocSample = () => {
  const allSampleNodes = document.querySelectorAll('.bd-example + .bd-clipboard')

  Array.prototype.forEach.call(allSampleNodes, (node) => {
    if (!node.classList.contains('next-figure-hide'))
      node.classList.add('next-figure-hide')

    if (node.querySelector('.btn-sample-collapse'))
      node.querySelector('.btn-sample-collapse').classList.add('btn-primary')
  })
}

document.addEventListener('click', (evt) => {
  if (!evt.target) return ;
  if (!evt.target.classList.contains('btn-sample-collapse')) return ;

  const pNode = evt.target.parentElement;
  const nextEle = pNode.nextElementSibling;
  if (nextEle && nextEle.tagName.toLowerCase() === 'figure' && nextEle.classList.contains('highlight')) {
    pNode.classList.toggle('next-figure-hide')
  }
})

export default function App () {
  const [showNavs, setShowNavs] = React.useState(false);
  const [docVersion, setDocVersion] = React.useState('4.4-jsx'/* REBOOT_DOC_VERSION */);
  const [navData, setNavData] = React.useState(parseNavData([]));
  const [curPageData, setCurPageData] = React.useState({ relpath: null });

  const mainContentRef = React.useRef(null);

  const fetchNavData = (dv = docVersion) => {
    // fetch initial data
    return getJSON(`${window.__static_prefix__}/doc-data/${dv}/manifest.json`)
      .catch(error => null)
      .then(json => {
        const data = parseNavData(json || [])

        setNavData(data)

        return data
      })
      .then((navData) => {
        const navDatas = Object.values(navData);
        const relpathP = navDatas.find(x => !!x.length)

        if (relpathP) {
          const currentMatched = navDatas.some(
            x1 => x1.some(x2 => 
              x2.relpath === unprefix('/', HASH_ROUTE.location.pathname)
            )
          )

          if (!currentMatched && relpathP[0].relpath)
            route(prefix('/', relpathP[0].relpath), true)
        }
      })
  }

  const fetchMainContent = (jsonpath = curPageData.relpath) => {
    if (!jsonpath) return ;

    // fetch initial data
    return getJSON(`${window.__static_prefix__}/doc-data/${jsonpath}`)
      .catch(error => null)
      .then(json => {
        setCurPageData({
          relpath: jsonpath,
          ...json,
        })

        setTimeout(() => {
          evalDocJs();
          hideDocSample();
        }, 50);

        return json;
      })
  }

  React.useEffect(() => {
    fetchNavData()
  }, []);

  React.useEffect(() => {
    fetchNavData(docVersion)
  }, [docVersion])

  const NAVKEYS = Object.keys(navData).filter(x => x !== 'all')

  return (
    <>
      <Navbar as={'header'} className="bd-navbar navbar-expand navbar-dark flex-column flex-md-row">
        <Navbar.Brand class="mr-0 mr-md-2 d-inline-flex align-items-center">
          <Logo className="d-inline-block align-top mr-2" />
            Reboot UI
        </Navbar.Brand>
        <div class="navbar-nav-scroll">
          <Nav.List navbar className="bd-navbar-nav flex-row">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Docs(JSX)</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Docs(Orignal)</Nav.Link>
            </Nav.Item>
          </Nav.List>
        </div>
        <Nav.List navbar className="ml-md-auto">
          <Nav.DropdownItem>
            <Dropdown.Toggle
              className="mr-md-2"
              id="bd-versions"
            >
              v{docVersion}
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu-md-right"
              aria-labelledby="bd-versions"
            >
              {allDocVersions
                .map((_dversion, idx) => {
                  const active = _dversion === docVersion;

                  return (
                    <Dropdown.Item
                      as={Link}
                      class={classnames(
                        'dropdown-item',
                        active && 'active'
                      )}
                      href={`/${_dversion}/`}
                      onClick={() => {
                        setDocVersion(_dversion)
                      }}
                    >
                      {idx === 0 ? (
                        <>Latest (v{_dversion})</>
                      ) : (
                        <>v{_dversion}</>
                      )}
                    </Dropdown.Item>
                  )
              })}
              <Dropdown.Item divider />
              <Dropdown.Item
                as={Link}
                href={`/versions/`}
              >
                All versions
              </Dropdown.Item>
            </Dropdown.Menu>
          </Nav.DropdownItem>
        </Nav.List>
      </Navbar>
      <Layout.Container
        fluid
        ref={mainContentRef}
      >
        <Layout.Row className="flex-xl-nowrap">
          <Layout.Col className="bd-sidebar" md={{ span: 3 }} xl={{ span: 2 }}>
            <form role="search" class="bd-search d-flex align-items-center">
              <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                <input type="search" class="form-control ds-input" id="search-input" placeholder="Search..." aria-label="Search for..." autocomplete="off" data-docs-version="4.4" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;" />
                <pre aria-hidden="true" style="position: absolute; visibility: hidden; white-space: pre; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
                <span class="ds-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;">
                <div class="ds-dataset-1" />
              </span>
              </span>
              <Button
                theme="link"
                class="bd-search-docs-toggle d-md-none p-0 ml-3"
                onClick={() => setShowNavs(!showNavs)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
              </Button>
            </form>
            <Collapse
              as={Nav}
              collapse={!showNavs}
              className="bd-links"
              id="bd-docs-nav"
            >
              {NAVKEYS.map((group) => {
                return (
                  <Match path={`/${docVersion}/${group}/:basename`}>
                    {({ matches, path: curRoutePath }) => {
                      if (!navData[group].length) return ;

                      return (
                        <div
                          key={`toc-${group}`}
                          class={[
                            "bd-toc-item",
                            matches && "active"
                          ].filter(x => x).join(' ')}
                        >
                          <Link
                            class="bd-toc-link"
                            href={`/${navData[group][0] ? `${navData[group][0].relpath}` : ''}`}
                          >
                            {ucfirst(group)}
                          </Link>

                          <ul class="nav bd-sidenav">
                            {navData[group].map(info => {
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
            </Collapse>
          </Layout.Col>

          <Router
            onChange={(evt) => {
              fetchMainContent(unprefix('/', evt.url))
            }}
            history={HASH_ROUTE}
          >
            {navData['getting-started'] && navData['getting-started'][0] && navData['getting-started'][0].relpath ? (
              <Redirect path="/" to={navData['getting-started'][0].relpath} />
            ) : (
              <div path="/">loading...</div>
            )}
            {navData.all.map((component, idx) => {
              return (
                <Layout.Col
                  {...idx === 0 && { default: true }}
                  path={`/${component.relpath}`}
                  as="main"
                  className="py-md-3 pl-md-5 bd-content"
                  md={{ span: 9 }}
                  xl={{ span: 8 }}
                  {...curPageData.html && {
                    dangerouslySetInnerHTML: { __html: curPageData.html }
                  }}
                />
              )
            })}
            {navData.all.map((component) => {
              return (
                <Redirect
                  path={`/${component.group}/${component.basename}`}
                  to={`/${component.relpath}`}
                />
              )
            })}
          </Router>
        </Layout.Row>
      </Layout.Container>
    </>
  );
}