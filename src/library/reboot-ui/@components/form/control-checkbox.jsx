import React from 'react'
import Form from '../form/component'
import FormInput from './control-input'
import { rclassnames } from '../common'
import { useToken } from './hooks'

const FormCheckbox = Form.Checkbox = (props) => (
    <FormInput
        {...props}
        type="checkbox"
        placeholder={undefined}
    />
)

Form.CheckGroup = ({
    inline = false,
    ...props
}) => {
    return (
        <Form.Group
            className={rclassnames(props, [
                `form-check`,
                inline && `form-check-inline`,
            ])}
            {...props}
            {...{
                [useToken(`groupForCheck`)]: true,
                [useToken(`groupForCheck_noGroup`)]: !!inline,
            }}
        />
    )
}

export default FormCheckbox