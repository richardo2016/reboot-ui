import React from 'react'

import { resolveJSXElement } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'
import { getDirectionAboutClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver'
import Anchor from '@reboot-ui/icomponent-anchor'

export const DropdownItem = React.forwardRef(function ({
    children,

    divider = false,
    header = false,

    as: _as = 'div',
    active = false,
    disabled = false,
    ...props
}, ref) {
    if (_as === 'a') _as = Anchor
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const isNotItem = divider || header;

    return (
        <JSXEl
            {...props}
            {...ref && { ref }}
            className={rclassnames(props, !isNotItem ? [
                'dropdown-item',
                active && 'active',
                disabled && 'disabled'
            ] : [
                divider && 'dropdown-divider',
                header && 'dropdown-header',
            ])}
        >
            {divider ? null : children}
        </JSXEl>
    )
})

export const DropdownMenu = React.forwardRef(function ({
    children,
    as: _as = 'div',
    placement,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const _type = typeof placement
    const clsList = getDirectionAboutClsNameListFromBreakPointConfig('dropdown-menu', {
        ..._type === 'string' && { direction: placement },
        ..._type === 'object' && placement
    })

    return (
        <JSXEl
            {...props}
            {...ref && { ref }}
            className={rclassnames(props, [
                'dropdown-menu',
            ].concat(clsList))}
        >
            {children}
        </JSXEl>
    )
})