---
layout: docs
title: Popovers
description: Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.
group: components
toc: true
---

## Overview

Things to know when using the popover plugin:

- Popovers rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning. You must include [popper.min.js]({{ site.cdn.popper }}) before bootstrap.js or use `bootstrap.bundle.min.js` / `bootstrap.bundle.js` which contains Popper.js in order for popovers to work!
- Popovers require the [tooltip plugin]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/tooltips/) as a dependency.
- If you're building our JavaScript from source, it [requires `util.js`]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/javascript/#util).
- Popovers are opt-in for performance reasons, so **you must initialize them yourself**.
- Zero-length `title` and `content` values will never show a popover.
- Specify `container: 'body'` to avoid rendering problems in more complex components (like our input groups, button groups, etc).
- Triggering popovers on hidden elements will not work.
- Popovers for `.disabled` or `disabled` elements must be triggered on a wrapper element.
- When triggered from anchors that wrap across multiple lines, popovers will be centered between the anchors' overall width. Use `.text-nowrap` on your `<a>`s to avoid this behavior.
- Popovers must be hidden before their corresponding elements have been removed from the DOM.
- Popovers can be triggered thanks to an element inside a shadow DOM.

{% include callout-info-prefersreducedmotion.md %}

Keep reading to see how popovers work with some examples.

## Example

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Popover placement="right">
        <Button size="lg" type="danger">Click to toggle popover</Button>
        <Popover.Overlay>
          <Popover.Header>
            Popover title
          </Popover.Header>
          <Popover.Body>
            And here's some amazing content. It's very engaging. Right?
          </Popover.Body>
        </Popover.Overlay>
      </Popover>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Four directions

Four options are available: top, right, bottom, and left aligned.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const directions = [ 'top', 'right', 'bottom', 'left' ]
  return (
    <>
      <div class="bd-example-popovers d-flex justify-content-between">
        {directions.map(dir => {
          return (
            <Popover placement={dir}>
              <Button type="secondary">Popover on {dir}</Button>
              <Popover.Overlay>
                <Popover.Body>
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                </Popover.Body>
              </Popover.Overlay>
            </Popover>
          )
        })}
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code class="popover-demo" %}

### Dismiss only on clicking trigger

Use the `focus` trigger to dismiss popovers on the user's next click of a different element than the toggle element.

{% capture callout %}
#### Specific markup required for dismiss-on-next-click

For proper cross-browser and cross-platform behavior, you must use the `<a>` tag, _not_ the `<button>` tag, and you also must include a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attribute.
{% endcapture %}
{% include callout.html content=callout type="danger" %}


{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Popover placement="right" dismissOnClickAway={false}>
        <Button as="a" tabindex="0" size="lg" type="danger">Dismissible popover</Button>
        <Popover.Overlay>
          <Popover.Header>
            Dismissible popover
          </Popover.Header>
          <Popover.Body>
            And here's some amazing content. It's very engaging. Right?
          </Popover.Body>
        </Popover.Overlay>
      </Popover>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Disabled Popover

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const configs = [
    { disabled: false },
    { disabled: true },
  ]
  return (
    <>
      <div class="bd-example-popovers">
        {configs.map(
          ({ disabled }) => {
            return (
              <Popover placement='right'>
                <Button class="mr-2" type="primary" disabled={disabled}>
                  {disabled ? 'Disabled' : 'Normal'} Popover
                </Button>
                <Popover.Overlay>
                  <Popover.Body>
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                  </Popover.Body>
                </Popover.Overlay>
              </Popover>
            )
          }
        )}
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code class="popover-demo" %}

### Show on hover trigger

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const configs = [
    { trigger: 'click', disabled: true, },
    { trigger: 'hover', disabled: true, },
    { trigger: 'click', disabled: false, },
    { trigger: 'hover', disabled: false, },
  ]
  return (
    <>
      <div class="bd-example-popovers">
        {configs.map(
          ({ trigger, disabled }) => {
            return (
              <Popover placement='right' trigger={trigger} disabled={disabled}>
                <Button class="mr-2" type="primary" disabled={disabled}>
                  Popup on {stringUtils.ucfirst(trigger)}
                </Button>
                <Popover.Overlay>
                  <Popover.Body>
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                  </Popover.Body>
                </Popover.Overlay>
              </Popover>
            )
          }
        )}
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code class="popover-demo" %}

