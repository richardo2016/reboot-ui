import React from 'react'

import { resolveJSXElement } from '../common'
import { rclassnames } from '../common';

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.navbar-brand`
 * @inner-content `.navbar-nav`
 * @inner-content `.navbar-toggler`
 * 
 * @inner-content `.navbar-text`
 * @inner-content `.collapse.navbar-collapse`
 */
export default function Navbar ({
    children,
    as: _as = 'div',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'nav', 'header'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "navbar"
            ])}
        >
            {children}
        </JSXEl>
    )
}