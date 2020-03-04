import React from 'react'

import { resolveJSXElement, toggleCls } from '../../utils/ui'
import RbTransition from '../_helpers/transition';
import { rclassnames, tryUseRef } from '../../../../utils/react-like';
import { TransitionTimeouts } from '../common';
import { coerceInteger } from '../../../../utils/coerce';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';

function noop() {}

const ModalContext = React.createContext({
    arrowRef: null,
})

const TRANSITION_STATE_STYLE = {
    entering: {display: 'block'},
    entered: {display: 'block'},
    exiting: {display: 'block'},
}

function useClickingStaticBackdrop () {
    const [clicking, setClicking] = React.useState(false)
    const timerRef = React.useRef(null)
    const clean = () => {
        let timer = timerRef.current
        if (timer) clearTimeout(timer)
        timerRef.current = null
    }
    React.useEffect(() => {
        clean()
        if (clicking)
            timerRef.current = setTimeout(() => {
                setClicking(false);
            }, 50)

        return () => {
            clean()
        }
    }, [clicking]);

    return [clicking, setClicking];
}

// const STYLE_DIALOG_LESS = 0x0002
// const STYLE_CONTENT_LESS = 0x0003
/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.modal`
 * @inner-content `.modal-header`
 * @inner-content `.modal-body`
 */
const Modal = (
    ({
        children,
        document: useDocumentMode = false,
        isOpen = useDocumentMode ? true : false,
        onToggle = noop,
        duration = TransitionTimeouts.Modal,
        dialogLess = false,
        contentLess = false,
        size: dialogSize = false,
        dialogRole,
        /**
         * @description when use staticBackdrop, modal wouldn't dismiss when click away `.modal-content`
         */
        staticBackdrop = false,
        /**
         * @description when use scrollable, modal will add `.modal-dialog-scrollable` to Modal.Dialog
         */
        scrollable = false,
        /**
         * @description when use centered, modal will add `.modal-dialog-centered` to Modal.Dialog
         */
        centered = false,
        ...props
    }) => {
        dialogRole = dialogRole || (useDocumentMode ? 'document' : 'dialog')

        const [clickingStaticBackdrop, setClickingStaticBackdrop] = useClickingStaticBackdrop()

        const modalCtx = {
            isOpen,
            onToggle: () => onToggle(modalCtx.isOpen),

            refModal: React.useRef(null),
            refBackdrop: React.useRef(null),
            useStaticBackdrop: staticBackdrop,
            onClickStaticDropback: () => {
                setClickingStaticBackdrop(true);
            },
            dialogRole,
            dialogSize,
            dialogScrollable: scrollable,
            dialogCentered: centered,
        }

        duration = coerceInteger(duration, TransitionTimeouts.Modal)

        React.useLayoutEffect(() => {
            toggleCls(document.body, 'modal-open', isOpen)
        }, [isOpen])


        const DialogJSX = dialogLess ? React.Fragment : Modal.Dialog
        const ContentJSX = contentLess ? React.Fragment : Modal.Content

        return (
            <ModalContext.Provider value={modalCtx}>
                <RbTransition
                    role="dialog"
                    {...!isOpen && {
                        'aria-hidden': true
                    }}
                    tabindex="-1"
                    {...props}
                    className={rclassnames(props, [
                        'modal',
                        'fade',
                        clickingStaticBackdrop && 'modal-static'
                    ])}
                    style={{
                        ...props.style,
                    }}
                    ref={modalCtx.refModal}
                    transitionProps={{
                        active: isOpen,
                        duration: {
                            enter: TransitionTimeouts.Fade,
                            exit: TransitionTimeouts.Fade + 100,
                        },
                        transitionStateStyle: { ...TRANSITION_STATE_STYLE },
                    }}
                >
                    <DialogJSX><ContentJSX>{children}</ContentJSX></DialogJSX>
                </RbTransition>
                {!useDocumentMode && <RbTransition
                    className={rclassnames(props, [
                        'modal-backdrop',
                        'fade',
                    ])}
                    style={{
                        ...!isOpen && { display: 'none' }
                    }}
                    ref={modalCtx.refBackdrop}
                    transitionProps={{
                        active: isOpen,
                        duration: {
                            enter: TransitionTimeouts.Fade,
                            exit: TransitionTimeouts.Modal,
                        },
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
        scrollable,
        centered,
        size: dialogSize = '',
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const modalCtx = tryUseRef(ModalContext)

        if (scrollable === undefined) scrollable = modalCtx.dialogScrollable
        if (centered === undefined) centered = modalCtx.dialogCentered

        dialogSize = dialogSize || modalCtx.dialogSize
        switch (dialogSize) {
            case 'sm':
            case 'lg':
            case 'xl':
                break
            default:
                dialogSize = ''
                break
        }

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'modal-dialog',
                    scrollable && 'modal-dialog-scrollable',
                    centered && 'modal-dialog-centered',
                    dialogSize && `modal-dialog-${dialogSize}`,
                ])}
                {...modalCtx.dialogRole && { role: modalCtx.dialogRole }}
            >
                {children}
            </JSXEl>
        )
    }
)

Modal.Content = (
    ({
        children,
        as: _as = 'div',
        ...props
    }) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const modalCtx = tryUseRef(ModalContext)

        const ref = React.useRef(null)

        useClickaway(ref, () => modalCtx.refModal.current, {
            clickAway: () => {
                if (modalCtx.useStaticBackdrop) {
                    modalCtx.onClickStaticDropback();
                    return ;
                }
                if (!modalCtx.isOpen) return ;
                
                modalCtx.onToggle();
            }
        })

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