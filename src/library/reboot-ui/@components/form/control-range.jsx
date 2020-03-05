import React from 'react'
import Form from '../form/component'
import FormInput from './control-input'

const FormRange = Form.Range = (props) => (
    <FormInput
        {...props}
        type="range"
        placeholder={undefined}
    />
)

export default FormRange