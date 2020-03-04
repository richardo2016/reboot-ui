import React from 'react'
import Form from './component'

import Input from '../input/component'
import { useControlProps } from './hooks'

const FormInput = Form.Input = React.forwardRef(
    ({
        id = '',
        ...props
    }, ref) => {
        const [controlProps, restProps] = useControlProps(props)
        return (
            <Form.Control
                {...controlProps}
                controlId={id}
            >
              <Input
                {...restProps}
                ref={ref}
            />
            </Form.Control>
        )
    }
)

export default FormInput