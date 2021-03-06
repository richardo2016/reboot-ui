import React from 'react'

import { useControlProps } from './hooks'
import Select from '@reboot-ui/ui-select'

import {
    filterFormControlSize,
    RebootUI,
    rclassnames
} from '@reboot-ui/common'

export default (Form: any) => {
    Form.Select = React.forwardRef(
        (
            {
                ...props
            }: RebootUI.IComponentPropsWithChildren,
            ref
        ) => {
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
}