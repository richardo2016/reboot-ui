import '../../utils/preact-helpers/preact-hooks-patch'
// import './style.scss'

import { default as LayoutContainer } from './@components/layout-container'
export { LayoutContainer as Container }

import { Row, Col } from './@components/layout-grid'
export { Row, Col }

export const Layout = {
    Container: LayoutContainer,
    Row,
    Col
}
// console.log('123')
