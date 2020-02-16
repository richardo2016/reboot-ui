import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'
import { arraify } from '../../../../utils/array';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import { createPopper } from '@popperjs/core';

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
export default function Dropdown ({
    disabled = false,
    children,
    as: _as = 'div',
    overlay: overlayEl = null,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const wrapperRef = React.useRef(null)
    const triggerElRef = React.useRef(null)
    const overlayRef = React.useRef(null)

    const [showDropdown, setShowDropdown] = React.useState(false);

    children = arraify(children).filter(x => x)

    const triggerEl = children.find(child => child.dropdownTrigger) || children[0] || null

    if (triggerEl) triggerEl.ref = triggerElRef
    if (overlayEl) overlayEl.ref = overlayRef

    useClickaway(
        triggerElRef,
        undefined,
        {
            deps: [showDropdown],
            clickIn: (() => {
                setShowDropdown(!showDropdown)
            }),
            clickAway (nativeEvent) {
                if (!showDropdown) return ;
                const clkAwayEl = nativeEvent.target

                if (clkAwayEl && overlayRef.current && overlayRef.current.contains(clkAwayEl)) return ;
                setShowDropdown(false)
            }
        }
    )

    React.useLayoutEffect(() => {
        if (overlayRef.current)
            try {
                const _overlayEl = overlayRef.current

                if (_overlayEl.classList.contains('dropdown-menu'))
                    if (showDropdown) _overlayEl.classList.add('show')
                    else _overlayEl.classList.remove('show')
            } catch (error) {}

        if (!showDropdown) return ;
        if (!triggerElRef.current) return ;
        if (!overlayRef.current) return ;

        const instance = createPopper(
            triggerElRef.current,
            overlayRef.current
        )

        return () => {
            instance.destroy();
        }
    }, [showDropdown])

    return (
        <JSXEl
            {...props}
            ref={wrapperRef}
            className={classnames([
                props.className,
                'dropdown'
            ])}
        >
            {triggerEl}
            {showDropdown && overlayEl}
        </JSXEl>
    )
}