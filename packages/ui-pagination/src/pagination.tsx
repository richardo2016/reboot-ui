import React from 'react'

import {
    resolveJSXElement,
    rclassnames,
    tryUseContext,
    filterPaginationSize,
    usePagination,
    renderJSXFunc,
    RebootUI,
} from '@reboot-ui/common'
import Anchor from '@reboot-ui/icomponent-anchor';

const symbol = Symbol('#pagination')

interface PagiContextType {
    symbol: Symbol
    pagination: RebootUI.IPaginationInfo
    computePagination: ReturnType<typeof usePagination>[2]
    _updatePagi: ReturnType<typeof usePagination>[2]
}
const PagiContext = React.createContext<PagiContextType>({} as PagiContextType)

function noop () {}
const PaginationProto = React.forwardRef(
    function ({
        children,
        as: _as = 'ul',
        pagination: initPage = usePagination()[0],
        onChange = noop,
        size,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        as?: RebootUI.IPropAs
        pagination?: RebootUI.IPaginationInfo
        size?: RebootUI.BinarySizeType
        onChange?: (pagi: RebootUI.IPaginationInfo) => any
    }>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'ol', 'ul'] });

        const [pagination, , computePagination] = usePagination(initPage);

        size = filterPaginationSize(size)

        const ctxValue: PagiContextType = {
            symbol: symbol,
            pagination,
            computePagination,
            _updatePagi: React.useCallback(
                (type, payload) => onChange(
                    computePagination(type, payload, {...pagination})
                )
                , [pagination]
            )
        }
    
        return (
            <PagiContext.Provider value={ctxValue}>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        'pagination',
                        size && `pagination-${size}`,
                    ])}
                >
                    {renderJSXFunc(children, { pagination })}
                </JSXEl>
            </PagiContext.Provider>
        )
    }
)

const Pagination = (props: RebootUI.IComponentPropsWithChildren<
    RebootUI.IGetReactLikeComponentProps<typeof PaginationProto>
>) => {
    return <PaginationProto {...props} />
}

Pagination.usePagination = usePagination

Pagination.useContextPagination = () => {
    const pagiCtx = tryUseContext(PagiContext)

    if (pagiCtx.symbol !== symbol)
        throw new Error(`[useContextPagination] hooks can be only used under Pagination's context!`)

    return [
        pagiCtx.pagination,
        pagiCtx._updatePagi
    ]
}

Pagination.Link = ({
    children,
    as: _as = 'a',
    active = false,
    disabled = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    active?: boolean
    disabled?: boolean
}>) => {
    if (_as === 'a') _as = Anchor

    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'page-link'
            ])}
            {...disabled && {
                'tab-index': -1,
                'aria-disabled': true
            }}
        >
            {children}
        </JSXEl>
    )
}

Pagination.Item = function ({
    children,
    as: _as = 'li',
    link = false,
    page,
    active,
    disabled = false,
    prev: _prev = false,
    next: _next = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    page?: RebootUI.IPaginationInfo['page']
    active?: boolean
    disabled?: boolean
    link?: boolean
    prev?: boolean
    next?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const LinkWrppaer = link ? Pagination.Link : React.Fragment

    const pagiCtx = tryUseContext(PagiContext)
    if (active === undefined)
        active = pagiCtx.pagination.currentPage === page

    if (children === undefined && page !== undefined) {
        children = active ? (
            <>
                {page}{' '}
                <span className="sr-only">(current)</span>
            </>
        ) : page

    }

    if (_next) _prev = false
    if (_prev) _next = false

    return (
        <JSXEl
            className={rclassnames(props, [
                'page-item',
                disabled && `disabled`,
                active && `active`,
            ])}
            onClick={(evt: Parameters<React.MouseEventHandler>[0]) => {
                if (!disabled) {
                    if (_prev) {
                        pagiCtx._updatePagi('prevPage')
                    } else if (_next) {
                        pagiCtx._updatePagi('nextPage')
                    } else if (page !== undefined)
                        if (!active)
                            pagiCtx._updatePagi('currentPage', page)
                }
                    
                if (typeof props.onClick === 'function')
                    props.onClick(evt)
            }}
        >
            <LinkWrppaer
                {...link && typeof link === 'string' && { href: link }}
                active={active}
                disabled={disabled}
            >
                {renderJSXFunc(children, { pagination: pagiCtx.pagination, page, active, disabled })}
            </LinkWrppaer>
        </JSXEl>
    )
}

export default Pagination