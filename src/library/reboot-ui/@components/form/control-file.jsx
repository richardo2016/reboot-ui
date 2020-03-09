import React from 'react'

export default (Form) => {
    Form.File = (props) => (
        <Form.Input
            {...props}
            type="file"
            placeholder={undefined}
        />
    )
}