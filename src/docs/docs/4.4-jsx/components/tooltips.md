---
layout: docs
title: Tooltips
description: Documentation and examples for adding custom Bootstrap tooltips with CSS and JavaScript using CSS3 for animations and data-attributes for local title storage.
group: components
toc: true
---

## Overview

Things to know when using the tooltip plugin:

- Tooltips rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning. You must include [popper.min.js]({{ site.cdn.popper }}) before bootstrap.js or use `bootstrap.bundle.min.js` / `bootstrap.bundle.js` which contains Popper.js in order for tooltips to work!
- If you're building our JavaScript from source, it [requires `util.js`]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/javascript/#util).
- Tooltips are opt-in for performance reasons, so **you must initialize them yourself**.
- Tooltips with zero-length titles are never displayed.
- Specify `container: 'body'` to avoid rendering problems in more complex components (like our input groups, button groups, etc).
- Triggering tooltips on hidden elements will not work.
- Tooltips for `.disabled` or `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, tooltips will be centered. Use `white-space: nowrap;` on your `<a>`s to avoid this behavior.
- Tooltips must be hidden before their corresponding elements have been removed from the DOM.
- Tooltips can be triggered thanks to an element inside a shadow DOM.

{% include callout-info-prefersreducedmotion.md %}

Got all that? Great, let's see how they work with some examples.

## Examples

Hover over the links below to see tooltips:

Hover over the buttons below to see the four tooltips directions: top, right, bottom, and left.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <div class="bd-example-tooltips">
        <Tooltip placement="top" content="Tooltip on top"><Button theme="secondary">Tooltip on top</Button></Tooltip>{' '}
        <Tooltip placement="right" content="Tooltip on right"><Button theme="secondary">Tooltip on right</Button></Tooltip>{' '}
        <Tooltip placement="bottom" content="Tooltip on bottom"><Button theme="secondary">Tooltip on bottom</Button></Tooltip>{' '}
        <Tooltip placement="left" content="Tooltip on left"><Button theme="secondary">Tooltip on left</Button></Tooltip>{' '}
        <Tooltip content={<><em>Tooltip</em> <u>with</u> <b>JSX</b></>}><Button theme="secondary">Tooltip with JSX</Button></Tooltip>{' '}
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code class="tooltip-demo" %}
