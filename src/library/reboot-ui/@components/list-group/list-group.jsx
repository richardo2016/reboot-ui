import React from 'react'

import { resolveJSXElement } from '../common'
import { rclassnames } from '../common'
import { filterRepsonsiveSize, filterThemeName } from '../common'

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
    size = '',
    ...props
}) {
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
    theme = '',
    ...props
}) {
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

ListGroup.LinkItem = function ({
    children,
    as: _as = 'a',
    action = true,
    href = 'javascript:;',
    ...props
}) {
    return (
        <ListGroup.Item
            {...props}
            href={href}
            as={_as}
            action={action}
        >
            {children}
        </ListGroup.Item>
    )
}

ListGroup.ButtonItem = function ({
    children,
    action = true,
    ...props
}) {
    return (
        <ListGroup.Item
            {...props}
            as={'button'}
            action={action}
        >
            {children}
        </ListGroup.Item>
    )
}

export default ListGroup