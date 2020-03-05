import React from 'react'
import Form from '../form/component'
import FormInput from './control-input'

const FormFile = Form.File = (props) => (
    <FormInput
        {...props}
        type="file"
        placeholder={undefined}
    />
)

export default FormFile