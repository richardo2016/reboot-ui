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
        as: _as = React.Fragment,

        controlId = '',
        size = '',
        label: labelBefore = '',
        labelProps = {},
        labelAfter = false,
        labelCol,
        controlParentCol,
        controlParentAs = 'div',
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const formCtrlCtx = {
            inFormContrl: true,
            controlId,
            size: size,
            label: labelBefore || labelAfter,
            labelBefore,
            labelAfter,
        }

        let labelBeforeNode = labelBefore && !isReactTypeOf(labelBefore, Form.Label) ? (
            <Form.Label for={controlId} {...labelProps}>{labelBefore}</Form.Label>
        ) : labelBefore
        let labelAfterNode = labelAfter && !isReactTypeOf(labelAfter, Form.Label) ? (
            <Form.Label for={controlId} {...labelProps}>{labelAfter}</Form.Label>
        ) : labelAfter

        /* support labelCol/controlParentCol :start */
        const labelColClsList = Col.useColClass(labelCol)
        if (labelColClsList.length) {
            const colAboutSize = filterFormControlSize(size)
            if (labelBeforeNode)
                labelBeforeNode = React.cloneElement(labelBeforeNode, {
                    className: rclassnames(labelBeforeNode.props, labelColClsList, 'col-form-label', colAboutSize && `col-form-label-${colAboutSize}`)
                })
            if (labelAfterNode)
                labelAfterNode = React.cloneElement(labelAfterNode, {
                    className: rclassnames(labelAfterNode.props, labelColClsList, 'col-form-label', colAboutSize && `col-form-label-${colAboutSize}`)
                })
        }
        
        const controlParentColClsList = Col.useColClass(controlParentCol)
        const ControlParentJSX = ({ children }) => {
            const JSX = resolveJSXElement(controlParentAs)
            return <JSX className={controlParentColClsList}>{children}</JSX>
        }
        /* support labelCol/controlParentCol :end */
        
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
                    <ControlParentJSX>
                        {children}
                    </ControlParentJSX>
                    {labelAfterNode}
                </JSXEl>
            </FormControlContext.Provider>
        )
    }
)

export default FormControl