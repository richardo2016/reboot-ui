import React from 'react'

import { Col } from '../../ui-layout'

import { resolveJSXElement } from '../../common';
import { isReactTypeOf, rclassnames } from '../../common';
import { arraify } from '../../common';
import { filterFormControlSize } from '../../common';

import { FormControlContext } from './context'
import { FEEDBACK_POSTIONS } from './symbols';
import { useToken } from './hooks';

export default (Form) => {
    Form.Control = React.forwardRef(
        function ({
            children,
            
            /**
             * @description like `as`, but with higher priority
             */
            controlAs,
            as: _as = controlAs !== undefined ? controlAs : React.Fragment,
    
            controlId = '',
            size = '',
            /**
             * @description whether controlled input use custom style
             */
            custom = false,
            label: labelBefore = '',
            labelAfter = false,
            controlHelp: helpAfter = '',
            controlValidationFeedback: validFeedback = '',
            controlValidationTooltip: tooltipAfter = '',
            /**
             * @internal
             * @description determine the validation feedbackt position
             * 
             * @enum FEEDBACK_POSTIONS['before-labelbefore']
             * @enum FEEDBACK_POSTIONS['after-labelafter']
             * @enum FEEDBACK_POSTIONS['after-control']
             */
            [FEEDBACK_POSTIONS.KEY]: $$feedbackPos = FEEDBACK_POSTIONS['after-control'],
    
            [useToken('inputType')]: $$inputType,
    
            controlRefParentCol,
            /**
             * @description if wrap control with another element, if not set, its default value depends on value of `controlRefParentCol`
             */
            controlRefParentAs = !controlRefParentCol ? React.Fragment : 'div',
            ...props
        }, ref) {
            const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
    
            const formCtrlCtx = {
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
            
            if (labelBeforeNode) labelBeforeNode = React.cloneElement(labelBeforeNode, { className: rclassnames(labelBeforeNode.props, nextLabelClsName) })
            if (labelAfterNode) labelAfterNode = React.cloneElement(labelAfterNode, { className: rclassnames(labelAfterNode.props, nextLabelClsName) })
            
            const controlRefParentColClsList = Col.useColClass(controlRefParentCol)
            const ControlRefParentJSX = ({ children }) => {
                const JSX = resolveJSXElement(controlRefParentAs)
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