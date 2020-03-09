import React from 'react'
import { rclassnames } from '../common'
import { useToken } from './hooks'

export default (Form) => {
    Form.Checkbox = (props) => (
        <Form.Input
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
}