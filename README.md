# juice-starter

one lightweight javascript library starter based on rollup.

> "Write As React in Hooks & Component, but DIFFER in entry file."

## Get Started
install all dependencies.

```bash
npm i
```

## Development

```bash
# start demo with development, view serve url in terminal, such as http://localhost:5000
npm run dev

# open http://localhost:5000/demo/react.html view sample about react
# open http://localhost:5000/demo/preact.html view sample about preact
```

```bash
# build
npm run build
```

## MVVM framework supported

Now support

- react >= 16.8.x
- preact >= 10.x

### Page

View [demo/react.html](./demo/react.html)

```html
<script src="__PUBLIC_PATH__/pages/react/cdn/react.production.min.js"></script>
<script src="__PUBLIC_PATH__/pages/react/cdn/react-dom.production.min.js"></script>

<script src='__PUBLIC_PATH__/pages/react/index.js'></script>
```

### SDK

View [demo/preact.html](./demo/preact.html)

```html
<script src='__PUBLIC_PATH__/sdks/preact/index.js'></script>
```