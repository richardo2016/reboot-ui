import React from 'react'

import { resolveJSXElement, filterRepsonsiveSize, filterThemeName, tryUseContext } from '../common'
import { rclassnames } from '../common';
import Anchor from '../helper-anchor';
import CollapseProto from '../helper-collapse'

const ControlledCollapse = React.forwardRef(CollapseProto)

const NavbarContext = React.createContext({});
const ctxSymbol = Symbol('#Navbar')

const useInitContextState = () => {
    const [ collapse, setCollapse ] = React.useState(true)

    const context = {
        symbol: ctxSymbol,
        collapse,
        refs: {},
        _toggleCollapse: (nextStatus = !context.collapse) => setCollapse(nextStatus),
        _registerRef: (member, ref) => {
            switch (member) {
                case 'toggle':
                case 'collapse':
                    if (context.refs[member])
                        throw new Error(`[Navbar] member ref has been existed, stop add member under this context!`)
                    context.refs[member] = ref
                    break
                default:
                    throw new Error(`[Navbar] unknown member ref '${member}', report to your administrator.`)
            }
        },
        _unregisterRef: (member, ref) => {
            if (context.refs[member])
                context.refs[member] = null
        }
    }

    return [context]
}

const useRefRegistry = (memberType, ref) => {
    const navbarCtx = tryUseContext(NavbarContext)
    React.useEffect(() => {
        if (navbarCtx.symbol !== ctxSymbol) return ;
        
        navbarCtx._registerRef(memberType, ref)
        return () => {
            navbarCtx._unregisterRefs(memberType, ref)
        }
    }, [])

    return [navbarCtx, ref]
}

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.navbar-brand`
 * @inner-content `.navbar-nav`
 * @inner-content `.navbar-toggler`
 * 
 * @inner-content `.navbar-text`
 * @inner-content `.collapse.navbar-collapse`
 */
const Navbar = React.forwardRef(
    function ({
        children,
        as: _as = 'nav',
        expandWhen = '',
        theme = '',
        bgTheme = '',
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'nav', 'header'] });

        expandWhen = filterRepsonsiveSize(expandWhen)

        theme = filterThemeName(theme)
        bgTheme = filterThemeName(bgTheme)

        const [ contextState ] = useInitContextState()

        return (
            <NavbarContext.Provider value={contextState}>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        "navbar",
                        expandWhen && `navbar-expand-${expandWhen}`,
                        theme && `navbar-${theme}`,
                        bgTheme && `bg-${bgTheme}`,
                    ])}
                >
                    {children}
                </JSXEl>
            </NavbarContext.Provider>
        )
    }
)

Navbar.Brand = function ({
    children,
    as: _as = 'a',
    ...props
}) {
    if (_as === 'a') _as = Anchor

    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'navbar-brand'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Navbar.Text = function ({
    children,
    as: _as = 'span',
    ...props
}) {
    if (_as === 'a') _as = Anchor

    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'navbar-text'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Navbar.Toggle = React.forwardRef(
    function ({
        // children = (<span className="navbar-toggler-icon" />),
        as: _as = 'button',
        target = '',
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });
        
        ref = ref || React.useRef(null);
        const [ navbarCtx ] = useRefRegistry('toggle', ref);
    
        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'navbar-toggler'
                ])}
                type="button"
                data-toggle="collapse"
                {...target && {
                    'data-target': `#${target}`,
                    'aria-controls': `${target}`,
                }}
                aria-expanded={!navbarCtx.collapse}
                aria-label="Toggle navigation"
                onClick={(evt) => {
                    if (navbarCtx.symbol === ctxSymbol)
                        navbarCtx._toggleCollapse(!navbarCtx.collapse)
                    
                    if (typeof props.onClick === 'function')
                        props.onClick(evt)
                }}
            >
                <span className="navbar-toggler-icon" />
            </JSXEl>
        )
    }
)

Navbar.Collapse = React.forwardRef(
    function ({
        children,
        ...props
    }, ref) {
        ref = ref || React.useRef(null);
        const [ navbarCtx ] = useRefRegistry('collapse', ref);
    
        return (
            <ControlledCollapse
                {...props}
                ref={ref}
                collapse={navbarCtx.collapse}
                className={rclassnames(props, [
                    'navbar-collapse',
                ])}
            >
                {children}
            </ControlledCollapse>
        )
    }
)

export default Navbar