import React from 'react'

import classnames from 'classnames'

// import { createPopper } from '@popperjs/core';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import cpm_flip from '@popperjs/core/lib/modifiers/flip';
import cpm_preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import cpm_offset from '@popperjs/core/lib/modifiers/offset';

import { resolveJSXElement } from '../../utils/ui'
import { filterPlacement } from '../../utils/popper'
import { dedupe, arraify } from '../../../../utils/array';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import { isReactTypeOf, getHTMLElementFromJSXElement, parseChildrenProp, rclassnames, tryUseContext } from '../../../../utils/react-like'

import {DropdownMenu, DropdownItem} from './others';
import Button from '../../@components/button/component';

const DropdownCtx = React.createContext({})

/**
 * @see https://getbootstrap.com/docs/4.4/components/dropdown/#supported-content
 */
const Dropdown = React.forwardRef(
    function ({
        disabled = false,
        /**
         * @see placment option.placement in poper.js
         */
        placement = 'bottom-start',
        popperOptions = {},
        children: childEles,
        as: _as = 'div',
        overlay: dropdownJsxEl = null,
        noWrap = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        
        const triggerElRef = React.useRef(null)
        const dropdownPopRef = React.createRef()

        const [showDropdown, setShowDropdown] = React.useState(false);

        const { childNodeList } = parseChildrenProp(childEles)

        const children = childNodeList.filter(x => x)

        let useToggleAsTrigger = false
        let triggerJsxElIdx = children.findIndex(child => {
            // TEXT_NODE has no props
            if (!child.props) return ;
            if (child.props.dropdownTrigger) return true
            if (isReactTypeOf(child, Dropdown.Toggle)) {
                useToggleAsTrigger = true
            }
            return false
        })
        triggerJsxElIdx = triggerJsxElIdx > -1 ? triggerJsxElIdx : 0
        let triggerJsxEl = children[triggerJsxElIdx] || null
        if (triggerJsxEl) {
            triggerJsxEl = React.cloneElement(triggerJsxEl, {ref: triggerElRef})
            if (triggerJsxElIdx > -1) children[triggerJsxElIdx] = triggerJsxEl
        }

        let dropdownJsxElIdx = -1
        if (
            !dropdownJsxEl
            && (
                dropdownJsxElIdx = children.findIndex(child => isReactTypeOf(child, DropdownMenu))
            ) > -1
        ) {
            dropdownJsxEl = children[dropdownJsxElIdx]
        }
        if (dropdownJsxEl) {
            dropdownJsxEl = React.cloneElement(dropdownJsxEl, {ref: dropdownPopRef})
            if (dropdownJsxElIdx > -1) children[dropdownJsxElIdx] = dropdownJsxEl
        }

        let restChildren = children.filter(x =>(x !== dropdownJsxEl))
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
                        && dropdownPopRef.current
                        && getHTMLElementFromJSXElement(dropdownPopRef.current)
                        && getHTMLElementFromJSXElement(dropdownPopRef.current).contains(clkAwayEl)
                    ) return ;
                    setShowDropdown(false)
                }
            }
        )

        React.useLayoutEffect(() => {
            if (dropdownPopRef.current)
                try {
                    const _overlayEl = getHTMLElementFromJSXElement(dropdownPopRef.current)

                    if (_overlayEl.classList.contains('dropdown-menu'))
                        if (showDropdown) _overlayEl.classList.add('show')
                        else _overlayEl.classList.remove('show')
                } catch (error) {}

            if (!showDropdown) return ;
            if (!triggerElRef.current) return ;
            if (!dropdownPopRef.current) return ;

            let overlayPlacement = placement
            /**
             * @TODO use breakPoint of bootstrap, resolve objective-type placement and use it.
             */
            if (dropdownJsxEl.props && typeof dropdownJsxEl.props.placement === 'string')
                overlayPlacement = filterPlacement(dropdownJsxEl.props && dropdownJsxEl.props.placement)

            const instance = createPopper(
                getHTMLElementFromJSXElement(triggerElRef.current),
                getHTMLElementFromJSXElement(dropdownPopRef.current),
                {
                    placement: overlayPlacement,
                    ...popperOptions,
                    modifiers: dedupe([
                        cpm_flip,
                        cpm_preventOverflow,
                        cpm_offset,
                        ...(popperOptions.modifiers || []),
                    ])
                }
            )

            return () => {
                instance.destroy();
            }
        }, [showDropdown])

        const INNER_NODE = (
            <DropdownCtx.Provider value={{ placement, showDropdown, dropdownJsxEl }}>
                {restChildren}
                {showDropdown && (!useToggleAsTrigger && dropdownJsxEl)}
            </DropdownCtx.Provider>
        )

        if (!_as || noWrap)
            return INNER_NODE

        return (
            <>
                <JSXEl
                    {...props}
                    ref={ref}
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
)
export default Dropdown

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

Dropdown.Toggle = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        toggleAs: TogglerEl = Button,
        split = false,
        theme,
        label,
        size,
        outline,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
    
        const ddCtx = tryUseContext(DropdownCtx)
    
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
    
        const WrapperJSX = ({ children }) => {
            return (
                <JSXEl
                    className={rclassnames(props, [
                        'btn-group',
                        directionCls
                    ])}
                >
                    {children}
                    {ddCtx.showDropdown && ddCtx.dropdownJsxEl}
                </JSXEl>
            )
        }
        
        const buttonTheme = theme;
        let buttonLabel = label || (!split ? children : null);
        const buttonSize = size;
        const buttonOutline = outline;
    
        if (!split)
            return (
                <WrapperJSX>
                    <TogglerEl
                        ref={ref}
                        theme={buttonTheme}
                        size={buttonSize}
                        outline={buttonOutline}
                        className={classnames([
                            'dropdown-toggle'
                        ])}
                        data-toggle='dropdown'
                    >
                        {buttonLabel}
                    </TogglerEl>
                </WrapperJSX>
            )
        
        if (typeof split === 'string') buttonLabel = split
        let splitedButtonGroupTuple = [
            <Button
                theme={buttonTheme}
                size={buttonSize}
                outline={buttonOutline}
            >
                {buttonLabel}
            </Button>,
            <Button
                theme={buttonTheme}
                size={buttonSize}
                outline={buttonOutline}
                {...split && { ref }}
                className={classnames([
                    'dropdown-toggle',
                    'dropdown-toggle-split'
                ])}
                data-toggle='dropdown'
            >
                {children}
            </Button>
        ]
    
        if (isCaretPlaceLeft) {
            splitedButtonGroupTuple = splitedButtonGroupTuple.reverse()
            splitedButtonGroupTuple[0] = (
                <div className={`btn-group ${directionCls}`}>
                    {React.cloneElement(splitedButtonGroupTuple[0], { ref })}
                </div>
            )
        }
    
        return (
            <WrapperJSX>{splitedButtonGroupTuple}</WrapperJSX>
        )
    }
)