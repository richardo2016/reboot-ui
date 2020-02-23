import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button-group
 */
const ButtonGroup = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        size = '',
        vertical = false,
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });

        switch (size) {
            case 'lg':
            case 'sm':
                break
            default:
                size = ''
                break
        }
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={classnames([
                    props.className,
                    props.class,
                    `btn-${'group'}${vertical ? '-vertical' : ''}`,
                    size && `btn-group-${size}`
                ])}
                role={'group'}
            >
                {children}
            </JSXEl>
        )
    }
))

export default ButtonGroup