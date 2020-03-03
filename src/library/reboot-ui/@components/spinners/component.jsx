import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like';

import { filterThemeName, filterSize } from '../common-utils';

/**
 * @see https://getbootstrap.com/docs/4.4/components/spinner/#supported-content
 * 
 * @inner-content `.spinner`
 */
const Spinner = function ({
    children,
    as: _as = 'div',
    color = '',
    /**
     * @enum border
     * @enum grow
     */
    type = '',
    size = '',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    switch (type) {
        case 'border':
        default:
            type = 'border'
            break
        case 'grow':
            break
    }

    color = filterThemeName(color)
    size = filterSize(size)

    return (
        <JSXEl
            role="status"
            {...props}
            className={rclassnames(props, [
                `spinner-${type}`,
                size && `spinner-${type}-${size}`,
                color && `text-${color}`
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default Spinner