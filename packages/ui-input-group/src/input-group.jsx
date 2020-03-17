import React from 'react'

import { resolveJSXElement, rclassnames } from '../../common';
import Dropdown from '../../ui-dropdown';

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
                ])}
            >
                {prependNode || null}
                {children}
                {appendNode || null}
            </JSXEl>
        )
    }
))

InputGroup.ButtonDropdown = ({
    children,
    label = '',
    split = false,
    outline = false,
    theme,
    ...props
}) => {
    return (
        <Dropdown as={null}>
            <Dropdown.Toggle
                {...props}
                split={split}
                outline={outline}
                theme={theme}
                label={label}
                as={null}
            >
                <span class="sr-only">Toggle Dropdown</span>
            </Dropdown.Toggle>
            {children}
        </Dropdown>
    )
}

export default InputGroup