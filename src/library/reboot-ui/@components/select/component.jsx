
import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, isReactTypeOf } from '../../../../utils/react-like';
import { arraify } from '../../../../utils/array';

const Select = function ({
    children,
    id = '',
    as: _as = 'select',
    multiple = false,
    size,
    controlSize = '',
    ...props
}) {
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
}) {
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