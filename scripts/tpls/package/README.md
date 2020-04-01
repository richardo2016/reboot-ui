## <%= pkg.fullpkgname %>

[![npm version](https://img.shields.io/npm/v/<%= pkg.fullpkgname %>.svg)](https://www.npmjs.org/package/<%= pkg.fullpkgname %>)
[![downloads](https://img.shields.io/npm/dm/<%= pkg.fullpkgname %>.svg)](https://www.npmjs.org/package/<%= pkg.fullpkgname %>)

<% if (pkgmeta.isInternal) { %>Internal package for @reboot-ui.
<% } else if (pkgmeta.isUIComponent) { %>UI component package for @reboot-ui.<% } %>

## Get started

```bash
npm i -S <%= pkg.fullpkgname %>
# or
yarn add <%= pkg.fullpkgname %>
```
<% if (pkgmeta.isUIComponent) { %>
## Style import

To import style of `<%= pkg.fullpkgname %>`, you can import style in javascript

```js
import "<%= pkg.fullpkgname %>/es/index.scss";
```

or

```scss
// add PWD/node_modules to your sass parser's includes

// for sass-loader + webpack, set up in `options.sassOptions.includePaths`,
// see https://github.com/webpack-contrib/sass-loader

// for rollup + sass-loader + rollup-plugin-postcss
// see https://www.npmjs.com/package/rollup-plugin-postcss
@import "<%= pkg.fullpkgname %>/es/index.scss";
```<% } %>
## LICENSE

ISC

Copyright (c) 2020-present, Richard
