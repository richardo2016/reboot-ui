import React from 'react'
import Form from '../form/component'
import FormInput from './control-input'

const FormRadio = Form.Radio = (props) => (
    <FormInput
        {...props}
        type="radio"
        placeholder={undefined}
    />
)

export default FormRadio