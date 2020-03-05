
import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, isReactTypeOf, tryUseContext } from '../../../../utils/react-like';
import { arraify } from '../../../../utils/array';
import { FormControlContext } from '../form/context';
import { filterFormControlSize } from '../common-utils';

const Select = function ({
    children,
    id = '',
    as: _as = 'select',
    multiple = false,
    custom,
    size,
    controlSize = '',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const formCtrlCtx = tryUseContext(FormControlContext)
    if (custom === undefined) custom = formCtrlCtx.custom

    if (!formCtrlCtx.inFormContrl && !custom) controlSize = ''
    else controlSize = filterFormControlSize(controlSize)

    children = arraify(children).filter(item => isReactTypeOf(item, [Select.Option, 'option']))

    id = id || formCtrlCtx.controlId
    
    return (
        <JSXEl
            {...props}
            {...id && { id }}
            {...multiple && { multiple }}
            {...size && { size }}
            className={rclassnames(props, [
                formCtrlCtx.inFormContrl && !formCtrlCtx.custom && 'form-control',
                custom && 'custom-select',
                controlSize && custom && `custom-select-${controlSize}`,
                controlSize && !custom && `form-control-${controlSize}`,
            ])}
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