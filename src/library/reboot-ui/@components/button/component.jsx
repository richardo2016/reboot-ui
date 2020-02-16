import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
function Button ({
    children,
    divider = false,
    as: _as = 'button',
    disabled = false, 
    outline = false,
    type = '',
    size = '',
    active = false,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['button', 'input', 'a'] });

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

    switch (size) {
        case 'lg':
        case 'sm':
            break
        default:
            size = ''
            break
    }

    const isJSXWithDisabledAttr = ['button', 'input'].some(x => x === JSXEl)

    return (
        <JSXEl
            {...props}
            {...isJSXWithDisabledAttr && disabled && { disabled }}
            {...type && { type }}
            ref={ref}
            className={classnames([
                props.className,
                props.class,
                'btn',
                type && `btn-${outline ? 'outline-' : ''}${type}`,
                size && `btn-${size}`,
                active && `active`,
                disabled && !isJSXWithDisabledAttr && `disabled`
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(Button)