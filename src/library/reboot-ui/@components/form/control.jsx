import React from 'react'
import Form from './component'

import { Col } from '../layout-grid/component'

import { resolveJSXElement } from '../../utils/ui';

import { FormControlContext } from './context'
import { isReactTypeOf, rclassnames } from '../../../../utils/react-like';
import { arraify } from '../../../../utils/array';
import { filterFormControlSize } from '../common-utils';

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
        labelCustom = false,
        label: labelBefore = '',
        labelAfter = false,
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
            labelCustom,
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

        /* support controlRefParentCol :start */
        const colAboutSize = filterFormControlSize(size)
        const nextClsName = [
            colAboutSize && 'col-form-label',
            colAboutSize && `col-form-label-${colAboutSize}`,
        ]
        
        if (labelBeforeNode)
            labelBeforeNode = React.cloneElement(labelBeforeNode, { className: rclassnames(labelBeforeNode.props, nextClsName) })
        if (labelAfterNode)
            labelAfterNode = React.cloneElement(labelAfterNode, { className: rclassnames(labelAfterNode.props, nextClsName) })
        
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
                    {labelBeforeNode}
                    <ControlRefParentJSX>
                        {children}
                    </ControlRefParentJSX>
                    {labelAfterNode}
                </JSXEl>
            </FormControlContext.Provider>
        )
    }
)

export default FormControl