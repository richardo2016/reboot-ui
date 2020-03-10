import React from 'react'

import {
    resolveJSXElement,
    rclassnames,
    tryUseContext,
    filterPaginationSize
} from '../common'
import Anchor from '../helper-anchor';
import { pick } from '../common/_base';

const PagiContext = React.createContext({})

const Pagination = React.forwardRef(
    function ({
        children,
        as: _as = 'ul',
        pagination,
        size = '',
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'ol', 'ul'] });

        size = filterPaginationSize(size)

        pagination = {
            page: 0,
            pageSize: 20,
            total: 0,
            ...pick((pagination || {}), ['page', 'pageSize', 'total'])
        }

        const ctxValue = {
            pagination
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
                    {children}
                </JSXEl>
            </PagiContext.Provider>
        )
    }
)

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
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const LinkWrppaer = link ? Pagination.Link : React.Fragment

    const pagiCtx = tryUseContext(PagiContext)
    if (active === undefined) active = pagiCtx.active

    return (
        <JSXEl
            className={rclassnames(props, [
                'page-item',
                disabled && `disabled`,
                active && `active`,
            ])}
        >
            <LinkWrppaer
                {...link && typeof link === 'string' && { href: link }}
                active={active}
                disabled={disabled}
            >
                {children}
            </LinkWrppaer>
        </JSXEl>
    )
}

export default Pagination