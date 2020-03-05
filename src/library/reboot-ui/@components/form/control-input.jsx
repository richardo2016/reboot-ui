import React from 'react'
import Form from './component'

import Input from '../input/component'
import { useControlProps } from './hooks'
import { FEEDBACK_POSTIONS } from './symbols'
import { rclassnames } from '../../../../utils/react-like'
import { filterFormControlSize } from '../common-utils'

const FormInput = Form.Input = React.forwardRef(
    ({
        id = '',
        ...props
    }, ref) => {
        const [controlProps, fieldProps] = useControlProps(props)

        fieldProps.size = filterFormControlSize(controlProps.size)

        fieldProps.id = (controlProps.controlId = controlProps.controlId || id)

        const clsPrefix = controlProps.custom ? 'custom-' : 'form-'
        let baseFormControlCls
        switch (fieldProps.type) {
            case 'file':
                baseFormControlCls = controlProps.custom ? `custom-file-input` : `form-control-file`; break
            case 'checkbox':
                baseFormControlCls = controlProps.custom ? `custom-control-input` : `form-check-input`; break
            case 'radio':
                baseFormControlCls = controlProps.custom ? `custom-control-input` : `form-check-input`; break
            case 'range':
                baseFormControlCls = controlProps.custom ? `custom-range` : `form-control-range`; break
            default:
                if (fieldProps.plaintext) baseFormControlCls = `form-control-plaintext`;
                else baseFormControlCls = `${clsPrefix}control`;
            break
        }
        
        return (
            <Form.Control
                {...controlProps}
                {...fieldProps.type === 'file' && {
                    [FEEDBACK_POSTIONS.KEY]: FEEDBACK_POSTIONS['after-labelafter']
                }}
                {...fieldProps.type === 'radio' && {
                    [FEEDBACK_POSTIONS.KEY]: FEEDBACK_POSTIONS['after-labelafter']
                }}
                {...fieldProps.type === 'checkbox' && {
                    [FEEDBACK_POSTIONS.KEY]: FEEDBACK_POSTIONS['after-labelafter']
                }}
            >
              <Input
                {...fieldProps}
                ref={ref}
                className={rclassnames(fieldProps, [
                    baseFormControlCls,
                    fieldProps.plaintext && 'form-control-plaintext',
                    fieldProps.size && `form-control-${fieldProps.size}`,
                ])}
            />
            </Form.Control>
        )
    }
)

export default FormInput