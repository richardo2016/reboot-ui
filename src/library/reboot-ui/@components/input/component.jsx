import React from 'react'

import { rclassnames, tryUseContext } from '../../../../utils/react-like'
import { filterInputType, filterFormControlSize } from '../common-utils';
import { FormControlContext } from '../form/context';

/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
function Input ({
    children,
    disabled = false, 
    textarea = false,
    plaintext = false,
    readonly = false,
    type = '',
    size = '',
    id,
    __htmlAttributes,
    ...props
}, ref) {
    const JSXEl = textarea ? 'textarea' : 'input'
    type = textarea ? '' : filterInputType(type) || 'text'

    const formCtrlCtx = tryUseContext(FormControlContext) || {}

    size = size || formCtrlCtx.size

    if (!formCtrlCtx.inFormContrl) size = ''
    else size = filterFormControlSize(size)

    id = id || formCtrlCtx.controlId

    const clsPrefix = formCtrlCtx.custom ? 'custom-' : 'form-'
    let baseFormControlCls
    switch (type) {
        case 'file':
            baseFormControlCls = formCtrlCtx.custom ? `custom-file-input` : `form-control-file`; break
        case 'checkbox':
            baseFormControlCls = formCtrlCtx.custom ? `custom-control-input` : `form-check-input`; break
        case 'radio':
            baseFormControlCls = formCtrlCtx.custom ? `custom-control-input` : `form-check-input`; break
        case 'range': baseFormControlCls = `${clsPrefix}control-range`; break
        default:
            if (plaintext) baseFormControlCls = `form-control-plaintext`;
            else baseFormControlCls = `${clsPrefix}control`;
        break
    }

    return (
        <JSXEl
            {...props}
            {...__htmlAttributes}
            {...id && { id }}
            {...readonly && { readonly }}
            {...disabled && { disabled: true }}
            {...type && { type }}
            ref={ref}
            className={rclassnames(props, [
                disabled ? `disabled` : '',
                baseFormControlCls,
                formCtrlCtx.inFormContrl && plaintext && 'form-control-plaintext',
                size && `form-control-${size}`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(Input)