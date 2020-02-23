import React from 'react'

import classnames from 'classnames'

import { createPopper } from '@popperjs/core';

import { resolveJSXElement } from '../../utils/ui'
import { arraify } from '../../../../utils/array';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import { isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like'

import DropdownMenu from '../../@components/dropdown-menu/component';

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
export default function Dropdown ({
    disabled = false,
    children,
    as: _as = 'div',
    overlay: overlayJsxEl = null,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const wrapperRef = React.useRef(null)
    const triggerElRef = React.useRef(null)
    const overlayRef = React.createRef()

    const [showDropdown, setShowDropdown] = React.useState(false);

    children = arraify(children).filter(x => x)

    let triggerJsxEl = children.find(child => child.dropdownTrigger) || children[0] || null
    overlayJsxEl = overlayJsxEl || children.find(child => isReactTypeOf(child, DropdownMenu))
    const restChildren = children.filter(x => x !== triggerJsxEl && x !== overlayJsxEl)
    
    if (triggerJsxEl) triggerJsxEl = React.cloneElement(triggerJsxEl, {ref: triggerElRef})
    if (overlayJsxEl) overlayJsxEl = React.cloneElement(overlayJsxEl, {ref: overlayRef})

    useClickaway(
        triggerElRef,
        undefined,
        {
            clickIn: (() => {
                setShowDropdown(!showDropdown)
            }),
            clickAway (nativeEvent) {
                if (!showDropdown) return ;
                const clkAwayEl = nativeEvent.target

                if (
                    clkAwayEl
                    && overlayRef.current
                    && getHTMLElementFromJSXElement(overlayRef.current)
                    && getHTMLElementFromJSXElement(overlayRef.current).contains(clkAwayEl)
                ) return ;
                setShowDropdown(false)
            }
        }
    )

    React.useLayoutEffect(() => {
        if (overlayRef.current)
            try {
                const _overlayEl = getHTMLElementFromJSXElement(overlayRef.current)

                if (_overlayEl.classList.contains('dropdown-menu'))
                    if (showDropdown) _overlayEl.classList.add('show')
                    else _overlayEl.classList.remove('show')
            } catch (error) {}

        if (!showDropdown) return ;
        if (!triggerElRef.current) return ;
        if (!overlayRef.current) return ;

        const instance = createPopper(
            getHTMLElementFromJSXElement(triggerElRef.current),
            getHTMLElementFromJSXElement(overlayRef.current)
        )

        return () => {
            instance.destroy();
        }
    }, [showDropdown])

    const INNER_NODE = (
        <>
            {triggerJsxEl}
            {showDropdown && overlayJsxEl}
            {restChildren}
        </>
    )

    if (!_as)
        return INNER_NODE

    return (
        <JSXEl
            {...props}
            ref={wrapperRef}
            className={classnames([
                props.className,
                props.class,
                'dropdown'
            ])}
        >
            {INNER_NODE}
        </JSXEl>
    )
}