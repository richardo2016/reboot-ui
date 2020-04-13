import React from 'react'

import { Col } from '../../ui-layout'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common';
import { isReactTypeOf, rclassnames } from '@reboot-ui/common';
import { arraify } from '@reboot-ui/common';
import { filterFormControlSize } from '@reboot-ui/common';

import { FormControlContext, FormControlContextType } from './context'
import { FEEDBACK_POSTIONS } from './symbols';
import { useToken } from './hooks';

export default (Form: any) => {
    Form.Control = React.forwardRef(
        function (
            {
                children,
                /**
                 * @description like `as`, but with higher priority
                 */
                controlAs,
                as: _as = controlAs !== undefined ? controlAs : React.Fragment,
        
                controlId = '',
                size,
                /**
                 * @description whether controlled input use custom style
                 */
                custom = false,
                label: labelBefore = '',
                labelAfter = false,
                controlHelp: helpAfter = '',
                controlValidationFeedback: validFeedback = '',
                controlValidationTooltip: tooltipAfter = '',
        
                controlRefParentCol,
                /**
                 * @description if wrap control with another element, if not set, its default value depends on value of `controlRefParentCol`
                 */
                controlGroupedBy = !controlRefParentCol ? React.Fragment : 'div',
                ...props
            }: RebootUI.IComponentPropsWithChildren<{
                controlAs?: RebootUI.IPropAs
                controlId?: string
                size?: RebootUI.BinarySizeType
                custom?: boolean
                label?: string | boolean
                labelAfter?: string | boolean

                controlHelp?: React.ReactNode
                controlValidationFeedback?: React.ReactNode
                controlValidationTooltip?: React.ReactNode
                controlRefParentCol?: Parameters<typeof Col.useColClass>[0]
                controlGroupedBy?: React.ReactNode
            }>,
            ref
        ) {
            const {
                /**
                 * @internal
                 * @description determine the validation feedbackt position
                 * 
                 * @enum FEEDBACK_POSTIONS['before-labelbefore']
                 * @enum FEEDBACK_POSTIONS['after-labelafter']
                 * @enum FEEDBACK_POSTIONS['after-control']
                 */
                // @ts-ignore
                [FEEDBACK_POSTIONS.KEY]: $$feedbackPos = FEEDBACK_POSTIONS['after-control'],
                // @ts-ignore
                [useToken('inputType')]: $$inputType,
            } = props

            const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
    
            const formCtrlCtx: FormControlContextType = {
                inFormContrl: true,
                controlId,
                size,
                custom,
                label: labelBefore || labelAfter,
                labelBefore,
                labelAfter,
                [useToken('inputType')]: $$inputType,
            }
    
            let labelBeforeNode = labelBefore && !isReactTypeOf(labelBefore, Form.Label) ? (
                <Form.Label for={controlId}>{labelBefore}</Form.Label>
            ) : labelBefore
            let labelAfterNode = labelAfter && !isReactTypeOf(labelAfter, Form.Label) ? (
                <Form.Label for={controlId}>{labelAfter}</Form.Label>
            ) : labelAfter
            const helpAfterNode = helpAfter && !isReactTypeOf(helpAfter, [Form.Text, React.Fragment]) ? (
                <Form.Text as="small" muted>{helpAfter}</Form.Text>
            ) : helpAfter
            const validFeedbackNode = validFeedback && !isReactTypeOf(validFeedback, [Form.ValidationFeedback, React.Fragment]) ? (
                <Form.ValidationFeedback when="valid">{validFeedback}</Form.ValidationFeedback>
            ) : validFeedback
            const tooltipAfterNode = tooltipAfter && !isReactTypeOf(tooltipAfter, [Form.ValidationTooltip, React.Fragment]) ? (
                <Form.ValidationTooltip when="valid">{tooltipAfter}</Form.ValidationTooltip>
            ) : tooltipAfter
            
    
            /* support controlRefParentCol :start */
            const ctrlSize = filterFormControlSize(size)
            const nextLabelClsName = [
                ctrlSize && 'col-form-label',
                ctrlSize && `col-form-label-${ctrlSize}`,
            ]
            
            if (labelBeforeNode) labelBeforeNode = React.cloneElement(labelBeforeNode as React.ReactElement, { className: rclassnames((labelBeforeNode as React.ReactElement).props, nextLabelClsName) })
            if (labelAfterNode) labelAfterNode = React.cloneElement(labelAfterNode as React.ReactElement, { className: rclassnames((labelAfterNode as React.ReactElement).props, nextLabelClsName) })
            
            const controlRefParentColClsList = Col.useColClass(controlRefParentCol)
            const ControlRefParentJSX = ({ children }: RebootUI.IComponentPropsWithChildren) => {
                const JSX = resolveJSXElement(controlGroupedBy)
                return <JSX className={controlRefParentColClsList}>{children}</JSX>
            }
            /* support controlRefParentCol :end */
            
            children = arraify(children)
    
            return (
                <FormControlContext.Provider value={formCtrlCtx}>
                    <JSXEl
                        {...props}
                        ref={ref}
                        className={rclassnames(props, [
                        ])}
                    >
                        {$$feedbackPos === FEEDBACK_POSTIONS['before-labelbefore'] && validFeedbackNode}
                        {labelBeforeNode}
                        <ControlRefParentJSX>
                            {children}
                            {$$feedbackPos === FEEDBACK_POSTIONS['after-control'] && validFeedbackNode}
                            {tooltipAfterNode}
                        </ControlRefParentJSX>
                        {labelAfterNode}
                        {$$feedbackPos === FEEDBACK_POSTIONS['after-labelafter'] && validFeedbackNode}
                        {helpAfterNode}
                    </JSXEl>
                </FormControlContext.Provider>
            )
        }
    )
}