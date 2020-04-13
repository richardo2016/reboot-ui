import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 *
 * @inner-content `.modal`
 * @inner-content `.modal-header`
 * @inner-content `.modal-body`
 */
declare const Modal: {
    ({ children, document: useDocumentMode, isOpen, onToggle, duration, dialogLess, contentLess, size: dialogSize, dialogRole, staticBackdrop, scrollable, centered, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        document?: boolean | undefined;
        isOpen?: boolean | undefined;
        onToggle?: ((isOpen: boolean) => void) | undefined;
        duration?: number | undefined;
        dialogLess?: boolean | undefined;
        contentLess?: boolean | undefined;
        size?: "lg" | "sm" | undefined;
        dialogRole?: "document" | "dialog" | undefined;
        staticBackdrop?: boolean | undefined;
        scrollable?: boolean | undefined;
        centered?: boolean | undefined;
    }>): JSX.Element;
    Dialog({ children, as: _as, scrollable, centered, size: dialogSize, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        scrollable?: boolean | undefined;
        centered?: boolean | undefined;
        size?: "lg" | "sm" | "xl" | undefined;
    }>): JSX.Element;
    Content({ children, as: _as, ...props }: any): JSX.Element;
    Header({ children, as: _as, title, closable, onToggle, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        title?: React.ReactNode;
        closable?: boolean | undefined;
        onToggle?: ((nextVal: boolean) => void) | undefined;
    }>): JSX.Element;
    Body({ children, as: _as, ...props }: any): JSX.Element;
    Footer({ children, as: _as, ...props }: any): JSX.Element;
    Title({ children, as: _as, ...props }: any): JSX.Element;
};
export default Modal;
