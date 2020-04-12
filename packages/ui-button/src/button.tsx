import React from 'react'

import { resolveJSXElement } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

import Anchor from '@reboot-ui/icomponent-anchor'
import ButtonGroup from '@reboot-ui/ui-button-group'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
const Button = React.forwardRef(
    function ({
        children,
        divider = false,
        as: _as = 'button',
        disabled = false, 
        outline = false,
        block = false,
        theme = '',
        size = '',
        active = false,
        __htmlAttributes,
        ...props
    }, ref) {
        switch (theme) {
            case 'primary':
            case 'secondary':
            case 'success':
            case 'danger':
            case 'warning':
            case 'info':
            case 'light':
            case 'dark':
                break
            case 'link':
                outline = false
                _as = Anchor
                break
            default:
                theme = ''
                break
        }
    
        if (outline && !theme) theme = 'primary'
    
        let JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['button', 'input', 'a', 'label', 'div'] */ });
    
        switch (size) {
            case 'lg':
            case 'sm':
                break
            default:
                size = ''
                break
        }
    
        if (JSXEl === 'a') JSXEl = Anchor
    
        const isJSXWithDisabledAttr = ['button', 'input'].some(x => x === JSXEl)
    
        return (
            <JSXEl
                {...JSXEl === 'input' && { type: 'button' }}
                {...JSXEl === 'button' && { type: 'button' }}
                {...JSXEl === Anchor && { role: 'button' }}
                {...props}
                {...__htmlAttributes}
                {...isJSXWithDisabledAttr && disabled && { disabled }}
                {...disabled && {
                    'aria-disabled': true,
                    tabindex: -1,
                }}
                {...active && {
                    'aria-pressed': true
                }}
                ref={ref}
                className={rclassnames(props, [
                    'btn',
                    theme && `btn-${outline ? 'outline-' : ''}${theme}`,
                    size && `btn-${size}`,
                    block && `btn-block`,
                    active && `active`,
                    disabled && !isJSXWithDisabledAttr && `disabled`
                ])}
            >
                {children}
            </JSXEl>
        )
    }
)

Button.Checkbox = ({
    children,
    active: propActive = false,
    ...props
}) => {
    const activeRef = React.useRef(propActive)
    const [ active, setActive ] = React.useState(activeRef.current)

    React.useEffect(() => {
        activeRef.current = propActive
    }, [ propActive ])

    React.useEffect(() => {
        activeRef.current = active
    }, [ active ])

    return (
      <ButtonGroup
        toggle
        onClick={React.useCallback(() => {
            setActive(!activeRef.current)
        }, [])}
    >
        <Button as="label" active={active} {...props}>
          <Checkbox {...active && { checked: true }} />
          {children}
        </Button>
      </ButtonGroup>
    )
}

Button.Radio = ({
    children,
    active: propActive = false,
    ...props
}) => {
    const activeRef = React.useRef(propActive)
    const [ active, setActive ] = React.useState(activeRef.current)

    React.useEffect(() => {
        activeRef.current = propActive
    }, [ propActive ])

    React.useEffect(() => {
        activeRef.current = active
    }, [ active ])

    return (
      <ButtonGroup
        toggle
        onClick={React.useCallback(() => {
            setActive(!activeRef.current)
        }, [])}
    >
        <Button as="label" active={active} {...props}>
            <Radio name={name} {...active && { checked: true }} />
            {children}
        </Button>
      </ButtonGroup>
    )
}

export default Button