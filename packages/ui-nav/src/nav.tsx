import React from 'react'

import { rclassnames, RebootUI } from '@reboot-ui/common';
import { flatten2trimedStrList } from '@reboot-ui/common';
import { resolveJSXElement } from '@reboot-ui/common';
import Anchor from '@reboot-ui/icomponent-anchor';

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
    theme,
    navbar = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    navAsParent?: boolean
    theme?: 'tabs' | 'pills',
    navbar?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'nav', 'ul', 'ol'] });

    const themes = flatten2trimedStrList(theme as string)

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
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'ul' | 'ol'>
}>) {
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

Nav.Item = function ({
    children,
    link,
    as: _as = link ? Nav.Link : 'li' as any,
    active = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    link?: boolean
    active?: boolean
}>) {
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
}: RebootUI.IComponentPropsWithChildren<{
    active?: boolean
    disabled?: boolean
    as: RebootUI.IPropAs<'a'>
}>) {
    if (_as === 'a')
        _as = Anchor as any
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