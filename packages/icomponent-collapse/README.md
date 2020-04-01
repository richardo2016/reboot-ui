## @reboot-ui/icomponent-collapse

[![npm version](https://img.shields.io/npm/v/@reboot-ui/icomponent-collapse.svg)](https://www.npmjs.org/package/@reboot-ui/icomponent-collapse)
[![downloads](https://img.shields.io/npm/dm/@reboot-ui/icomponent-collapse.svg)](https://www.npmjs.org/package/@reboot-ui/icomponent-collapse)

`@reboot-ui/icomponent-collapse` depends on:

- `react-transition-group`

it use `.collapse`/`.collapsing`/`.show` to control animation in each state of transition.

## Get started

```bash
npm i -S @reboot-ui/icomponent-collapse
# or
yarn add @reboot-ui/icomponent-collapse
```

## Usage

```jsx
import React from 'react'
import ICollapse from '@reboot-ui/icomponent-collapse'

const App = () => {
    const [ collapse, setCollapse ] = React.useState(false);

    return (
        <ICollapse
            collapse={collapse}
        >
            <button
                onClick={React.useCallback(() => {
                    setCollapse(!collapse)
                }, [collapse])}
            >
                Toggle
            </button>
        </ICollapse>
    )
}
```

## LICENSE

ISC

Copyright (c) 2020-present, Richard
