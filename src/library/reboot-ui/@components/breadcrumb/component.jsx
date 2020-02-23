import React from 'react'

import classnames from 'classnames'

import { resolveJSXElement } from '../../utils/ui'
import { isReactTypeOf } from '../../../../utils/react-like'
import { arraify } from '../../../../utils/array';

/**
 * @see https://getbootstrap.com/docs/4.4/components/breadcrumbs
 */
const Breadcrumb = React.forwardRef((
    function ({
        children,
        as: _as = 'nav',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['nav', 'div'] });
    
        children = arraify(children).filter(x => isReactTypeOf(x, Item))
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={classnames([
                    props.className,
                    props.class,
                ])}
                aria-label="breadcrumb"
            >
                <ol class="breadcrumb">
                    {children}
                </ol>
            </JSXEl>
        )
    }
))

const Item = React.forwardRef((
    function ({
        children,
        as: _as = 'li',
        active = false,
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['li'] });
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={classnames([
                    props.className,
                    props.class,
                    'breadcrumb-item',
                    active && 'active'
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Breadcrumb.Item = Item

export default Breadcrumb