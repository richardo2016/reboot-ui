import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement, getHTMLAttributesFromProps } from '../../utils/ui'

/**
 * @see https://getbootstrap.com/docs/4.4/components/badge
 */
function Badge ({
    children,
    as: _as = 'span',
    type = '',
    pill = false,
    __htmlAttributes,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['button', 'span', 'a'] });

    switch (type) {
        case 'primary':
        case 'secondary':
        case 'success':
        case 'danger':
        case 'warning':
        case 'info':
        case 'light':
        case 'dark':
            break
        case 'link':
            outline = false
            break
        default:
            type = ''
            break
    }

    return (
        <JSXEl
            {...props}
            {...__htmlAttributes}
            ref={ref}
            className={classnames([
                props.className,
                props.class,
                'badge',
                type && `badge-${type}`,
                pill && `badge-pill`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(Badge)