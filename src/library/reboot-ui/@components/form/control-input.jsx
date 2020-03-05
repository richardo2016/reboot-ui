import React from 'react'
import Form from './component'

import Input from '../input/component'
import { useControlProps } from './hooks'
import { FEEDBACK_POSTIONS } from './symbols'

const FormInput = Form.Input = React.forwardRef(
    ({
        id = '',
        ...props
    }, ref) => {
        const [controlProps, fieldProps] = useControlProps(props)
        return (
            <Form.Control
                {...controlProps}
                controlId={id}
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
            />
            </Form.Control>
        )
    }
)

export default FormInput