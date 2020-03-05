import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, tryUseContext } from '../../../../utils/react-like';

import { FormControlContext, FormGroupContext } from './context'
import { filterFormControlSize } from '../common-utils';
import { Col } from '../layout-grid/component';

/**
 * @see https://getbootstrap.com/docs/4.4/components/form/#supported-content
 * 
 * @inner-content `.form-group`
 * @inner-content `.form-control`
 */
const Form = function ({
    children,
    as: _as = 'form',
    inline = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['form', 'div'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'form',
                inline && `form-inline`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Form.Row = function ({
    children,
    as: _as = 'div',
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'form-row',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Form.Group = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        check = false,
        group = !check,
        inline = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const ctx = {
            inFormGroup: true,
            check: !!check
        }

        return (
            <FormGroupContext.Provider value={ctx}>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        group && `form-group`,
                        check && `form-check`,
                        check && inline && `form-check-inline`,
                    ])}
                >
                    {children}
                </JSXEl>
            </FormGroupContext.Provider>
        )
    }
)

Form.CheckGroup = function ({
    children,
    as: _as = 'div',
    group = false,
    ...props
}, ref) {
    return (
        <Form.Group
            {...props}
            group={group}
            check
        >
            {children}
        </Form.Group>
    )
}

Form.Label = function ({
    children,
    as: _as = 'label',
    for: labelFor = '',
    col: labelCol = {},
    custom = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const formCtrlCtx = tryUseContext(FormControlContext)
    const formGrpCtx = tryUseContext(FormGroupContext)

    children = children || formCtrlCtx.label
    labelFor = labelFor || formCtrlCtx.controlId

    const labelColClsList = Col.useColClass(labelCol)

    return (
        <JSXEl
            {...props}
            {...labelFor && { for: labelFor }}
            className={rclassnames(props, [
                formGrpCtx.inFormGroup && formGrpCtx.check && !custom && 'form-check-label',
                custom && 'custom-control-label',
                labelColClsList
            ])}
        >
            {children}
        </JSXEl>
    )
}

Form.Text = function ({
    children,
    as: _as = 'span',
    muted = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `form-text`,
                muted && `text-muted`
            ])}
        >
            {children}
        </JSXEl>
    )
}


export default Form