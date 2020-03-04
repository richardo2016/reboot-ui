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

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <p class="muted">Tight pants next level keffiyeh
        {' '} <Tooltip content="Default tooltip"><a href="javascript:;">you probably</a></Tooltip> {' '}
        haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american apparel
        {' '} <Tooltip content="Another tooltip"><a href="javascript:;">have a</a></Tooltip> {' '}
        terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's cleanse vegan chambray. A really ironic artisan
        {' '} <Tooltip content="Another one here too"><a href="javascript:;">whatever keytar</a></Tooltip> {' '}
         scenester farm-to-table banksy Austin
        {' '} <Tooltip content="The last tip!"><a href="javascript:;">twitter handle</a></Tooltip> {' '}
        freegan cred raw denim single-origin coffee viral.
      </p>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code class="tooltip-demo" %}

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
{% include mvvm-example.html mexample=mexample_with_code class="tooltip-demo" %}
