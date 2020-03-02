import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like';

const _PrependWrap = ({ children }) => (
    <div class="input-group-prepend">
        <span class="input-group-text">{children}</span>
    </div>
)

const _AppendWrap = ({ children }) => (
    <div class="input-group-append">
        <span class="input-group-text">{children}</span>
    </div>
)
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
        prependNoWrap = false,
        append = '',
        appendNoWrap = false,
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
        const PrependWrap = prependNoWrap ? React.Fragment : _PrependWrap
        const prependNode = prepend ? <PrependWrap>{prepend}</PrependWrap> : null

        const AppendWrap = appendNoWrap ? React.Fragment : _AppendWrap
        const appendNode = append ? <AppendWrap>{append}</AppendWrap> : null
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'input-group',
                    size && `input-group-${size}`,
                    props.className,
                    props.class,
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