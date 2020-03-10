import React from 'react'

import {
    resolveJSXElement,
    rclassnames,
    tryUseContext,
    filterPaginationSize,
    usePagination,
    renderChildren,
    arraify,
} from '../common'
import Anchor from '../helper-anchor';

const symbol = Symbol('#pagination')

const PagiContext = React.createContext({})

function noop () {}
const Pagination = React.forwardRef(
    function ({
        children,
        as: _as = 'ul',
        pagination: initPage = usePagination()[0],
        onChange = noop,
        size = '',
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'ol', 'ul'] });

        const [pagination, , computePagination] = usePagination(initPage);

        size = filterPaginationSize(size)

        const ctxValue = {
            symbol: symbol,
            pagination,
            computePagination,
            _updatePagi: React.useCallback(
                (type, payload) => onChange(computePagination(type, payload, {...pagination}))
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
                    {renderChildren(children, { pagination })}
                </JSXEl>
            </PagiContext.Provider>
        )
    }
)

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
}) => {
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
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const LinkWrppaer = link ? Pagination.Link : React.Fragment

    const pagiCtx = tryUseContext(PagiContext)
    if (active === undefined)
        active = pagiCtx.pagination.currentPage === page

    if (children === undefined && page !== undefined) {
        children = active ? (
            <>
                {page}{' '}
                <span class="sr-only">(current)</span>
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
            onClick={(evt) => {
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
                {renderChildren(children, { pagination: pagiCtx.pagination, page, active, disabled })}
            </LinkWrppaer>
        </JSXEl>
    )
}

export default Pagination