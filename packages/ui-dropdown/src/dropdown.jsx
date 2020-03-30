import React from 'react'
import classnames from 'classnames'
import { Transition } from 'react-transition-group';

import Button from '@reboot-ui/ui-button';
import Nav from '@reboot-ui/ui-nav';
import Popper from '@reboot-ui/icomponent-popper';

import { TransitionTimeouts, resolveJSXElement, arraify, isReactTypeOf } from '@reboot-ui/common';
import { rclassnames, tryUseContext, parsePlacement } from '@reboot-ui/common'
import Anchor from '@reboot-ui/icomponent-anchor';

import { DropdownMenu, DropdownItem } from './others';

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
         * @see placment option.placement in popper.js
         */
        placement = 'bottom-start',
        popperOptions = {},
        children,
        as: _as = 'div',
        overlay = null,
        ...props
    }, ref) {        
        const [fixedPlacement, setFixedPlacement] = React.useState(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPopperOptions: {
            popperOptions = popperOptions || {};
            popperOptions.modifiers = popperOptions.modifiers || [];

            popperOptions.modifiers.push({
                name: Popper.useFixupPopoverToken('fixup-popper-placement'),
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                }
            })
        }

        const [toggleIsSplitButton, setToggleIsSplitButton] = React.useState(false)

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
            _toggleIsSplitButton: toggleIsSplitButton,
            _setToggleIsSplitButton: () =>
                setToggleIsSplitButton(true)
        }

        const { directionCls = '' } = parsePlacementFromDDCtx(dropdownCtx.fromOptions.placement)

        if (toggleIsSplitButton)
            _as = ButtonGroup

        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        return (
            <>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        (
                            JSXEl instanceof HTMLElement
                            || typeof JSXEl === 'string' 
                            || _as === Nav.Item
                        ) && 'dropdown',
                        directionCls
                    ])}
                >
                    <DropdownCtx.Provider value={dropdownCtx}>
                        <Popper
                            {...props}
                            disabled={disabled}
                            children={children}
                            placement={dropdownCtx.fromFixed.placement}
                            popperOptions={popperOptions}
                            overlayType={Dropdown.Menu}
                            overlay={overlay}
                            destroyOnUnmount={false}
                            dismissOnClickAway={true}
                            // ref={ref}
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
                </JSXEl>
            </>
        )
    }
)
export default Dropdown

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.LinkItem = ({ ...props }) => <DropdownItem {...props} as={'a'} />

function parsePlacementFromDDCtx (placement) {
    let isCaretPlaceLeft = false, directionCls = ''
    switch (placement) {
        case 'top-start':
        case 'top-end':
        case 'top': directionCls = 'dropup'; break;
        case 'bottom-start':
        case 'bottom-end':
        case 'bottom': /* directionCls = 'dropbottom' */; break;
        case 'left-start':
        case 'left-end':
        case 'left': directionCls = 'dropleft'; isCaretPlaceLeft = true; break;
        case 'right-start':
        case 'right-end':
        case 'right': directionCls = 'dropright'; break;
        default: break
    }

    return {
        isCaretPlaceLeft,
        directionCls,
        placement,
    }
}

Dropdown.Toggle = React.forwardRef(
    function ({
        children,
        as: _as = null,
        toggleAs: TogglerEl = Button,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        if (TogglerEl === 'a') TogglerEl = Anchor
    
        return (
            <JSXEl
                {...props}
            >
                <TogglerEl
                    /**
                     * @description assign props to TogglerEl when not use split and JSXEL is null
                     * 
                     * @why required in some case, e.g. Nav.DropdownItem
                     */
                    {...!_as && {
                        ...props,
                        className: rclassnames(props, [
                        ])
                    }}
                    ref={ref}
                    className={classnames([
                        'dropdown-toggle'
                    ])}
                    data-toggle='dropdown'
                    aria-haspopup={true}
                    // aria-expanded={}
                >
                    {children}
                </TogglerEl>
            </JSXEl>
        )
    }
)

const INTERNAL_PROP_TOKEN = Date.now()
function useInternalPropToken (propName) { return `${INTERNAL_PROP_TOKEN}$${propName}` }

Dropdown.SplitButtonToggle = React.forwardRef(
    function ({
        children,
        as: _as = null,
        theme,
        size,
        outline,
        [useInternalPropToken('__internal_no_notify_dropdowncontext')]: __internal_no_notify_dropdowncontext = false,
        ...props
    }, ref) {
        const ddCtx = tryUseContext(DropdownCtx)
        
        if (!__internal_no_notify_dropdowncontext)
            /**
             * @internal set once only
             */
            if (!ddCtx._toggleIsSplitButton)
                ddCtx._setToggleIsSplitButton(true)

        const {isCaretPlaceLeft = false, directionCls = ''} = parsePlacementFromDDCtx(ddCtx.fromOptions.placement)

        let splitedButtonGroupTuple = [
            <Button
                {...props}
                theme={theme}
                size={size}
                outline={outline}
            >
                {children}
            </Button>,
            <Button
                theme={theme}
                size={size}
                outline={outline}
                ref={ref}
                className={classnames([
                    'dropdown-toggle',
                    'dropdown-toggle-split'
                ])}
                data-toggle='dropdown'
            />
        ]
    
        if (isCaretPlaceLeft) {
            splitedButtonGroupTuple = splitedButtonGroupTuple.reverse()
            splitedButtonGroupTuple[0] = (
                <div className={rclassnames({}, [
                    'btn-group',
                    directionCls
                ])}>
                    {React.cloneElement(splitedButtonGroupTuple[0], { ref })}
                </div>
            )
        }

        return splitedButtonGroupTuple;
    }
)

Dropdown.ForInputGroup = ({
    children,
    label = '',
    split = false,
    ...props
}) => {
    const ToggleEl = split ? Dropdown.SplitButtonToggle : Dropdown.Toggle

    return (
        <Dropdown as={null}>
            <ToggleEl
                {...props}
                {...split && {
                    [useInternalPropToken('__internal_no_notify_dropdowncontext')]: true
                }}
            >
                {label}
                <span class="sr-only">Toggle Dropdown</span>
            </ToggleEl>
            {children}
        </Dropdown>
    )
}

Dropdown.AsNavItem = function ({ children: childEles, ...props }) {
    const children = arraify(childEles);
    const menuNode = children.find(el => isReactTypeOf(el, Dropdown.Menu))
    let togglerNode = children.find(el => isReactTypeOf(el, Dropdown.Toggle))

    const restChildren = children.filter(el => el !== menuNode && el !== togglerNode)

    if (!togglerNode)
        togglerNode = <Dropdown.Toggle as={null} toggleAs={Nav.Link}>{restChildren}</Dropdown.Toggle>
    else
        togglerNode = React.cloneElement(togglerNode, { toggleAs: Nav.Link, as: null })

    return (
        <Dropdown
            {...props}
            as={Nav.Item}
            overlay={menuNode || null}
        >
            {togglerNode}
        </Dropdown>
    )
}