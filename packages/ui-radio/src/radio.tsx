import React from 'react'

import Input from '@reboot-ui/ui-input'

import { RebootUI } from '@reboot-ui/common'

const Radio = function ({
    ...props
}: Omit<RebootUI.IComponentPropsWithChildren<
    RebootUI.IGetReactLikeComponentProps<typeof Input>
>, 'type'>) {
    return (
        <Input
            {...props}
            type="radio"
        />
    )
}

export default Radio