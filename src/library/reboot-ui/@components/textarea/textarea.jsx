import React from 'react'

import { rclassnames, tryUseContext } from '../common';
import { FormControlContext } from '../form/context';

const TextArea = function ({
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

export default TextArea