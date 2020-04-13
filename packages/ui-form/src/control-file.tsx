import React from 'react'
import { RebootUI } from '@reboot-ui/common'

export default (Form: any) => {
    Form.File = (props: RebootUI.IComponentPropsWithChildren) => (
        <Form.Input
            {...props}
            type="file"
            placeholder={undefined}
        />
    )
}