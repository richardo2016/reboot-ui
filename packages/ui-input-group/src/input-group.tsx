import React from 'react'

import { resolveJSXElement, rclassnames, renderJSXFunc, RebootUI, filterBinraySize } from '@reboot-ui/common';

const _PrependWrap = ({ children }: RebootUI.IComponentPropsWithChildren) => {
    if (typeof children === 'string')
        children = (<span className="input-group-text">{children}</span>)

    return (
        <div className="input-group-prepend">{children}</div>
    )
}

const _AppendWrap = ({ children }: RebootUI.IComponentPropsWithChildren) => {
    if (typeof children === 'string')
        children = (<span className="input-group-text">{children}</span>)

    return (
        <div className="input-group-append">{children}</div>
    )
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/input-group
 */
const InputGroup = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        size,
        prepend = '',
        append = '',
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        size?: RebootUI.BinarySizeType
        prepend?: React.ReactNode
        append?: React.ReactNode
    }>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });

        size = filterBinraySize(size)
        
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