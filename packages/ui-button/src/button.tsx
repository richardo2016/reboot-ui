import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

import Anchor from '@reboot-ui/icomponent-anchor'
import ButtonGroup from '@reboot-ui/ui-button-group'
import Checkbox from '@reboot-ui/ui-checkbox'
import Radio from '@reboot-ui/ui-radio'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
const Button = function ({
    children,
    divider = false,
    as: _as = 'button',
    disabled = false, 
    outline = false,
    block = false,
    theme,
    size,
    active = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    divider?: boolean
    disabled?: boolean
    outline?: boolean
    block?: boolean
    theme?: RebootUI.ThemeType
    size?: 'lg' | 'sm'
    active?: boolean
}>) {
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
            _as = Anchor as any
            break
        default:
            theme = undefined
            break
    }

    if (outline && !theme) theme = 'primary'

    let JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['button', 'input', 'a', 'label', 'div'] */ });

    switch (size) {
        case 'lg':
        case 'sm':
            break
        default:
            size = undefined
            break
    }

    if (JSXEl === 'a') JSXEl = Anchor as any

    const isJSXWithDisabledAttr = ['button', 'input'].some(x => x === JSXEl)

    return (
        <JSXEl
            {...JSXEl === 'input' && { type: 'button' }}
            {...JSXEl === 'button' && { type: 'button' }}
            {...JSXEl === Anchor && { role: 'button' }}
            {...props}
            {...isJSXWithDisabledAttr && disabled && { disabled }}
            {...disabled && {
                'aria-disabled': true,
                tabindex: -1,
            }}
            {...active && {
                'aria-pressed': true
            }}
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

Button.Checkbox = ({
    children,
    active: propActive = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    active?: boolean
    name?: RebootUI.IGetReactLikeComponentProps<typeof Checkbox>['name']
}>) => {
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
          <Checkbox name={name} {...active && { checked: true }} />
          {children}
        </Button>
      </ButtonGroup>
    )
}

Button.Radio = ({
    children,
    active: propActive = false,
    name,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    active?: boolean
    name?: RebootUI.IGetReactLikeComponentProps<typeof Radio>['name']
}>) => {
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