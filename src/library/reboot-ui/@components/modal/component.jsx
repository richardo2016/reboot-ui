import React from 'react'

import { resolveJSXElement, toggleCls } from '../../utils/ui'
import RbTransition from '../_helpers/transition';
import { rclassnames, tryUseRef } from '../../../../utils/react-like';
import { TransitionTimeouts } from '../common';
import { coerceInteger } from '../../../../utils/coerce';

function noop() {}

const ModalContext = React.createContext({
    arrowRef: null,
})

const TRANSITION_STATE_STYLE = {
    entering: {display: 'block'},
    entered: {display: 'block'},
    exiting: {display: 'block'},
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.modal`
 * @inner-content `.modal-header`
 * @inner-content `.modal-body`
 */
const Modal = React.forwardRef(
    ({
        children,
        document: useDocumentMode = false,
        isOpen = useDocumentMode ? true : false,
        onToggle = noop,
        dismissOnClickAway = true,
        duration = TransitionTimeouts.Modal,
        ...props
    }, ref) => {
        const dialogRole = useDocumentMode ? 'document' : 'dialog'

        const modalCtx = {
            dismissOnClickAway,
            backdropRef: React.useRef(null),
            isOpen,
            dialogRole,
            onToggle,
        }

        duration = coerceInteger(duration, TransitionTimeouts.Modal)

        React.useLayoutEffect(() => {
            toggleCls(document.body, 'modal-open', isOpen)
        }, [isOpen])

        return (
            <ModalContext.Provider value={modalCtx}>
                <RbTransition
                    {...props}
                    className={rclassnames(props, [
                        'modal',
                        'fade',
                    ])}
                    style={{
                        ...props.style,
                    }}
                    tabindex="-1"
                    ref={ref}
                    transitionProps={{
                        active: isOpen,
                        duration: TransitionTimeouts.Fade,
                        transitionStateStyle: { ...TRANSITION_STATE_STYLE },
                    }}
                >
                    {children}
                </RbTransition>
                {!useDocumentMode && <RbTransition
                    className={rclassnames(props, [
                        'modal-backdrop',
                        'fade',
                    ])}
                    style={{
                        ...!isOpen && { display: 'none' }
                    }}
                    ref={modalCtx.backdropRef}
                    transitionProps={{
                        active: isOpen,
                        duration: TransitionTimeouts.Fade,
                        transitionStateStyle: { ...TRANSITION_STATE_STYLE },
                    }}
                />}
            </ModalContext.Provider>
        )
    }
)

Modal.Dialog = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const modalCtx = tryUseRef(ModalContext)

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'modal-dialog',
                ])}
                {...modalCtx.dialogRole && { role: modalCtx.dialogRole }}
            >
                {children}
            </JSXEl>
        )
    }
)

Modal.Content = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'modal-content',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
)

Modal.Header = ({
    children,
    as: _as = 'div',
    title = children,
    closable = true,
    onToggle,
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const modalCtx = tryUseRef(ModalContext)
    onToggle = onToggle || modalCtx.onToggle || noop

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'modal-header'
            ])}
        >
            {title}
            {closable && (
                <button
                    onClick={() => {
                        onToggle(modalCtx ? modalCtx.isOpen : false)
                    }}
                    type="button" class="close" aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </JSXEl>
    )
}

Modal.Body = ({
    children,
    as: _as = 'div',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'modal-body'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Modal.Footer = ({
    children,
    as: _as = 'div',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'modal-footer'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Modal.Title = ({
    children,
    as: _as = 'h5',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'modal-title'
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default Modal