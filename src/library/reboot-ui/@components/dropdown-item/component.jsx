import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
function DropdownItem ({
    children,
    divider = false,
    as: _as = 'div',
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    return (
        <JSXEl
            {...props}
            {...ref && { ref }}
            className={classnames([
                props.className,
                props.class,
                !divider ? 'dropdown-item' : 'dropdown-divider'
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(DropdownItem)