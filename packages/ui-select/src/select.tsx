import React from 'react'

import { resolveJSXElement, rclassnames, arraify, isReactTypeOf, RebootUI } from '@reboot-ui/common';

const Select = function ({
    children,
    id = '',
    as: _as = 'select',
    multiple = false,
    size,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'select'>
    multiple?: boolean
    size?: RebootUI.BinarySizeType
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    children = arraify(children).filter(item => isReactTypeOf(item, [Select.Option, 'option']))
    
    return (
        <JSXEl
            {...props}
            {...id && { id }}
            {...multiple && { multiple }}
            {...size && { size }}
        >
            {children}
        </JSXEl>
    )
}

Select.Option = function ({
    children,
    as: _as = 'option',
    value = '',
    checked = false,
    selected = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'option'>
    value?: HTMLOptionElement['value']
    checked?: boolean
    selected?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            {...checked && { checked }}
            {...selected && { selected }}
            value={value}
            className={rclassnames(props, [
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default Select