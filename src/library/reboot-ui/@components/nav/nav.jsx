import React from 'react'

import Dropdown from '../dropdown';

import { rclassnames, isReactTypeOf } from '../common';
import { flatten2trimedStrList } from '../../../../utils/string';
import { arraify } from '../../../../utils/array';
import { resolveJSXElement } from '../common';
import Anchor from '../helper-anchor';

/**
 * @see https://getbootstrap.com/docs/4.4/components/nav/#supported-content
 * 
 * @inner-content `.nav-item`
 * @inner-content `.nav-link`
 */
const Nav = function ({
    children,
    navAsParent = false,
    as: _as = navAsParent ? 'div' : 'nav',
    /**
     * @enum tabs
     * @enum pills
     */
    theme = '',
    navbar = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'nav', 'ul', 'ol'] });

    const themes = flatten2trimedStrList(theme)

    let use_tabs = themes.includes('tabs')
    let use_pills = !use_tabs && themes.includes('pills')

    let use_fill = !use_tabs && themes.includes('fill')
    let use_justified = !use_fill && themes.includes('justified')

    const node = (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                !navbar ? 'nav' : 'navbar-nav',
                use_tabs && 'nav-tabs',
                use_pills && 'nav-pills',
                use_fill && 'nav-fill',
                use_justified && 'nav-justified',
            ])}
        >
            {children}
        </JSXEl>
    )

    return navAsParent ? <nav>{node}</nav> : node
}

Nav.List = function ({
    children,
    as: _as = 'ul',
    ...props
}) {
    _as = resolveJSXElement(_as, { allowedHTMLTags: ['ul', 'ol'] });

    return (
        <Nav
            as={_as}
            {...props}
        >
            {children}
        </Nav>
    )
}

Nav.DropdownItem = function ({ children: childEles, ...props }) {
    const children = arraify(childEles);
    const menuNode = children.find(el => isReactTypeOf(el, Dropdown.Menu))
    let togglerNode = children.find(el => isReactTypeOf(el, Dropdown.Toggle))

    const restChildren = children.filter(el => el !== menuNode && el !== togglerNode)

    if (!togglerNode)
        togglerNode = <Dropdown.Toggle as={null} toggleAs={Nav.Link}>{restChildren}</Dropdown.Toggle>
    else
        togglerNode = React.cloneElement(togglerNode, { toggleAs: Nav.Link, as: null })

    return (
        <Dropdown
            {...props}
            as={Nav.Item}
            overlay={menuNode || null}
        >
            {togglerNode}
        </Dropdown>
    )
}

Nav.Item = function ({
    children,
    link,
    as: _as = link ? Nav.Link : 'li',
    active = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "nav-item",
                active && 'active'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Nav.Link = function ({
    children,
    as: _as = 'a',
    active,
    disabled,
    ...props
}) {
    if (_as === 'a') _as = Anchor
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['a'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "nav-link",
                active && 'active',
                disabled && 'disabled',
            ])}
            {...disabled && {
                'aria-disabled': true,
                disabled: true,
                // un-tabfocusable
                tabindex: '-1',
            }}
        >
            {children}
        </JSXEl>
    )
}

export default Nav