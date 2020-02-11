import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

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
    as: _as,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as);

    return (
        <JSXEl
            {...props}
            className={classnames([
                props.className,
                "navbar"
            ])}
        >
            {children}
        </JSXEl>
    )
}