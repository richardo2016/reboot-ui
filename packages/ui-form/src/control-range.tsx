import React from 'react'
import { RebootUI } from '@reboot-ui/common'

export default (Form: any) => {
    Form.Range = (props: RebootUI.IComponentPropsWithChildren) => (
        <Form.Input
            {...props}
            type="range"
            placeholder={undefined}
        />
    )
}