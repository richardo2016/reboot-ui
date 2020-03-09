import React from 'react'

export default (Form) => {
    Form.Radio = (props) => (
        <Form.Input
            {...props}
            type="radio"
            placeholder={undefined}
        />
    )
}