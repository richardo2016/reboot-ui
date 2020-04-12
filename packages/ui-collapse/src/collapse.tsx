import React from 'react'

import { isReactTypeOf, parseChildrenProp, rclassnames } from '@reboot-ui/common'
import { useSelectorsListener } from '@reboot-ui/common'
import { useDefaultValue } from '@reboot-ui/common'
import { resolveJSXElement } from '@reboot-ui/common';
import CollapseProto from '@reboot-ui/icomponent-collapse'

const Collapse = React.forwardRef(CollapseProto)

Collapse.Uncontrolled = /* React.forwardRef */(
    ({
        toggler: togglerSelector,
        defaultCollapsed = true,
        ...props
    }) => {
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
}) {
    const JSXEl = resolveJSXElement(_as, { default: null, /* allowedHTMLTags: ['div'] */ });

    const context = React.createContext({ activeKey })

    const { isFragment, childNodeList } = parseChildrenProp(childEles)
    
    const getAllPanels = () => {
        const children = childNodeList
            .map((panel, idx) => {
                if (!panel) return null;

                if (typeof panel === 'function')
                    return panel({ activeKey, context }) || null

                if (isReactTypeOf(panel, Collapse))
                    return panel

                let nextCloneProps
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

        return isFragment ? React.cloneElement(childEles, { children }) : children
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