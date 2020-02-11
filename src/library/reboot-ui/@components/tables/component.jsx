import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

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
            className={classnames([
                props.className,
                "table"
            ])}
        >
            {children}
        </JSXEl>
    )
}