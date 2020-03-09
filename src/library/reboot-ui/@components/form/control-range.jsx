import React from 'react'

export default (Form) => {
    Form.Range = (props) => (
        <Form.Input
            {...props}
            type="range"
            placeholder={undefined}
        />
    )
}