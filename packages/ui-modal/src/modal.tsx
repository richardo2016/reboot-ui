import React from 'react'

import { Transition } from 'react-transition-group';

import {
    resolveJSXElement,
    RebootUI,
    rclassnames,
    tryUseContext,
    TransitionTimeouts,
    coerceInteger, useClickaway,
    arraify,
} from '@reboot-ui/common'

function toggleCls (
    target = document.body || document.documentElement,
    classname: string | string[],
    nextHas: boolean
) {
    arraify(classname)
        .filter(x => x && typeof x === 'string')
        .forEach(cls => {
            let _nextHas = nextHas
            if (_nextHas === undefined) {
                target.classList.toggle(cls)
                return ;
            }

            if (_nextHas) target.classList.add(cls)
            else target.classList.remove(cls)
        })
}

function noop() {}

type ModelContextType = {
    // arrowRef: React.MutableRefObject<>
    isOpen: boolean
    onToggle: () => void

    refModal: React.MutableRefObject<any>
    refBackdrop: React.MutableRefObject<any>
    useStaticBackdrop: boolean
    onClickStaticDropback: () => void
    dialogRole: 'document' | 'dialog',
    dialogSize?: RebootUI.BinarySizeType
    dialogScrollable: boolean
    dialogCentered: boolean
}

const ModalContext = React.createContext<ModelContextType>({} as ModelContextType)

const TRANSITION_STATE_CLASS = {
    entering: '',
    entered: 'show',
    exiting: '',
    exited: '',
    unmounted: '',
}

const TRANSITION_STATE_STYLE: Record<string, React.CSSProperties> = {
    entering: {display: 'block'},
    entered: {display: 'block'},
    exiting: {display: 'block'},
    unmounted: {},
}

function useClickingStaticBackdrop (): [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
] {
    const [clicking, setClicking] = React.useState(false)
    const timerRef = React.useRef<any>(null)
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
const Modal = function ({
    children,
    document: useDocumentMode = false,
    isOpen = useDocumentMode ? true : false,
    onToggle = noop,
    duration = TransitionTimeouts.Modal,
    dialogLess = false,
    contentLess = false,
    size: dialogSize,
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
}: RebootUI.IComponentPropsWithChildren<{
    document?: boolean
    isOpen?: boolean
    onToggle?: (isOpen: boolean) => void
    duration?: number
    dialogLess?: boolean
    contentLess?: boolean
    size?: RebootUI.BinarySizeType
    dialogRole?: ModelContextType['dialogRole']
    staticBackdrop?: boolean
    scrollable?: boolean
    centered?: boolean
}>) {
    dialogRole = dialogRole || (useDocumentMode ? 'document' : 'dialog')

    const [ clickingStaticBackdrop, setClickingStaticBackdrop ] = useClickingStaticBackdrop()

    const modalCtx: ModelContextType = {
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
            <Transition
                in={isOpen}
                timeout={{
                    enter: TransitionTimeouts.Fade,
                    exit: TransitionTimeouts.Fade + 100,
                }}
            >
                {state => {
                    if (state === 'exited' && !isOpen) return ;

                    return (
                        <div
                            role="dialog"
                            {...!isOpen && {
                                'aria-hidden': true
                            }}
                            {...{
                                tabindex: "-1"
                            }}
                            {...props}
                            className={rclassnames(props, [
                                'modal',
                                'fade',
                                TRANSITION_STATE_CLASS[state],
                                clickingStaticBackdrop && 'modal-static'
                            ])}
                            style={{
                                ...TRANSITION_STATE_STYLE[state],
                                ...props.style,
                            }}
                            ref={modalCtx.refModal}
                            
                        >
                            <DialogJSX><ContentJSX>{children}</ContentJSX></DialogJSX>
                        </div>
                    )
                }}
            </Transition>
            {!useDocumentMode && (
                <Transition
                    in={isOpen}
                    timeout={{
                        enter: TransitionTimeouts.Fade,
                        exit: TransitionTimeouts.Modal,
                    }}
                >
                    {state => {
                        if (state === 'exited' && !isOpen) return ;
                        
                        return (
                            <div
                                {...!isOpen && {
                                    'aria-hidden': true
                                }}
                                {...{
                                    tabindex: "-1"
                                }}
                                {...props}
                                className={rclassnames(props, [
                                    'modal-backdrop',
                                    'fade',
                                    TRANSITION_STATE_CLASS[state],
                                ])}
                                style={{
                                    ...!isOpen && { display: 'none' }
                                }}
                                ref={modalCtx.refBackdrop}
                            />
                        )
                    }}
                </Transition>
            )}
        </ModalContext.Provider>
    )
}


Modal.Dialog = function (
    {
        children,
        as: _as = 'div',
        scrollable,
        centered,
        size: dialogSize,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        scrollable?: boolean
        centered?: boolean
        size?: RebootUI.BinarySizeType | 'xl'
    }>
) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const modalCtx = tryUseContext(ModalContext)

    if (scrollable === undefined) scrollable = modalCtx.dialogScrollable
    if (centered === undefined) centered = modalCtx.dialogCentered

    dialogSize = dialogSize || modalCtx.dialogSize
    switch (dialogSize) {
        case 'sm':
        case 'lg':
        case 'xl':
            break
        default:
            dialogSize = undefined
            break
    }

    return (
        <JSXEl
            {...props}
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

Modal.Content = ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const modalCtx = tryUseContext(ModalContext)

    const ref = React.useRef(null)

    useClickaway(
        ref,
        () => modalCtx.refModal.current || document,
        {
            clickAway: () => {
                if (modalCtx.useStaticBackdrop) {
                    modalCtx.onClickStaticDropback();
                    return ;
                }
                if (!modalCtx.isOpen) return ;
                
                modalCtx.onToggle();
            }
        }
    )

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

Modal.Header = ({
    children,
    as: _as = 'div',
    title = children as any,
    closable = true,
    onToggle,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    title?: React.ReactNode
    closable?: boolean
    onToggle?: (nextVal: boolean) => void
}>) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const modalCtx = tryUseContext(ModalContext)
    const _onToggle = onToggle || modalCtx.onToggle || noop

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
                        _onToggle(modalCtx ? modalCtx.isOpen : false)
                    }}
                    type="button"
                    className="close"
                    aria-label="Close"
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
}: RebootUI.IComponentPropsWithChildren) => {
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
}: RebootUI.IComponentPropsWithChildren) => {
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
}: RebootUI.IComponentPropsWithChildren) => {
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