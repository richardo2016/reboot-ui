import React from 'react'
import Form from './component'

import Input from '../input/component'
import { useControlProps } from './hooks'

const FormCheckbox = Form.Checkbox = React.forwardRef(
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
                type="checkbox"
                placeholder={undefined}
                ref={ref}
            />
            </Form.Control>
        )
    }
)

export default FormCheckbox