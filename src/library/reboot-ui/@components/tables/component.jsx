import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like';

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