---
layout: docs
title: Dropdowns
description: Toggle contextual overlays for displaying lists of links.
group: components
toc: true
---

## Overview

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They're toggled **by clicking, not by hovering**; this is [an intentional design decision](http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

Dropdowns are built on a third party library, [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection. Popper.js isn't used to position dropdowns in navbars though as dynamic positioning isn't required.

## Accessibility

The [<abbr title="Web Accessibility Initiative">WAI</abbr> <abbr title="Accessible Rich Internet Applications">ARIA</abbr>](https://www.w3.org/TR/wai-aria/) standard defines an actual [`role="menu"` widget](https://www.w3.org/WAI/PF/aria/roles#menu), but this is specific to application-like menus which trigger actions or functions. <abbr title="Accessible Rich Internet Applications">ARIA</abbr> menus can only contain menu items, checkbox menu items, radio button menu items, radio button groups, and sub-menus.

Bootstrap's dropdowns, on the other hand, are designed to be generic and applicable to a variety of situations and markup structures. For instance, it is possible to create dropdowns that contain additional inputs and form controls, such as search fields or login forms. For this reason, Bootstrap does not expect (nor automatically add) any of the `role` and `aria-` attributes required for true <abbr title="Accessible Rich Internet Applications">ARIA</abbr> menus. Authors will have to include these more specific attributes themselves.

<!-- However, Bootstrap does add built-in support for most standard keyboard menu interactions, such as the ability to move through individual `.dropdown-item` elements using the cursor keys and close the menu with the <kbd>ESC</kbd> key. -->

## Examples

`<Dropdown />` wraps the dropdown's toggle and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`, such as `<ButtonGroup />`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

### Single button

Any single `<Button />` can be turned into a dropdown toggle. Here's how it works:

{% reboot_mvvm reboot_mvvm_ctx %}
const Sample = () => {
  return (
    <>
      <Dropdown
        overlay={(
          <Dropdown.Menu aria-labelledby="dropdownMenuButton">
            <Dropdown.LinkItem>Action</Dropdown.LinkItem>
            <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
            <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
          </Dropdown.Menu>
        )}
      >
        <Dropdown.Toggle theme="secondary" class="dropdown-toggle" id="dropdownMenuButton">
          Dropdown button
        </Dropdown.Toggle>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=reboot_mvvm_ctx %}

And set `link` to use `<a>` elements:

{% reboot_mvvm reboot_mvvm_ctx %}
const Sample = () => {
  return (
    <>
      <Dropdown
        overlay={(
          <Dropdown.Menu aria-labelledby="dropdownMenuLink">
            <Dropdown.LinkItem>Action</Dropdown.LinkItem>
            <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
            <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
          </Dropdown.Menu>
        )}
      >
        <Dropdown.Toggle link theme="secondary" class="dropdown-toggle" id="dropdownMenuLink">
          Dropdown link
        </Dropdown.Toggle>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=reboot_mvvm_ctx %}

The best part is you can do this with any button variant, too:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const themes = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  return (
    <>
      {themes.map(theme =>
        <>
          <Dropdown
            as={ButtonGroup}
            overlay={(
              <Dropdown.Menu>
                <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                <Dropdown.Item divider />
                <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
              </Dropdown.Menu>
            )}
          >
            <Dropdown.Toggle theme={theme}>
              {stringUtils.ucfirst(theme)}
            </Dropdown.Toggle>
          </Dropdown>
          {' '}
        </>
      )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Split button

Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` for proper spacing around the dropdown caret.

We use this extra class to reduce the horizontal `padding` on either side of the caret by 25% and remove the `margin-left` that's added for regular button dropdowns. Those extra changes keep the caret centered in the split button and provide a more appropriately sized hit area next to the main button.


{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const themes = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  return (
    <>
      {themes.map(theme =>
        <>
          <Dropdown
            overlay={(
              <Dropdown.Menu>
                <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                <Dropdown.Item divider />
                <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
              </Dropdown.Menu>
            )}
          >
            <Dropdown.SplitButtonToggle split theme={theme}>
              {stringUtils.ucfirst(theme)}
              <span class="sr-only">Toggle Dropdown</span>
            </Dropdown.SplitButtonToggle>
          </Dropdown>
          {' '}
        </>
      )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Sizing

Button dropdowns work with buttons of all sizes, including default and split dropdown buttons.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {[
        [
          {split: false, size: 'lg', labelPrefix: `Large`},
          {split: true, size: 'lg', labelPrefix: `Large`},
        ],
        [
          {split: false, size: 'sm', labelPrefix: `Small`},
          {split: true, size: 'sm', labelPrefix: `Small`},
        ],
      ].map((samples) => {
        return (
          <div class="btn-toolbar" role="toolbar">
            {
              samples.map(({ split, size, labelPrefix }, idx) => {
                const ToggleEl = split ? Dropdown.SplitButtonToggle : Dropdown.Toggle
                return (
                  <Dropdown
                    as={ButtonGroup}
                    class={classnames([idx > 0 && 'ml-2'])}
                    overlay={(
                      <Dropdown.Menu>
                        <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                        <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                        <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                        <Dropdown.Item divider />
                        <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
                      </Dropdown.Menu>
                    )}
                  >
                    <ToggleEl
                      theme="secondary"
                      size={size}
                    >
                      {split ? `${labelPrefix} split button` : `${labelPrefix} button`}
                      <span class="sr-only">Toggle Dropdown</span>
                    </ToggleEl>
                  </Dropdown>
                )
              })
            }
          </div>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Directions

Trigger dropdown menus above elements by setting `placement="top"`, or other position relative the trigger element:

### Placement

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {[
        [
          {split: false, placement: 'top-start', className: 'dropup', label: `Dropup start`},
          {split: true, placement: 'top-start', className: 'dropup', label: `Split dropup start`},
        ],
        [
          {split: false, placement: 'top', className: 'dropup', label: `Dropup`},
          {split: true, placement: 'top', className: 'dropup', label: `Split dropup`},
        ],
        [
          {split: false, placement: 'top-end', label: `Dropup end`},
          {split: true, placement: 'top-end', label: `Split dropup end`},
        ],
        [
          {split: false, placement: 'left-start', label: `Dropleft start`},
          {split: true, placement: 'left-start', label: `Split dropleft start`},
        ],
        [
          {split: false, placement: 'left', label: `Dropleft`},
          {split: true, placement: 'left', label: `Split dropleft`},
        ],
        [
          {split: false, placement: 'left-end', label: `Dropleft end`},
          {split: true, placement: 'left-end', label: `Split dropleft end`},
        ],
        [
          {split: false, placement: 'right-start', label: `Dropright start`},
          {split: true, placement: 'right-start', label: `Split dropright start`},
        ],
        [
          {split: false, placement: 'right', label: `Dropright`},
          {split: true, placement: 'right', label: `Split dropright`},
        ],
        [
          {split: false, placement: 'right-end', label: `Dropright end`},
          {split: true, placement: 'right-end', label: `Split dropright end`},
        ],
        [
          {split: false, placement: 'bottom-start', label: `Dropbottom start`},
          {split: true, placement: 'bottom-start', label: `Split dropbottom start`},
        ],
        [
          {split: false, placement: 'bottom', label: `Dropbottom`},
          {split: true, placement: 'bottom', label: `Split dropbottom`},
        ],
        [
          {split: false, placement: 'bottom-end', label: `Dropbottom end`},
          {split: true, placement: 'bottom-end', label: `Split dropbottom end`},
        ],
      ].map(samples => {
        return (
          <div class="btn-toolbar" role="toolbar">
            {samples.map(({ split, placement, className, label }, idx) => {
              const ToggleEl = split ? Dropdown.SplitButtonToggle : Dropdown.Toggle
              return (
                <Dropdown
                  placement={placement}
                  as={ButtonGroup}
                  class={classnames([idx > 0 && 'ml-2'])}
                  overlay={(
                    <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                      <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                      <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                      <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                      <Dropdown.Item divider />
                      <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
                    </Dropdown.Menu>
                  )}
                >
                  <ToggleEl
                    theme="secondary"
                  >
                    <>
                      {!split && placement.indexOf('left') > -1 ? ' ' : ''}
                      {label}
                      {!split && placement.indexOf('right') > -1 ? ' ' : ''}
                    </>
                    <span class="sr-only">Toggle Dropdown</span>
                  </ToggleEl>
                </Dropdown>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Active

use `active` in `Dropdown.Item` in the dropdown to **style them as active**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.LinkItem>Regular link</Dropdown.LinkItem>
        <Dropdown.LinkItem active>Active link</Dropdown.LinkItem>
        <Dropdown.LinkItem>Another link</Dropdown.LinkItem>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Disabled

use `disabled` in `Dropdown.Item` in the dropdown to **style them as disabled**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.LinkItem>Regular link</Dropdown.LinkItem>
        <Dropdown.LinkItem disabled>Active link</Dropdown.LinkItem>
        <Dropdown.LinkItem>Another link</Dropdown.LinkItem>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Menu alignment

By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent. Add `.dropdown-menu-right` to a `.dropdown-menu` to right align the dropdown menu.

{% capture callout %}
**Heads up!** Dropdowns are positioned thanks to Popper.js (except when they are contained in a navbar).
{% endcapture %}
{% include callout.html content=callout type="info" %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown
        overlay={(
          <Dropdown.Menu placement={'right'}>
            <Dropdown.Item as={Button} type="button">Action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Another action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        )}
      >
        <Button theme="secondary" class="dropdown-toggle">
          Right-aligned menu
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Responsive alignment(WIP)

If you want to use responsive alignment, disable dynamic positioning by adding the `data-display="static"` attribute and use the responsive variation classes.

To align **right** the dropdown menu with the given breakpoint or larger, add `.dropdown-menu{-sm|-md|-lg|-xl}-right`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown
        overlay={(
          <Dropdown.Menu placement={{lg: 'right'}}>
            <Dropdown.Item as={Button} type="button">Action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Another action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        )}
      >
        <Button theme="secondary" class="dropdown-toggle">
          Left-aligned but right aligned when large screen
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

To align **left** the dropdown menu with the given breakpoint or larger, add `.dropdown-menu-right` and `.dropdown-menu{-sm|-md|-lg|-xl}-left`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown
        overlay={(
          <Dropdown.Menu placement={{direction: 'right', lg: 'left'}}>
            <Dropdown.Item as={Button} type="button">Action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Another action</Dropdown.Item>
            <Dropdown.Item as={Button} type="button">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        )}
      >
        <Button theme="secondary" class="dropdown-toggle">
          Right-aligned but left aligned when large screen
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Note that you don't need to add a `data-display="static"` attribute to dropdown buttons in navbars, since Popper.js isn't used in navbars.

## Menu content

### Headers

Add a header to label sections of actions in any dropdown menu.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item header>Dropdown header</Dropdown.Item>
        <Dropdown.LinkItem>Action</Dropdown.LinkItem>
        <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Dividers

Separate groups of related menu items with a divider.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.LinkItem>Action</Dropdown.LinkItem>
        <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
        <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
        <Dropdown.Item divider />
        <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Text

Place any freeform text within a dropdown menu with text and use [spacing utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/). Note that you'll likely need additional sizing styles to constrain the menu width.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu class="p-4 text-muted" style={{ maxWidth: 200 }}>
        <p>
          Some example text that's free-flowing within the dropdown menu.
        </p>
        <p class="mb-0">
          And this is more example text.
        </p>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Forms

Put a form within a dropdown menu, or make it into a dropdown menu, and use [margin or padding utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) to give it the negative space you require.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Dropdown.Menu>
        <Form class="px-4 py-3">
          <Form.Group>
            <Form.Input
              id={`exampleDropdownFormEmail1${uuid}`}
              label="Email address"
              type="email"
              placeholder="email@example.com"
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              id={`exampleDropdownFormPassword1${uuid}`}
              label="Password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group>
            <div class="form-check">
              <Form.Checkbox
                id={`dropdownCheck${uuid}`}
                label="Remember me"
              />
            </div>
          </Form.Group>
          <Button type="submit" theme="primary">Sign in</Button>
        </Form>
        <Dropdown.Item divider />
        <Dropdown.LinkItem>New around here? Sign up</Dropdown.LinkItem>
        <Dropdown.LinkItem>Forgot password?</Dropdown.LinkItem>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Dropdown.Menu as={Form} class="p-4">
        <Form.Group>
          <Form.Input
            id={`exampleDropdownFormEmail2${uuid}`}
            label="Email address"
            type="email"
            placeholder="email@example.com"
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            id={`exampleDropdownFormPassword2${uuid}`}
            label="Password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group>
          <div class="form-check">
            <Form.Checkbox
              id={`dropdownCheck2${uuid}`}
              label="Remember me"
            />
          </div>
        </Form.Group>
        <Button type="submit" theme="primary">Sign in</Button>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Dropdown options

Use `popperOptions` to customize the location of the dropdown.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="d-flex">
        <Dropdown
          overlay={(
            <Dropdown.Menu>
              <Dropdown.LinkItem>Action</Dropdown.LinkItem>
              <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
              <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
            </Dropdown.Menu>
          )}
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [10, 20],
                }
              }
            ]
          }}
        >
          <Dropdown.Toggle theme="secondary">
            Offset
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## React API

### Sub Components

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description |
| --- | --- |
| `Dropdown.Menu` | dropdown menu widget |
| `Dropdown.Item` | dropdown menu item element |
| `Dropdown.LinkItem` | dropdown menu link item(anchor) element |
| `Dropdown.Toggle` | dropdown menu toggle element |
| `Dropdown.SplitButtonToggle` | dropdown split-style toggle button element |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `disabled` | whether disable dropdown. | `boolean` | false |
| `placement` | popper over position relative reference. See [popper.js] | Enum: {{ site.rbtMdFragments.popperPlacements }} | 'bottom-start' |
| `popperOptions` | popper options passed to popper.js. See [popper.js] | `object` | {} |
| `overlay` | overlay element to popup. <br /> **NOTICE**: you can also use `Dropdown.Menu` in Dropdown's `children` rather than set this property. | `React.ReactElement` | null |


[popper.js]:https://popper.js.org/docs/v2/
{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

### Properties of `<Dropdown.Menu>`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `placement` | [WIP] specify menu's placement against responsive breakpoint. | `string` \| `object` | |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

</div>

### Properties of `<Dropdown.Item>`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `divider` | whether a divider item. | `boolean` | false |
| `header` | whether a header item. | `boolean` | false |
| `active` | whether active. invalid for divider-item or header-item. | `boolean` | false |
| `disabled` | whether disabled. invalid for divider-item or header-item. | `boolean` | false |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

</div>

### Properties of `<Dropdown.LinkItem>`

Same with `<Dropdown.Item>`, with `as` property always set `a`.