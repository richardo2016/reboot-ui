import React from 'react'

import { resolveJSXElement, rclassnames, renderJSXFunc } from '@reboot-ui/common';

const _PrependWrap = ({ children }) => {
    if (typeof children === 'string')
        children = (<span class="input-group-text">{children}</span>)

    return (
        <div class="input-group-prepend">{children}</div>
    )
}

const _AppendWrap = ({ children }) => {
    if (typeof children === 'string')
        children = (<span class="input-group-text">{children}</span>)

    return (
        <div class="input-group-append">{children}</div>
    )
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/input-group
 */
const InputGroup = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        size = '',
        __htmlAttributes,
        prepend = '',
        append = '',
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
        const prependNoWrap = typeof prepend === 'function'
        const PrependWrap = prependNoWrap ? React.Fragment : _PrependWrap
        prepend = renderJSXFunc(prepend)
        const prependNode = prepend ? <PrependWrap>{prepend}</PrependWrap> : null

        const appendNoWrap = typeof append === 'function'
        const AppendWrap = appendNoWrap ? React.Fragment : _AppendWrap
        append = renderJSXFunc(append)
        const appendNode = append ? <AppendWrap>{append}</AppendWrap> : null
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'input-group',
                    size && `input-group-${size}`,
                ])}
            >
                {prependNode || null}
                {children}
                {appendNode || null}
            </JSXEl>
        )
    }
))

export default InputGroup