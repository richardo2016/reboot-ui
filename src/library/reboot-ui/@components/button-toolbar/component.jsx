import React from 'react'

import { resolveJSXElement } from '../common'
import { rclassnames } from '../common'

const ButtonToolbar = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    props.className,
                    props.class,
                    'btn-toolbar',
                ])}
                role="toolbar"
            >
                {children}
            </JSXEl>
        )
    }
))

export default ButtonToolbar