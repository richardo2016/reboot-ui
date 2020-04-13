import React from 'react';
import { RebootUI } from '@reboot-ui/common';
interface CardProps {
    theme?: RebootUI.ThemeType;
    borderTheme?: RebootUI.ThemeType;
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/cards
 */
declare const Card: {
    ({ children, as: _as, theme, borderTheme, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & CardProps>): JSX.Element;
    Title({ children, sub, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        sub?: boolean | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Header({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Footer({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Body({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
    }>): JSX.Element;
    Image({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    ImageOverlay({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }>): JSX.Element;
    Text({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }>): JSX.Element;
    Link({ children, sub, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        sub?: boolean | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Group({ children, as: _as, deck, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        deck?: boolean | undefined;
    }>): JSX.Element;
    Columns({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }>): JSX.Element;
    Typical({ children, title, subTitle, text, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        title?: string | undefined;
        subTitle?: string | undefined;
        text?: string | undefined;
    } & CardProps>): JSX.Element;
};
export default Card;