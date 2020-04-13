import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'
import { headingTags } from '@reboot-ui/common'
import { filterThemeName } from '@reboot-ui/common'

import Anchor from '@reboot-ui/icomponent-anchor'

interface CardContextType {
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
}

const CardContext = React.createContext<CardContextType>({})

function useCardContext (
    { borderTheme, theme }: CardContextType,
    { useContext = false } = {}
) {
    if (useContext) {
        let cardCtx
        try { cardCtx = React.useContext(CardContext) } catch (error) {}
        if (!borderTheme && cardCtx && cardCtx.borderTheme)
            borderTheme = cardCtx.borderTheme
        if (!theme && cardCtx && cardCtx.theme)
            theme = cardCtx.theme
    }

    borderTheme = filterThemeName(borderTheme)
    theme = filterThemeName(theme)

    return { borderTheme, theme}
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/cards
 */
const Card = ({
    children,
    as: _as = 'div',
    theme,
    borderTheme,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
}>) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    theme = filterThemeName(theme)
    borderTheme = filterThemeName(borderTheme)

    const ctxValue = { theme, borderTheme }

    return (
        <CardContext.Provider value={ctxValue}>
            <JSXEl
                {...props}
                className={rclassnames(props,
                    [
                        'card',
                    ],
                    theme && [
                        theme !== 'light' && 'text-white',
                        `bg-${theme}`,
                    ],
                    borderTheme && `border-${borderTheme}`
                )}
            >
                {children}
            </JSXEl>
        </CardContext.Provider>
    )
}

Card.Title = function ({
    children,
    sub = false,
    as: _as = sub ? 'h6' : 'h5',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    sub?: boolean
    as?: RebootUI.IPropAs<RebootUI.IPropAsTagHeadings>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: [...headingTags] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                !sub ? 'card-title' : 'card-subtitle',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Header = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
    as?: RebootUI.IPropAs<'div' | 'header' | RebootUI.IPropAsTagHeadings>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'header'].concat(headingTags) });

    const { theme, borderTheme } = useCardContext(props)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-header',
                theme && `text-${theme}`,
                borderTheme && `border-${borderTheme}`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Footer = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
    as?: RebootUI.IPropAs<'div' | 'footer'>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'fotter'] });

    const { theme, borderTheme } = useCardContext(props)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-footer',
                theme && `text-${theme}`,
                borderTheme && `border-${borderTheme}`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Body = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const { theme, borderTheme } = useCardContext(props)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-body',
                theme && `text-${theme}`,
                borderTheme && `border-${borderTheme}`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Image = function ({
    children,
    as: _as = 'img',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'img' | 'svg'>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['img', 'svg'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-img-top',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.ImageOverlay = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-img-overlay',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Text = function ({
    children,
    as: _as = 'p',
    ...props
}: RebootUI.IComponentPropsWithChildren<{}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-text',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Link = function ({
    children,
    sub = false,
    as: _as = 'a',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    sub?: boolean
    as?: RebootUI.IPropAs<'a'>
}>) {
    if (_as === 'a')
        _as = Anchor as any
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['a'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-link',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Group = function ({
    children,
    as: _as = 'div',
    deck = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    deck?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                deck ? 'card-deck' : 'card-group',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Columns = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'card-columns',
            ])}
        >
            {children}
        </JSXEl>
    )
}

Card.Typical = function ({
    children,
    title = '',
    subTitle = '',
    text = '',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    title?: string
    subTitle?: string
    text?: string
} & {
    theme?: RebootUI.ThemeType
    borderTheme?: RebootUI.ThemeType
}>) {
    const titleNode = title && typeof title === 'string' ? <Card.Title>{title}</Card.Title> : title
    const subTitleNode = subTitle && typeof subTitle === 'string' ? <Card.Title sub>{subTitle}</Card.Title> : subTitle
    const textNode = text && typeof text === 'string' ? <Card.Text>{text}</Card.Text> : text

    return (
        <Card
            {...props}
        >
            <Card.Body>
                {titleNode || null}
                {subTitleNode || null}
                {textNode || null}
                {children}
            </Card.Body>
        </Card>
    )
}

export default Card