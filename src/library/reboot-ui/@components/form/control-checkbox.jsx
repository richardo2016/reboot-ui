import React from 'react'
import Form from './component'

import Input from '../input/component'
import { useControlProps } from './hooks'
import { FEEDBACK_POSTIONS } from './symbols'

const FormCheckbox = Form.Checkbox = React.forwardRef(
    ({
        id = '',
        ...props
    }, ref) => {
        const [controlProps, fieldProps] = useControlProps(props)
        return (
            <Form.Control
                {...controlProps}
                controlId={id}
                {...{
                    [FEEDBACK_POSTIONS.KEY]: FEEDBACK_POSTIONS['after-labelafter']
                }}
            >
              <Input
                {...fieldProps}
                type="checkbox"
                placeholder={undefined}
                ref={ref}
            />
            </Form.Control>
        )
    }
)

export default FormCheckbox