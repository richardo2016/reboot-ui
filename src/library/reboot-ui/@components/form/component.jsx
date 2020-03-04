
import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, tryUseRef, isReactTypeOf } from '../../../../utils/react-like';

import Input from '../input/component'
import { arraify } from '../../../../utils/array';

/**
 * @see https://getbootstrap.com/docs/4.4/components/form/#supported-content
 * 
 * @inner-content `.form-group`
 * @inner-content `.form-control`
 */
const Form = function ({
    children,
    as: _as = 'form',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['form', 'div'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `form`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Form.Group = function ({
    children,
    as: _as = 'form',
    check = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `form-group`,
                check && `form-check`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

export const FormControlContext = React.createContext(null)

Form.Control = React.forwardRef(
    function ({
        children,
        id = '',
        label = '',
        labelAfter = false,
        as: _as = React.Fragment,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const formCtrlCtx = {
            controlId: id,
            label: label
        }

        const labelNode = label && typeof label === 'string' ? (
            <label for={id}>{label}</label>
        ) : label
        const labelAfterNode = labelAfter && typeof labelAfter === 'string' ? (
            <label for={id}>{labelAfter}</label>
        ) : labelAfter
        
        children = arraify(children)
        let foundIdInput
        children.forEach((item, idx) => {
            if (!(
                isReactTypeOf(item, Input) || item instanceof HTMLInputElement
                || item instanceof HTMLTextAreaElement
            )) return 

            const nextProps = {className: rclassnames(item.props, [
                (() => {
                    if (item.props.type === 'checkbox')
                        return 'form-check-input'
                        
                    return 'form-control'
                })()
            ])}
            
            if (id && !foundIdInput) {
                nextProps.id = id
                foundIdInput = true
            }

            children[idx] = React.cloneElement(item, nextProps)
        })

        return (
            <FormControlContext.Provider value={formCtrlCtx}>
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                    ])}
                >
                    {labelNode}
                    {children}
                    {labelAfterNode}
                </JSXEl>
            </FormControlContext.Provider>
        )
    }
)

Form.Text = function ({
    children,
    as: _as = 'span',
    muted = false,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `form-text`,
                muted && `text-muted`
            ])}
        >
            {children}
        </JSXEl>
    )
}


export default Form