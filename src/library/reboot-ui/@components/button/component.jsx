import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
function Button ({
    children,
    divider = false,
    as: _as = 'button',
    disabled = false, 
    outline = false,
    theme = '',
    size = '',
    active = false,
    __htmlAttributes,
    ...props
}, ref) {
    switch (theme) {
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
            _as = 'a'
            break
        default:
            theme = ''
            break
    }

    if (outline && !theme) theme = 'primary'

    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['button', 'input', 'a'] });

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
            {...__htmlAttributes}
            {...isJSXWithDisabledAttr && disabled && { disabled }}
            {...JSXEl === 'input' && { type: 'button' }}
            ref={ref}
            className={rclassnames(props, [
                'btn',
                theme && `btn-${outline ? 'outline-' : ''}${theme}`,
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