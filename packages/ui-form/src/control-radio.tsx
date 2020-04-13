import React from 'react'
import { RebootUI } from '@reboot-ui/common'

export default (Form: any) => {
    Form.Radio = (props: RebootUI.IComponentPropsWithChildren) => (
        <Form.Input
            {...props}
            type="radio"
            placeholder={undefined}
        />
    )
}