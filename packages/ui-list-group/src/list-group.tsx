import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'
import { filterRepsonsiveSize, filterThemeName } from '@reboot-ui/common'
import Anchor from '@reboot-ui/icomponent-anchor'

/**
 * @see https://getbootstrap.com/docs/4.4/components/list-group/#supported-content
 * 
 * @inner-content `.list-group`
 * @inner-content `.list-group-item`
 */
const ListGroup = function ({
    children,
    as: _as = 'ul',
    flush = false,
    horizontal = false,
    size,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    flush?: boolean
    horizontal?: boolean
    size?: Parameters<typeof filterRepsonsiveSize>[0]
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['ul', 'ol', 'div'] });

    size = filterRepsonsiveSize(size)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `list-group`,
                flush && `list-group-flush`,
                `${horizontal && `list-group-horizontal`}${(size ? `-${size}` : '')}`
            ])}
        >
            {children}
        </JSXEl>
    )
}

ListGroup.Item = function ({
    children,
    action = false,
    as: _as = action ? 'a' : 'li',
    active = false,
    disabled = false,
    theme,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    action?: boolean
    active?: boolean
    disabled?: boolean
    theme?: RebootUI.ThemeType
}>) {
    if (_as === 'a') _as = Anchor
    
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    theme = filterThemeName(theme)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `list-group-item`,
                `list-group-item-action`,
                theme && `list-group-item-${theme}`,
                active && 'active',
                disabled && 'disabled',
            ])}
            {...disabled && {
                'aria-disabled': true
            }}
        >
            {children}
        </JSXEl>
    )
}

ListGroup.LinkItem = ({
    ...props
}: RebootUI.IComponentPropsWithChildren) => (
    <ListGroup.Item {...props} action as="a" />
)

ListGroup.ButtonItem = function ({
    children,
    action = true,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    action?: boolean
}>) {
    return (
        <ListGroup.Item
            {...props}
            as="button"
            action={action}
        >
            {children}
        </ListGroup.Item>
    )
}

export default ListGroup