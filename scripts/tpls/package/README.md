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

## LICENSE

ISC

Copyright (c) 2020-present, Richard
