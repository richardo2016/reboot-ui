import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like'

import Anchor from '../_helpers/anchor'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
function Button ({
    children,
    divider = false,
    as: _as = 'button',
    disabled = false, 
    outline = false,
    block = false,
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
            _as = Anchor
            break
        default:
            theme = ''
            break
    }

    if (outline && !theme) theme = 'primary'

    let JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['button', 'input', 'a', 'label', 'div'] */ });

    switch (size) {
        case 'lg':
        case 'sm':
            break
        default:
            size = ''
            break
    }

    if (JSXEl === 'a') JSXEl = Anchor

    const isJSXWithDisabledAttr = ['button', 'input'].some(x => x === JSXEl)

    return (
        <JSXEl
            {...JSXEl === 'input' && { type: 'button' }}
            {...JSXEl === 'button' && { type: 'button' }}
            {...JSXEl === Anchor && { role: 'button' }}
            {...props}
            {...__htmlAttributes}
            {...isJSXWithDisabledAttr && disabled && { disabled }}
            {...disabled && {
                'aria-disabled': true
            }}
            ref={ref}
            className={rclassnames(props, [
                'btn',
                theme && `btn-${outline ? 'outline-' : ''}${theme}`,
                size && `btn-${size}`,
                block && `btn-block`,
                active && `active`,
                disabled && !isJSXWithDisabledAttr && `disabled`
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(Button)