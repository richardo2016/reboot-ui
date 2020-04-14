import React from 'react'

import { resolveJSXElement, rclassnames, tryUseContext, RebootUI } from '@reboot-ui/common';

import {
    FormContext,
    FormControlContext,
    FormGroupContext,
    FormContextType,
    FormControlContextType,
    FormGroupContextType
} from './context'

import Col from '@reboot-ui/ui-col';
import { useToken } from './hooks';

import makeControl from './control'

import makeCheckbox from './control-checkbox'
import makeFile from './control-file'
import makeInput from './control-input'
import makeRadio from './control-radio'
import makeRange from './control-range'
import makeSelect from './control-select'

/**
 * @see https://getbootstrap.com/docs/4.4/components/form/#supported-content
 * 
 * @inner-content `.form-group`
 * @inner-content `.form-control`
 */
const FormProto = React.forwardRef(
    function (
        {
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
        }: RebootUI.IComponentPropsWithChildren<{
            inline?: boolean
            novalidate?: boolean
            rbWasValidated?: boolean
        }>,
        ref
    ) {
        const formHtmlElRef = React.useRef<HTMLFormElement | null>(null)

        const formCtx: FormContextType = {
            inline,
            novalidate,
            getFormHTMLElement: () => formHtmlElRef.current,
            getValidity: () => {
                if (!formHtmlElRef.current) return false;

                return formHtmlElRef.current.checkValidity();
            },
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

const Form = (props: RebootUI.IGetReactLikeComponentProps<typeof FormProto>) => {
    return <FormProto {...props} />
}

Form.useForm = () => React.useContext(FormContext)

Form.Row = function (
    {
        children,
        as: _as = 'div',
        ...props
    }: RebootUI.IComponentPropsWithChildren
) {
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
    function (
        {
            children,
            as: _as = 'div',
            ...props
        }: RebootUI.IComponentPropsWithChildren,
        ref
    ) {
        const {
            /**
             * @internal used by(not only by) Form.Label
             */
            [useToken(`groupForCheck`)]: $$groupForCheck = false,
            /**
             * @internal used by(not only by) [[self]]
             */
            [useToken(`groupForCheck_noGroup`)]: $$groupForCheck_noGroup = false,
        } = props || {};

        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const formGrpCtx = {
            inFormGroup: true,
            [useToken(`groupForCheck`)]: $$groupForCheck,
        }

        return (
            <FormGroupContext.Provider value={formGrpCtx}>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        !$$groupForCheck_noGroup && `form-group`,
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
}: RebootUI.IComponentPropsWithChildren<{
    for?: string
    col?: Parameters<typeof Col.useColClass>[0]
    custom?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const formCtrlCtx = tryUseContext<FormControlContextType>(FormControlContext)
    const formGrpCtx = tryUseContext<FormGroupContextType>(FormGroupContext)

    children = children || formCtrlCtx.label
    labelFor = labelFor || formCtrlCtx.controlId

    const labelColClsList = Col.useColClass(labelCol)

    if (custom === undefined) custom = formCtrlCtx.custom

    const $$inputType = (formCtrlCtx as any)[useToken('inputType')]

    return (
        <JSXEl
            {...props}
            {...labelFor && { for: labelFor }}
            className={rclassnames(props, [
                formGrpCtx.inFormGroup && (formGrpCtx as any)[useToken(`groupForCheck`)] && !custom && 'form-check-label',
                custom && $$inputType === 'file' && 'custom-file-label',
                custom && $$inputType && $$inputType !== 'file' && 'custom-control-label',
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
    // @ts-ignore
    [useToken('clsKey')]: $$clsKey,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    content?: React.ReactNode
    when?: boolean
    | 'valid'
    | 'invalid'
    | 'always'
    | 'never'
}>) {
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

Form.ValidationFeedback = function (
    props: RebootUI.IComponentPropsWithChildren
) {
    props = { ...props, ...{ [useToken('clsKey')]: 'feedback'} }
    return <ValidationTip />
}

Form.ValidationTooltip = function (
    props: RebootUI.IComponentPropsWithChildren
) {
    props = { ...props, ...{ [useToken('clsKey')]: 'tooltip'} }
    return <ValidationTip />
}

Form.Text = function ({
    children,
    as: _as = 'span',
    muted = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    muted?: boolean
}>) {
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

makeControl(Form)
makeCheckbox(Form)
makeFile(Form)
makeInput(Form)
makeRadio(Form)
makeRange(Form)
makeSelect(Form)

export default Form