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
          theme="link"
          className="mr-1"
          aria-controls="collapseExample"
          onClick={() => {
            setCollapse(!collapse)
          }}
        >
          Link with href
        </Button>
        <Button
          theme="primary"
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}


### Uncontrolled Collapse

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <p>
        <Button
          theme="link"
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

#### Multiple targets

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <p>
        <Button
          theme="primary"
          type='button'
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

#### Default Open

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <p>
        <Button
          theme="primary"
          type='button'
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Accordion example

Using the [card]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/card/) component, you can extend the default collapse behavior to create an accordion. To properly achieve the accordion style, be sure to use `.accordion` as a wrapper.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState(1)

  return (
    <>
      <div class="accordion" id="accordionExample">
        {
          ([1, 2, 3].map(
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
            }
          ))
        }
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Accessibility

Be sure to add `aria-expanded` to the control element. This attribute explicitly conveys the current state of the collapsible element tied to the control to screen readers and similar assistive technologies. If the collapsible element is closed by default, the attribute on the control element should have a value of `aria-expanded="false"`. If you've set the collapsible element to be open by default using the `show` class, set `aria-expanded="true"` on the control instead. The plugin will automatically toggle this attribute on the control based on whether or not the collapsible element has been opened or closed (via JavaScript, or because the user triggered another control element also tied to the same collapsible element). If the control element's HTML element is not a button (e.g., an `<a>` or `<div>`), the attribute `role="button"` should be added to the element.

If your control element is targeting a single collapsible element – i.e. the `data-target` attribute is pointing to an `id` selector – you should add the `aria-controls` attribute to the control element, containing the `id` of the collapsible element. Modern screen readers and similar assistive technologies make use of this attribute to provide users with additional shortcuts to navigate directly to the collapsible element itself.

Note that Bootstrap's current implementation does not cover the various keyboard interactions described in the [WAI-ARIA Authoring Practices 1.1 accordion pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) - you will need to include these yourself with custom JavaScript.

## React API

### Sub Components

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description |
| --- | --- |
| `Collapse.Uncontrolled` | uncontrolled collapse, link controller by `toggler` property.  |
| `Collapse.Group` | collapse group widget |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `collapse` | whether collapse. | `boolean` | true  |
| `onEntering` | transition hook passed to `<Transition />`, see [react-transition-group:Transition] | `Function` | `noop`  |
| `onEntered` | transition hook passed to `<Transition />`, see [react-transition-group:Transition] | `Function` | `noop`  |
| `onExit` | transition hook passed to `<Transition />`, see [react-transition-group:Transition] | `Function` | `noop`  |
| `onExiting` | transition hook passed to `<Transition />`, see [react-transition-group:Transition] | `Function` | `noop`  |
| `onExited` | transition hook passed to `<Transition />`, see [react-transition-group:Transition] | `Function` | `noop`  |

[react-transition-group:Transition]:https://reactcommunity.org/react-transition-group/transition

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

<br />

### Properties of `<Collapse.Uncontrolled>`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `toggler` | selector for specify collapse's toggle element. <br /> **Warning**: if invalid selector passed, the collapse would be never toggled programmatically! | `string` | |
| `defaultCollapsed` | if carousel default collapsed. | `string` | true |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

</div>

### Properties of `<Collapse.Group>`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `activeKey` | key to specify active child collapse item. Control child collapse item by setting it `key` property | `string` \| `number` | |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

</div>