import React from 'react'
import Form from './component'

import Select from '../select/component'
import { useControlProps } from './hooks'
import { filterFormControlSize } from '../common-utils'
import { rclassnames } from '../../../../utils/react-like'

const FormSelect = Form.Select = React.forwardRef(
    ({
        ...props
    }, ref) => {
        const [controlProps, fieldProps] = useControlProps(props)

        /**
         * <select>'s 'size' is not like <input />'s; it's numberic indicating the visible option count
         */
        if (controlProps.size)
            fieldProps.size = controlProps.size 

        let { controlSize } = fieldProps

        controlSize = filterFormControlSize(controlSize)
        
        return (
            <Form.Control
                {...controlProps}
                controlId={fieldProps.id}
            >
              <Select
                {...fieldProps}
                ref={ref}
                className={rclassnames(fieldProps, [
                    !controlProps.custom ? 'form-control' : 'custom-select',
                    controlSize && (!controlProps.custom ? `form-control-${controlSize}` : `custom-select-${controlSize}`),
                ])}
            />
            </Form.Control>
        )
    }
)

Form.Option = Select.Option

export default FormSelect