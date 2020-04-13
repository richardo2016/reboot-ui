import React from 'react'

import {
    rclassnames,
    resolveJSXElement,
    filterRepsonsiveSize,
    filterThemeName,
    tryUseContext,
    renderJSXFunc,
    RebootUI
} from '@reboot-ui/common'

import Anchor from '@reboot-ui/icomponent-anchor';
import CollapseProto from '@reboot-ui/icomponent-collapse'

const ControlledCollapse = React.forwardRef(CollapseProto)

type MemberType = 'toggle' | 'collapse'
interface NavbarContextType<TRef = any> {
    symbol: Symbol
    collapse: boolean
    refs: Record<string, React.MutableRefObject<TRef> | null>
    _toggleCollapse: (nextVal?: boolean) => void
    _registerRef: (member: MemberType, ref: TRef) => void
    _unregisterRef: (member: MemberType) => void
}

const NavbarContext = React.createContext<NavbarContextType>({} as NavbarContextType);
const ctxSymbol = Symbol('#Navbar')
const useHookSymbols = {
    collapse: Symbol('#Navbar#useHook#collapse')
}

const useInitContextState = (SYMBOL = ctxSymbol) => {    
    const [ collapse, setCollapse ] = React.useState(true)

    const context: NavbarContextType = {
        symbol: SYMBOL,
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
        _unregisterRef: (member) => {
            if (context.refs[member])
                context.refs[member] = null
        }
    }

    // repass change of `collapse` state to last context
    const lastCtxState = tryUseContext<NavbarContextType>(NavbarContext)
    React.useEffect(() => {
        if (lastCtxState.symbol === useHookSymbols.collapse) {
            lastCtxState._toggleCollapse(context.collapse)
        }
    }, [context.collapse])

    return [context]
}

const useRefRegistry = (memberType: MemberType, ref: any) => {
    const navbarCtx = tryUseContext<NavbarContextType>(NavbarContext)
    React.useEffect(() => {
        if (navbarCtx.symbol !== ctxSymbol) return ;
        
        navbarCtx._registerRef(memberType, ref)
        return () => {
            navbarCtx._unregisterRef(memberType)
        }
    }, [])

    return [navbarCtx, ref]
}
const NavbarProto = React.forwardRef(function (
    {
        children,
        as: _as = 'nav',
        expandWhen,
        theme,
        bgTheme,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        expandWhen?: RebootUI.BreakPointType
        theme?: RebootUI.ThemeType
        bgTheme?: RebootUI.ThemeType
    }>,
    ref: RebootUI.ReactRef
) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'nav', 'header'] });

    expandWhen = filterRepsonsiveSize(expandWhen)

    theme = filterThemeName(theme)
    bgTheme = filterThemeName(bgTheme)

    const [ contextState ] = useInitContextState(ctxSymbol)

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
})

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
const Navbar = function (props: RebootUI.IComponentPropsWithChildren<
    RebootUI.IGetReactLikeComponentProps<typeof NavbarProto>
>) {
    return <NavbarProto {...props} />
}

Navbar.Brand = function ({
    children,
    as: _as = 'a',
    ...props
}: RebootUI.IComponentPropsWithChildren) {
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
}: RebootUI.IComponentPropsWithChildren) {
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
    }: RebootUI.IComponentPropsWithChildren<{
        target?: string
    }>, ref) {
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
                onClick={(evt: any) => {
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
    }: RebootUI.IComponentPropsWithChildren<{}>,
    ref) {
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

Navbar.useCollapse = (fnOrComponent: Parameters<typeof renderJSXFunc>[0]) => {
    const [ contextState ] = useInitContextState(useHookSymbols.collapse)
    contextState.symbol = useHookSymbols.collapse

    return (
        <NavbarContext.Provider value={contextState}>
            {renderJSXFunc(fnOrComponent, {
                collapse: contextState.collapse
            })}
        </NavbarContext.Provider>
    )
}

export default Navbar