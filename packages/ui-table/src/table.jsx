import React from 'react'

import { resolveJSXElement, rclassnames } from '../../common';

/**
 */
export default function Table ({
    children,
    as: _as = 'table',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'table'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "table"
            ])}
        >
            {children}
        </JSXEl>
    )
}