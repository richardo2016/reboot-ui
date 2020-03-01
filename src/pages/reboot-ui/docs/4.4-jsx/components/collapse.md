---
layout: docs
title: Collapse
description: Toggle the visibility of content across your project with a few classes and our JavaScript plugins.
group: components
toc: true
---

## How it works

The collapse JavaScript plugin is used to show and hide content. Buttons or anchors are used as triggers that are mapped to specific elements you toggle. Collapsing an element will animate the `height` from its current value to `0`. Given how CSS handles animations, you cannot use `padding` on a `.collapse` element. Instead, use the class as an independent wrapping element.

{% include callout-info-prefersreducedmotion.md %}

## Mechanism

Click the buttons below to show and hide another element via class changes:

- `.collapse` hides content
- `.collapsing` is applied during transitions
- `.collapse.show` shows content

<!-- You can use a link with the `href` attribute, or a button with the `data-target` attribute. In both cases, the `data-toggle="collapse"` is required. -->

## Examples

### Controlled Collapse

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [collapse, setCollapse] = React.useState(true)

  return (
    <>
      <p>
        <Button
          href="javascript:void(0)"
          type="link"
          className="mr-1"
          aria-controls="collapseExample"
          onClick={() => {
            setCollapse(!collapse)
          }}
        >
          Link with href
        </Button>
        <Button
          type="primary"
          aria-controls="collapseExample"
          onClick={() => {
            setCollapse(!collapse)
          }}
        >
          Button with data-target
        </Button>
      </p>
      <Collapse collapse={collapse}>
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}


### Uncontrolled Collapse

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <p>
        <Button
          href="javascript:void(0)"
          type="link"
          id="uncontrolled-collapse-toggler"
          className="mr-1"
          aria-controls="collapseExample"
        >
          Link with href
        </Button>
      </p>
      <Collapse.Uncontrolled toggler="#uncontrolled-collapse-toggler">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse.Uncontrolled>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Multiple targets

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <p>
        <Button
          type="primary"
          __htmlAttributes={{ type: 'button' }}
          id={`uncontrolled-collapse-toggler${uuid}`}
          className="mr-1"
          aria-controls="collapseExample"
        >
          Toggle both elements
        </Button>
      </p>
      <div class="row">
        <div class="col">
          <Collapse.Uncontrolled toggler={`#uncontrolled-collapse-toggler${uuid}`}>
            <div class="card card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </Collapse.Uncontrolled>
        </div>
        <div class="col">
          <Collapse.Uncontrolled toggler={`#uncontrolled-collapse-toggler${uuid}`}>
            <div class="card card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </Collapse.Uncontrolled>
        </div>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Default Open

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <p>
        <Button
          type="primary"
          __htmlAttributes={{ type: 'button' }}
          id={`uncontrolled-collapse-toggler${uuid}`}
          className="mr-1"
          aria-controls="collapseExample"
        >
          Toggle Collapse default open
        </Button>
      </p>
      <Collapse.Uncontrolled defaultCollapsed={false} toggler={`#uncontrolled-collapse-toggler${uuid}`}>
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse.Uncontrolled>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Accordion example

Using the [card]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/card/) component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be sure to use `.accordion` as a wrapper.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState(1)

  return (
    <>
      <div class="accordion" id="accordionExample">
        <Collapse.Group activeKey={activeKey}>
          {[1, 2, 3].map(
            (_, idx) => {
              const counter = idx + 1
              return (
                <div
                  class="card"
                  key={`card-key${counter}`}
                >
                  <div
                    class="card-header"
                    onClick={() => {
                      setActiveKey(counter === activeKey ? null : counter)
                    }}
                  >
                    <h2 class="mb-0">
                      <button class="btn btn-link" type="button">Collapsible Group Item #{counter}</button>
                    </h2>
                  </div>
                  <Collapse collapse={(activeKey !== counter)}>
                    <div class="card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                  </Collapse>
                </div>
              )
            })
          }
        </Collapse.Group>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Accessibility

Be sure to add `aria-expanded` to the control element. This attribute explicitly conveys the current state of the collapsible element tied to the control to screen readers and similar assistive technologies. If the collapsible element is closed by default, the attribute on the control element should have a value of `aria-expanded="false"`. If you've set the collapsible element to be open by default using the `show` class, set `aria-expanded="true"` on the control instead. The plugin will automatically toggle this attribute on the control based on whether or not the collapsible element has been opened or closed (via JavaScript, or because the user triggered another control element also tied to the same collapsible element). If the control element's HTML element is not a button (e.g., an `<a>` or `<div>`), the attribute `role="button"` should be added to the element.

If your control element is targeting a single collapsible element – i.e. the `data-target` attribute is pointing to an `id` selector – you should add the `aria-controls` attribute to the control element, containing the `id` of the collapsible element. Modern screen readers and similar assistive technologies make use of this attribute to provide users with additional shortcuts to navigate directly to the collapsible element itself.

Note that Bootstrap's current implementation does not cover the various keyboard interactions described in the [WAI-ARIA Authoring Practices 1.1 accordion pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) - you will need to include these yourself with custom JavaScript.

## Usage

The collapse plugin utilizes a few classes to handle the heavy lifting:

- `.collapse` hides the content
- `.collapse.show` shows the content
- `.collapsing` is added when the transition starts, and removed when it finishes

These classes can be found in `_transitions.scss`.

### Via data attributes

Just add `data-toggle="collapse"` and a `data-target` to the element to automatically assign control of one or more collapsible elements. The `data-target` attribute accepts a CSS selector to apply the collapse to. Be sure to add the class `collapse` to the collapsible element. If you'd like it to default open, add the additional class `show`.

To add accordion-like group management to a collapsible area, add the data attribute `data-parent="#selector"`. Refer to the demo to see this in action.

### Via JavaScript

Enable manually with:

{% highlight js %}
$('.collapse').collapse()
{% endhighlight %}

### Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-parent=""`.

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>parent</td>
      <td>selector | jQuery object | DOM element </td>
      <td>false</td>
      <td>If parent is provided, then all collapsible elements under the specified parent will be closed when this collapsible item is shown. (similar to traditional accordion behavior - this is dependent on the <code>card</code> class). The attribute has to be set on the target collapsible area.</td>
    </tr>
    <tr>
      <td>toggle</td>
      <td>boolean</td>
      <td>true</td>
      <td>Toggles the collapsible element on invocation</td>
    </tr>
  </tbody>
</table>

### Methods

{% include callout-danger-async-methods.md %}

#### `.collapse(options)`

Activates your content as a collapsible element. Accepts an optional options `object`.

{% highlight js %}
$('#myCollapsible').collapse({
  toggle: false
})
{% endhighlight %}

#### `.collapse('toggle')`

Toggles a collapsible element to shown or hidden. **Returns to the caller before the collapsible element has actually been shown or hidden** (i.e. before the `shown.bs.collapse` or `hidden.bs.collapse` event occurs).

#### `.collapse('show')`

Shows a collapsible element. **Returns to the caller before the collapsible element has actually been shown** (i.e. before the `shown.bs.collapse` event occurs).

#### `.collapse('hide')`

Hides a collapsible element. **Returns to the caller before the collapsible element has actually been hidden** (i.e. before the `hidden.bs.collapse` event occurs).

#### `.collapse('dispose')`

Destroys an element's collapse.

### Events

Bootstrap's collapse class exposes a few events for hooking into collapse functionality.

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 150px;">Event Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>show.bs.collapse</td>
      <td>This event fires immediately when the <code>show</code> instance method is called.</td>
    </tr>
    <tr>
      <td>shown.bs.collapse</td>
      <td>This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).</td>
    </tr>
    <tr>
      <td>hide.bs.collapse</td>
      <td>This event is fired immediately when the <code>hide</code> method has been called.</td>
    </tr>
    <tr>
      <td>hidden.bs.collapse</td>
      <td>This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).</td>
    </tr>
  </tbody>
</table>

{% highlight js %}
$('#myCollapsible').on('hidden.bs.collapse', function () {
  // do something...
})
{% endhighlight %}
