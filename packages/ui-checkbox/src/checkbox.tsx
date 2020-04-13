import React from 'react'

import Input from '@reboot-ui/ui-input'

import { RebootUI } from '@reboot-ui/common'

export default function Checkbox ({
    ...props
}: Omit<RebootUI.IGetReactLikeComponentProps<typeof Input>, 'type'>) {
    return (
        <Input
            {...props}
            type="checkbox"
        />
    )
}