import React from 'react'
import Form from './component'

import { Col } from '../layout-grid/component'

import { resolveJSXElement } from '../../utils/ui';

import { FormControlContext } from './context'
import { isReactTypeOf, rclassnames } from '../../../../utils/react-like';
import { arraify } from '../../../../utils/array';
import { filterFormControlSize } from '../common-utils';
import { FEEDBACK_POSTIONS } from './symbols';

const FormControl = Form.Control = React.forwardRef(
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
        controlValidationFeedback: feedbackAfter = '',
        /**
         * @internal
         * @description determine the validation feedbackt position
         * 
         * @enum FEEDBACK_POSTIONS['before-labelbefore']
         * @enum FEEDBACK_POSTIONS['after-labelafter']
         * @enum FEEDBACK_POSTIONS['after-control']
         */
        $$controlValidationFeedbackPosition: $$feedbackPos = FEEDBACK_POSTIONS['after-control'],

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
        const feedbackAfterNode = feedbackAfter && !isReactTypeOf(feedbackAfter, [Form.ValidationFeedback, React.Fragment]) ? (
            <Form.ValidationFeedback when="valid">{feedbackAfter}</Form.ValidationFeedback>
        ) : feedbackAfter

        /* support controlRefParentCol :start */
        const ctrlSize = filterFormControlSize(size)
        const nextClsName = [
            ctrlSize && 'col-form-label',
            ctrlSize && `col-form-label-${ctrlSize}`,
        ]
        
        if (labelBeforeNode) labelBeforeNode = React.cloneElement(labelBeforeNode, { className: rclassnames(labelBeforeNode.props, nextClsName) })
        if (labelAfterNode) labelAfterNode = React.cloneElement(labelAfterNode, { className: rclassnames(labelAfterNode.props, nextClsName) })
        
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
                    {$$feedbackPos === FEEDBACK_POSTIONS['before-labelbefore'] && feedbackAfterNode}
                    {labelBeforeNode}
                    <ControlRefParentJSX>
                        {children}
                        {$$feedbackPos === FEEDBACK_POSTIONS['after-control'] && feedbackAfterNode}
                    </ControlRefParentJSX>
                    {labelAfterNode}
                    {$$feedbackPos === FEEDBACK_POSTIONS['after-labelafter'] && feedbackAfterNode}
                    {helpAfterNode}
                </JSXEl>
            </FormControlContext.Provider>
        )
    }
)

export default FormControl