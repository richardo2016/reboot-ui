import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

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
                className={classnames([
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