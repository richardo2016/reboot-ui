import React from 'react'

import {
    isReactTypeOf,
    parseChildrenProp,
    rclassnames,
    useSelectorsListener,
    useDefaultValue,
    resolveJSXElement,
    RebootUI
} from '@reboot-ui/common'

import CollapseProto from '@reboot-ui/icomponent-collapse'

const Collapse = (props: RebootUI.IComponentPropsWithChildren<
    RebootUI.IGetReactLikeComponentProps<typeof CollapseProto>
>) => {
    const JSXElement = React.forwardRef(CollapseProto)
    return <JSXElement {...props} />
}

Collapse.Uncontrolled = /* React.forwardRef */(
    ({
        toggler: togglerSelector = document,
        defaultCollapsed = true,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        toggler: RebootUI.DOMSelector
        defaultCollapsed?: boolean
    }>) => {
        const [ collapse, setCollapse ] = React.useState(true)
        const initCollapsedRef = React.useRef(!!defaultCollapsed)
        useDefaultValue(!!defaultCollapsed, (defaultCollapsed) => {
            if (defaultCollapsed !== collapse)
                setCollapse(initCollapsedRef.current)
        })

        useSelectorsListener(
            togglerSelector,
            'click',
            () => setCollapse(!collapse),
            [ collapse ]
        )
    
        return (
            <Collapse
                {...props}
                collapse={collapse}
            />
        )
    }
)

Collapse.useGroup = () => {
    const groupContext = React.createContext({
        activeKey: null
    })

    return [groupContext]
}

/**
 * @see https://getbootstrap.com/docs/4.4/components/collapse/#supported-content
 */
Collapse.Group = function CollapseGroup ({
    children: childEles,
    as: _as = null,
    activeKey = null,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    activeKey: RebootUI.Nilable<string | number>
}>) {
    const JSXEl = resolveJSXElement(_as, { default: null, /* allowedHTMLTags: ['div'] */ });

    const context = React.createContext({ activeKey })

    const { isFragment, childNodeList } = parseChildrenProp(childEles as React.ReactElement)
    
    const getAllPanels = () => {
        let nextCloneProps: { collapse?: boolean } 
        const children = childNodeList
            .map((panel, idx) => {
                if (!panel) return null;

                if (typeof panel === 'function')
                    return panel({ activeKey, context }) || null

                if (isReactTypeOf(panel, Collapse))
                    return panel

                
                if (!panel.hasOwnProperty('key')) {
                    panel.key = `panel-${idx}`
                }

                if (activeKey === panel.key) {
                    nextCloneProps = nextCloneProps || {}
                    nextCloneProps.collapse = false
                }

                if (nextCloneProps)
                    panel = React.cloneElement(panel, nextCloneProps)

                return panel
            })

        return isFragment ? React.cloneElement(childEles as React.ReactElement, { children }) : children
    }

    if (!JSXEl) return getAllPanels()

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
            ])}
        >
            {getAllPanels()}
        </JSXEl>
    )
}

export default Collapse