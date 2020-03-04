import React from 'react'
import Form from './component'

import Select from '../select/component'
import { useControlProps } from './hooks'

const FormSelect = Form.Select = React.forwardRef(
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
              <Select
                {...restProps}
                ref={ref}
            />
            </Form.Control>
        )
    }
)

Form.Option = Select.Option

export default FormSelect