import React from 'react'

import classnames from 'classnames'

import { createPopper } from '@popperjs/core';

import { resolveJSXElement } from '../../utils/ui'
import { arraify } from '../../../../utils/array';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import { isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like'

import DropdownMenu from '../../@components/dropdown-menu/component';
import DropdownItem from '../../@components/dropdown-item/component';

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
export default function Dropdown ({
    disabled = false,
    /**
     * @see placment option.placement in poper.js
     */
    placement = 'bottom-start',
    children: childEles,
    as: _as = 'div',
    overlay: overlayJsxEl = null,
    noWrap = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const wrapperRef = React.useRef(null)
    const triggerElRef = React.useRef(null)
    const overlayRef = React.createRef()

    const [showDropdown, setShowDropdown] = React.useState(false);

    const children = arraify(childEles).filter(x => x)

    let triggerJsxElIdx = children.findIndex(child => child.props.dropdownTrigger || isReactTypeOf(child, Dropdown.Toggle))
    triggerJsxElIdx = triggerJsxElIdx > -1 ? triggerJsxElIdx : 0
    let triggerJsxEl = children[triggerJsxElIdx] || null
    if (triggerJsxEl) {
        triggerJsxEl = React.cloneElement(triggerJsxEl, {ref: triggerElRef})
        if (triggerJsxElIdx > -1) children[triggerJsxElIdx] = triggerJsxEl
    }

    let overlayJsxElIdx = -1
    if (
        !overlayJsxEl
        && (
            overlayJsxElIdx = children.findIndex(child => isReactTypeOf(child, DropdownMenu))
        ) > -1
    ) {
        overlayJsxEl = children[overlayJsxElIdx]
    }
    if (overlayJsxEl) {
        overlayJsxEl = React.cloneElement(overlayJsxEl, {ref: overlayRef})
        if (overlayJsxElIdx > -1) children[overlayJsxElIdx] = overlayJsxEl
    }

    const restChildren = children.filter(x => x !== overlayJsxEl)

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
            getHTMLElementFromJSXElement(overlayRef.current),
            { placement }
        )

        return () => {
            instance.destroy();
        }
    }, [showDropdown])

    const INNER_NODE = (
        <>
            {restChildren}
            {showDropdown && overlayJsxEl}
        </>
    )

    if (!_as || (noWrap))
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

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

function Toggle ({
    children,
    as: _as = 'div',
    split = false,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    return (
        <JSXEl
            {...props}
            {...ref && { ref }}
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            className={classnames([
                props.className,
                props.class,
                'dropdown-toggle',
                split && 'dropdown-toggle-split'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Dropdown.Toggle = React.forwardRef(Toggle)