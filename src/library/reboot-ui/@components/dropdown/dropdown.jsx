import React from 'react'
import classnames from 'classnames'
import { Transition } from 'react-transition-group';

import Button from '../button/button';
import Popper from '../_helpers/popper';

import { TransitionTimeouts, resolveJSXElement } from '../common';
import { rclassnames, tryUseContext, parsePlacement } from '../common'

import { DropdownMenu, DropdownItem } from './others';
import { useFixupPopoverToken } from '../common/popper';

const DropdownCtx = React.createContext({})

const transitionStateClass = {
    entering: 'show',
    entered: 'show',
    exiting: '',
    exited: ''
}

const transitionStateStyle = {
    exiting: {},
    exited: { opacity: 0 },
}
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
        children,
        as: _as = 'div',
        overlay = null,
        noWrap = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        
        const [fixedPlacement, setFixedPlacement] = React.useState(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPopperOptions: {
            popperOptions = popperOptions || {};
            popperOptions.modifiers = [];

            popperOptions.modifiers.push({
                name: useFixupPopoverToken('fixup-popper-placement'),
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                }
            })
        }

        const dropdownCtx = {
            fromOptions: {
                direction: pmInfo.direction,
                placement: pmInfo.placement,
            },
            fromFixed: {
                ...pmInfo,
                ...fixedPlacement && parsePlacement(fixedPlacement)
            },
            useArrow: false,
        }

        const INNER_NODE = (
            <DropdownCtx.Provider value={dropdownCtx}>
                <Popper
                    {...props}
                    children={children}
                    placement={dropdownCtx.fromFixed.placement}
                    popperOptions={popperOptions}
                    overlayType={Dropdown.Menu}
                    overlay={overlay}
                    destroyOnUnmount={false}
                    dismissOnClickAway={true}
                    ref={ref}
                    compose={({
                        restChildren,
                        overlayElement,
                        isShowPopup,
                    }) => {
                        return (
                            <>
                                {restChildren}
                                {(
                                    <Transition
                                        in={isShowPopup}
                                        timeout={{
                                            enter: TransitionTimeouts.Fade,
                                            exit: TransitionTimeouts.Fade,
                                        }}
                                    >
                                        {(state) => {
                                            if (state === 'exited' && !isShowPopup) return ;
                                            
                                            return (
                                                React.cloneElement(overlayElement, {
                                                    className: rclassnames(overlayElement.props, [
                                                        transitionStateClass[state],
                                                    ]),
                                                    style: {
                                                        ...transitionStateStyle[state],
                                                        ...overlayElement.props.style,
                                                    }
                                                })
                                            )
                                        }}
                                    </Transition>
                                )}
                            </>
                        )
                    }}
                />
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
        switch (ddCtx.fromOptions.placement) {
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
        
        const buttonTheme = theme;
        let buttonLabel = label || (!split ? children : null);
        const buttonSize = size;
        const buttonOutline = outline;

        const btnGroupCls = rclassnames(props, [
            'btn-group',
            directionCls
        ])
    
        if (!split)
            return (
                <JSXEl
                    className={btnGroupCls}
                >
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
                </JSXEl>
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
            <JSXEl className={btnGroupCls}>
                {splitedButtonGroupTuple}
            </JSXEl>
        )
    }
)