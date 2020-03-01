import React from 'react'

import classnames from 'classnames'

// import { createPopper } from '@popperjs/core';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import flip from '@popperjs/core/lib/modifiers/flip';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';

import { resolveJSXElement } from '../../utils/ui'
import { filterPlacement } from '../../utils/poper'
import { dedupe } from '../../../../utils/array';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import { isReactTypeOf, getHTMLElementFromJSXElement, parseChildrenProp, rclassnames } from '../../../../utils/react-like'

import DropdownMenu from '../../@components/dropdown-menu/component';
import DropdownItem from '../../@components/dropdown-item/component';
import Button from '../../@components/button/component';

const DropdownCtx = React.createContext()

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
export default function Dropdown ({
    disabled = false,
    /**
     * @see placment option.placement in poper.js
     */
    placement = 'bottom-start',
    poperOptions = {},
    children: childEles,
    as: _as = 'div',
    overlay: overlayJsxEl = null,
    noWrap = false,
    ...props
}) {
    placement = filterPlacement(placement)
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
    const wrapperRef = React.useRef(null)
    const triggerElRef = React.useRef(null)
    const overlayRef = React.createRef()

    const [showDropdown, setShowDropdown] = React.useState(false);

    const { isFragment: childIsFragment, childNodeList } = parseChildrenProp(childEles)

    const children = childNodeList.filter(x => x)

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

    let restChildren = children.filter(x => x !== overlayJsxEl)
    // if (childIsFragment)
    //     restChildren = React.cloneElement(childEles, { children: restChildren })

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
            {
                placement,
                ...poperOptions,
                modifiers: dedupe([flip, preventOverflow, ...(poperOptions.modifiers || [])])
            }
        )

        return () => {
            instance.destroy();
        }
    }, [showDropdown])

    const INNER_NODE = (
        <DropdownCtx.Provider value={{ placement }}>
            {restChildren}
            {showDropdown && overlayJsxEl}
        </DropdownCtx.Provider>
    )

    if (!_as || noWrap)
        return INNER_NODE

    return (
        <>
            <JSXEl
                {...props}
                ref={wrapperRef}
                className={rclassnames(props, [
                    'dropdown'
                ])}
            >
                {INNER_NODE}
            </JSXEl>
            {placement.indexOf('left') > -1 && (
                <span style={{display: 'none'}} />
            )}
        </>
    )
}

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

function Toggle ({
    children,
    as: _as = 'div',
    split = false,
    type,
    label,
    size,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    const FinalJSX = ({ children }) => {
        return (
            <JSXEl
                className={rclassnames(props, [
                    'btn-group',
                    !isCaretPlaceLeft && directionCls
                ])}
            >
                {children}
            </JSXEl>
        )
    }
    
    const buttonType = type;
    const buttonLabel = label || (!split ? children : null);
    const buttonSize = size;

    if (!split)
        return (
            <FinalJSX>
                <Button
                    ref={ref}
                    type={buttonType}
                    size={buttonSize}
                    data-toggle='dropdown'
                    className={classnames([
                        'dropdown-toggle'
                    ])}
                >
                    {buttonLabel}
                </Button>
            </FinalJSX>
        )

    let splitedButtonGroupTuple = [
        <Button
            type={buttonType}
            size={buttonSize}
        >
            {buttonLabel}
        </Button>,
        <Button
            type={buttonType}
            size={buttonSize}
            {...split && { ref }}
            data-toggle='dropdown'
            className={classnames([
                'dropdown-toggle',
                'dropdown-toggle-split'
            ])}
        >
            {children}
        </Button>
    ]

    const ddCtx = React.useContext(DropdownCtx)
    let isCaretPlaceLeft = false, directionCls = null
    switch (ddCtx.placement) {
        case 'top-start':
        case 'top-end':
        case 'top': directionCls = 'dropup'; break;
        case 'bottom-start':
        case 'bottom-end':
        case 'bottom': directionCls = 'dropbottom'; break;
        case 'left-start':
        case 'left-end':
        case 'left': directionCls = 'dropleft'; isCaretPlaceLeft = true; break;
        case 'right-start':
        case 'right-end':
        case 'right': directionCls = 'dropright'; break;
        default: break
    }

    if (isCaretPlaceLeft) {
        splitedButtonGroupTuple = splitedButtonGroupTuple.reverse()
        splitedButtonGroupTuple[0] = (
            <div className={`btn-group ${directionCls}`}>
                {React.cloneElement(splitedButtonGroupTuple[0], { ref })}
            </div>
        )
    }

    return (
        <FinalJSX>{splitedButtonGroupTuple}</FinalJSX>
    )
}

Dropdown.Toggle = React.forwardRef(Toggle)