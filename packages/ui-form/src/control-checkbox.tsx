import React from 'react'
import { rclassnames, RebootUI } from '@reboot-ui/common'
import { useToken } from './hooks'

export default (Form: any) => {
    Form.Checkbox = (props: RebootUI.IComponentPropsWithChildren) => (
        <Form.Input
            {...props}
            type="checkbox"
            placeholder={undefined}
        />
    )

    Form.CheckGroup = ({
        inline = false,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        inline?: boolean
    }>) => {
        props = {
            ...props,
            [useToken(`groupForCheck`)]: true,
            [useToken(`groupForCheck_noGroup`)]: !!inline,
        }
        return (
            <Form.Group
                className={rclassnames(props, [
                    `form-check`,
                    inline && `form-check-inline`,
                ])}
                {...props}
            />
        )
    }
}