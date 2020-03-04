
import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, isReactTypeOf, tryUseContext } from '../../../../utils/react-like';
import { arraify } from '../../../../utils/array';
import { FormControlContext } from '../form/context';
import { filterFormControlSize } from '../common-utils';

const Select = function ({
    children,
    as: _as = 'select',
    multiple = false,
    size: formCtrlSize = '',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const formCtrlCtx = tryUseContext(FormControlContext)

    if (!formCtrlCtx.inFormContrl) formCtrlSize = ''
    else formCtrlSize = filterFormControlSize(formCtrlSize)

    children = arraify(children).filter(item => isReactTypeOf(item, [Select.Option, 'option']))
    return (
        <JSXEl
            {...props}
            {...multiple && { multiple }}
            className={rclassnames(props, [
                formCtrlCtx.inFormContrl && 'form-control',
                formCtrlSize && `form-control-${formCtrlSize}`,
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