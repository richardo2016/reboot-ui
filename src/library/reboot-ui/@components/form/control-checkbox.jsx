import React from 'react'
import Form from '../form/component'
import FormInput from './control-input'

const FormCheckbox = Form.Checkbox = (props) => (
    <FormInput
        {...props}
        type="checkbox"
        placeholder={undefined}
    />
)

export default FormCheckbox