import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like';
import { headingTags } from '../common'
import { filterThemeName } from '../common-utils'

const CardContext = React.createContext({})

function useCardContext (
    { borderTheme, theme },
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
const Card = React.forwardRef((
    ({
        children,
        as: _as = 'div',
        theme = '',
        borderTheme = '',
        __htmlAttributes,
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        theme = filterThemeName(theme)
        borderTheme = filterThemeName(borderTheme)

        const ctxValue = { theme, borderTheme }

        return (
            <CardContext.Provider value={ctxValue}>
                <JSXEl
                    {...props}
                    {...__htmlAttributes}
                    ref={ref}
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
))

Card.Title = React.forwardRef((
    function ({
        children,
        sub = false,
        as: _as = sub ? 'h6' : 'h5',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: [...headingTags] });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    !sub ? 'card-title' : 'card-subtitle',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Header = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'header'].concat(headingTags) });

        const { theme, borderTheme } = useCardContext(props)

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
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
))

Card.Footer = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'fotter'] });

        const { theme, borderTheme } = useCardContext(props)

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
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
))

Card.Body = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const { theme, borderTheme } = useCardContext(props)

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
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
))

const DfltImage = ({
    children = 'Image cap',
    label = children,
    ...props
}) => {
    return (
        <svg
            class={rclassnames(props, [
            ])}
            focusable="false"
            role="img"
            width="100%"
            height="100"
            {...props}
            style={{
                textAnchor: 'middle',
                userSelect: 'none',
                ...props.style,
            }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-label={`Placeholder: ${label}`}
        >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">{label}</text>
        </svg>
    )
}

Card.Image = React.forwardRef((
    function ({
        children,
        as: _as = DfltImage,
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['img', 'svg'] });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'card-img-top',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.ImageOverlay = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'card-img-overlay',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Text = React.forwardRef((
    function ({
        children,
        as: _as = 'p',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'card-text',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Link = React.forwardRef((
    function ({
        children,
        sub = false,
        as: _as = 'a',
        href = 'javascript:;',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['a'] });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                href={href}
                ref={ref}
                className={rclassnames(props, [
                    'card-link',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Group = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        deck = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    deck ? 'card-deck' : 'card-group',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Columns = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'card-columns',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Card.Typical = React.forwardRef((
    function ({
        children,
        title = '',
        subTitle = '',
        text = '',
        ...props
    }, ref) {
        const titleNode = title && typeof title === 'string' ? <Card.Title>{title}</Card.Title> : title
        const subTitleNode = subTitle && typeof subTitle === 'string' ? <Card.Title sub>{subTitle}</Card.Title> : subTitle
        const textNode = text && typeof text === 'string' ? <Card.Text>{text}</Card.Text> : text

        return (
            <Card
                {...props}
                ref={ref}
            >
                <Card.Image as={DfltImage} />
                <Card.Body>
                    {titleNode || null}
                    {subTitleNode || null}
                    {textNode || null}
                    {children}
                </Card.Body>
            </Card>
        )
    }
))

export default Card