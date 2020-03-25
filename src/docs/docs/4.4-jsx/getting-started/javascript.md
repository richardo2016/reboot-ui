---
layout: docs
title: JavaScript
description: Bring RebootUI to life with our optional helpers built on JSX/React Hooks. Learn about each helpers.
group: getting-started
toc: true
---

## Individual or compiled

Using individual package `@reboot-ui/helper-*` / `@reboot-ui/icomponent-*`

## Dependencies

- [Popper.js](https://popper.js.org/)
- [react-transition-group](https://github.com/reactjs/react-transition-group)

## Common property: `as`

Nearly all RebootUI components are based on `@reboot-ui/icomponent-jsx`, which resolve `as` property to one valid JSXElement, such as string 'a', functional component or class component --- any

The value of `as` property for some components are limited. Like `ListGroup`, its `as` property can receive one value of `'ul'`, `'ol'` and `'a'`.

## Hooks

RebootUI provides some practical hooks.

### useClickaway
...

### useHoveraway
...

### useKeyPress
...

### usePagination
...

## Version numbers

## No special fallbacks when JavaScript is disabled

RebootUI's plugins don't fall back particularly gracefully when JavaScript is disabled. If you care about the user experience in this case, use [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) to explain the situation (and how to re-enable JavaScript) to your users, and/or add your own custom fallbacks.

{% capture callout %}
##### Third-party libraries

**Bootstrap does not officially support third-party JavaScript libraries** like Prototype or jQuery UI. Despite `.noConflict` and namespaced events, there may be compatibility problems that you need to fix on your own.
{% endcapture %}
{% include callout.html content=callout type="warning" %}