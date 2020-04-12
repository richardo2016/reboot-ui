import React from 'react'

import { rclassnames, tryUseContext } from '@reboot-ui/common';
import { FormControlContext } from '../../ui-form/src/context';

const Textarea = function ({
    children,
    as: _as = 'textarea',
    autoresize = false,
    ...props
}) {
    const formCtrlCtx = tryUseContext(FormControlContext)

    return (
        <textarea
            {...props}
            {...autoresize && { autoresize }}
            className={rclassnames(props, [
                formCtrlCtx.inFormContrl && 'form-control',
            ])}
        >
            {children}
        </textarea>
    )
}

export default Textarea