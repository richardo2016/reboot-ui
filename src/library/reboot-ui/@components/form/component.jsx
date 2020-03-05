import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, tryUseContext } from '../../../../utils/react-like';

import { FormContext, FormControlContext, FormGroupContext } from './context'
import { Col } from '../layout-grid/component';
import { useToken } from './hooks';

/**
 * @see https://getbootstrap.com/docs/4.4/components/form/#supported-content
 * 
 * @inner-content `.form-group`
 * @inner-content `.form-control`
 */
const Form = React.forwardRef(
    function ({
        children,
        as: _as = 'form',
        inline = false,
        /**
         * @description html native attribute
         */
        novalidate = false,
        /**
         * @description status whether form validated, `rb` means the prop is reboot-owned
         */
        rbWasValidated = false,
        ...props
    }, ref) {
        // const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['form'] });

        const formHtmlElRef = React.useRef(null)

        const formCtx = {
            inline,
            novalidate,
            getFormHTMLElement: () => formHtmlElRef.current,
            getValidity: () => !!formHtmlElRef.current && formHtmlElRef.checkValidity(),
        }

        return (
            <FormContext.Provider value={formCtx}>
                <form
                    {...props}
                    {...novalidate && { novalidate }}
                    ref={(formEl) => {
                        formHtmlElRef.current = formEl
                        return typeof ref === 'function' ? ref(formEl) : formEl
                    }}
                    className={rclassnames(props, [
                        // 'form',
                        rbWasValidated && `was-validated`,
                        inline && `form-inline`,
                    ])}
                >
                    {children}
                </form>
            </FormContext.Provider>
        )
    }
)

Form.useForm = () => React.useContext(FormContext)

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

Form.Label = function ({
    children,
    as: _as = 'label',
    for: labelFor = '',
    col: labelCol = {},
    custom,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const formCtrlCtx = tryUseContext(FormControlContext)
    const formGrpCtx = tryUseContext(FormGroupContext)

    children = children || formCtrlCtx.label
    labelFor = labelFor || formCtrlCtx.controlId

    const labelColClsList = Col.useColClass(labelCol)

    if (custom === undefined) custom = formCtrlCtx.custom

    const $$inputType = formCtrlCtx[useToken('inputType')]

    return (
        <JSXEl
            {...props}
            {...labelFor && { for: labelFor }}
            className={rclassnames(props, [
                formGrpCtx.inFormGroup && formGrpCtx.check && !custom && 'form-check-label',
                custom && ($$inputType === 'file' ? 'custom-file-label' : 'custom-control-label'),
                labelColClsList
            ])}
        >
            {children}
        </JSXEl>
    )
}

const ValidationTip = function ({
    children,
    content = children,
    as: _as = 'div',
    /**
     * @description used what validation result is
     * @enum valid
     * @enum invalid
     * @enum always
     * @enum never
     */
    when: _when = false,

    [useToken('clsKey')]: $$clsKey,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    switch (_when) {
        default:
        case 'valid':
            break
        case 'invalid':
        case 'always':
        case 'never':
            break
    }

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                (_when === 'valid' || _when === 'always') && `valid-${$$clsKey}`,
                (_when === 'invalid' || _when === 'always') && `invalid-${$$clsKey}`,
            ])}
        >
            {content}
        </JSXEl>
    )
}

Form.ValidationFeedback = function (props) {
    return <ValidationTip {...props} {...{ [useToken('clsKey')]: 'feedback'}} />
}

Form.ValidationTooltip = function (props) {
    return <ValidationTip {...props} {...{ [useToken('clsKey')]: 'tooltip'}} />
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