---
layout: docs
title: Dropdowns
description: Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.
group: components
toc: true
---

## Overview

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They're made interactive with the included Bootstrap dropdown JavaScript plugin. They're toggled by clicking, not by hovering; this is [an intentional design decision](http://markdotto.com/2012/02/27/bootstrap-explained-dropdowns/).

Dropdowns are built on a third party library, [Popper.js](https://popper.js.org/), which provides dynamic positioning and viewport detection. Be sure to include [popper.min.js]({{ site.cdn.popper }}) before Bootstrap's JavaScript or use `bootstrap.bundle.min.js` / `bootstrap.bundle.js` which contains Popper.js. Popper.js isn't used to position dropdowns in navbars though as dynamic positioning isn't required.

If you're building our JavaScript from source, it [requires `util.js`]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/javascript/#util).

## Accessibility

The [<abbr title="Web Accessibility Initiative">WAI</abbr> <abbr title="Accessible Rich Internet Applications">ARIA</abbr>](https://www.w3.org/TR/wai-aria/) standard defines an actual [`role="menu"` widget](https://www.w3.org/WAI/PF/aria/roles#menu), but this is specific to application-like menus which trigger actions or functions. <abbr title="Accessible Rich Internet Applications">ARIA</abbr> menus can only contain menu items, checkbox menu items, radio button menu items, radio button groups, and sub-menus.

Bootstrap's dropdowns, on the other hand, are designed to be generic and applicable to a variety of situations and markup structures. For instance, it is possible to create dropdowns that contain additional inputs and form controls, such as search fields or login forms. For this reason, Bootstrap does not expect (nor automatically add) any of the `role` and `aria-` attributes required for true <abbr title="Accessible Rich Internet Applications">ARIA</abbr> menus. Authors will have to include these more specific attributes themselves.

However, Bootstrap does add built-in support for most standard keyboard menu interactions, such as the ability to move through individual `.dropdown-item` elements using the cursor keys and close the menu with the <kbd>ESC</kbd> key.

## Examples

Wrap the dropdown's toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

### Single button

Any single `.btn` can be turned into a dropdown toggle with some markup changes. Here's how you can put them to work with either `<button>` elements:

{% reboot_mvvm mexample %}
const Sample = () => {
  return (
    <>
      <Dropdown
        as={null}
        overlay={(
          <Dropdown.Menu aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </Dropdown.Menu>
        )}
      >
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample %}

And with `<a>` elements:

{% reboot_mvvm mexample %}
const Sample = () => {
  return (
    <>
      <Dropdown
        as={null}
        overlay={(
          <Dropdown.Menu aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="javascript:void(0);">Action</a>
            <a class="dropdown-item" href="javascript:void(0);">Another action</a>
            <a class="dropdown-item" href="javascript:void(0);">Something else here</a>
          </Dropdown.Menu>
        )}
      >
        <a class="btn btn-secondary dropdown-toggle" href="javascript:void(0);" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample %}

The best part is you can do this with any button variant, too:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const types = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  return (
    <>
      {types.map(type =>
        <div class="btn-group mr-1">
          <Dropdown
            as={null}
            overlay={(
              <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="javascript:void(0)">Action</a>
                <a class="dropdown-item" href="javascript:void(0)">Another action</a>
                <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0)">Separated link</a>
              </Dropdown.Menu>
            )}
          >
            <Dropdown.Toggle type={type}>
              {stringUtils.ucfirst(type)}
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Split button

Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` for proper spacing around the dropdown caret.

We use this extra class to reduce the horizontal `padding` on either side of the caret by 25% and remove the `margin-left` that's added for regular button dropdowns. Those extra changes keep the caret centered in the split button and provide a more appropriately sized hit area next to the main button.


{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const types = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  return (
    <>
      {types.map(type =>
        <div class="btn-group mr-1">
          <Dropdown
            as={null}
            overlay={(
              <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="javascript:void(0)">Action</a>
                <a class="dropdown-item" href="javascript:void(0)">Another action</a>
                <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0)">Separated link</a>
              </Dropdown.Menu>
            )}
          >
            <Dropdown.Toggle
              split
              label={stringUtils.ucfirst(type)}
              type={type}
            >
              <span class="sr-only">Toggle Dropdown</span>
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

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
                return (
                  <Dropdown
                    as={null}
                    overlay={(
                      <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="javascript:void(0)">Action</a>
                        <a class="dropdown-item" href="javascript:void(0)">Another action</a>
                        <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="javascript:void(0)">Separated link</a>
                      </Dropdown.Menu>
                    )}
                  >
                    <Dropdown.Toggle
                      class={classnames([idx > 0 && 'ml-2'])}
                      type="secondary"
                      label={split ? `${labelPrefix} split button` : `${labelPrefix} button`}
                      size={size}
                      split={split}
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </Dropdown.Toggle>
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
{% include mvvm-example.html mexample=mexample_with_code %}

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
              return (
                <Dropdown
                  placement={placement}
                  as={null}
                  className="btn-group"
                  overlay={(
                    <Dropdown.Menu aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="javascript:void(0)">Action</a>
                      <a class="dropdown-item" href="javascript:void(0)">Another action</a>
                      <a class="dropdown-item" href="javascript:void(0)">Something else here</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="javascript:void(0)">Separated link</a>
                    </Dropdown.Menu>
                  )}
                >
                  <Dropdown.Toggle
                    class={classnames([idx > 0 && 'ml-2'])}
                    type="secondary"
                    label={label}
                    split={split}
                  >
                    <span class="sr-only">Toggle Dropdown</span>
                  </Dropdown.Toggle>
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
{% include mvvm-example.html mexample=mexample_with_code %}

### Active

use `active` in `Dropdown.Item` in the dropdown to **style them as active**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item as={'a'} href="javascript:;">Regular link</Dropdown.Item>
        <Dropdown.Item as={'a'} active href="javascript:;">Active link</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Another link</Dropdown.Item>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Disabled

use `disabled` in `Dropdown.Item` in the dropdown to **style them as disabled**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item as={'a'} href="javascript:;">Regular link</Dropdown.Item>
        <Dropdown.Item as={'a'} disabled href="javascript:;">Active link</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Another link</Dropdown.Item>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

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
        <Button type="secondary" class="dropdown-toggle">
          Right-aligned menu
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Responsive alignment

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
        <Button type="secondary" class="dropdown-toggle">
          Left-aligned but right aligned when large screen
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

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
        <Button type="secondary" class="dropdown-toggle">
          Right-aligned but left aligned when large screen
        </Button>
      </Dropdown>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

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
        <Dropdown.Item as={'a'} href="javascript:;">Action</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Another action</Dropdown.Item>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Dividers

Separate groups of related menu items with a divider.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item as={'a'} href="javascript:;">Action</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Another action</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Something else here</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item as={'a'} href="javascript:;">Separated link</Dropdown.Item>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

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
{% include mvvm-example.html mexample=mexample_with_code %}

### Forms

Put a form within a dropdown menu, or make it into a dropdown menu, and use [margin or padding utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) to give it the negative space you require.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Dropdown.Menu>
        <form class="px-4 py-3">
          <div class="form-group">
            <label for={`exampleDropdownFormEmail1${uuid}`}>Email address</label>
            <input type="email" class="form-control" id={`exampleDropdownFormEmail1${uuid}`} placeholder="email@example.com" />
          </div>
          <div class="form-group">
            <label for={`exampleDropdownFormPassword1${uuid}`}>Password</label>
            <input type="password" class="form-control" id={`exampleDropdownFormPassword1${uuid}`} placeholder="Password" />
          </div>
          <div class="form-group">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id={`dropdownCheck${uuid}`} />
              <label class="form-check-label" for={`dropdownCheck${uuid}`}>
                Remember me
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
        <Dropdown.Item divider />
        <Dropdown.Item as={'a'} href="javascript:;">New around here? Sign up</Dropdown.Item>
        <Dropdown.Item as={'a'} href="javascript:;">Forgot password?</Dropdown.Item>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Dropdown.Menu class="p-4">
        <div class="form-group">
          <label for={`exampleDropdownFormEmail2${uuid}`}>Email address</label>
          <input type="email" class="form-control" id={`exampleDropdownFormEmail2${uuid}`} placeholder="email@example.com" />
        </div>
        <div class="form-group">
          <label for={`exampleDropdownFormPassword2${uuid}`}>Password</label>
          <input type="password" class="form-control" id={`exampleDropdownFormPassword2${uuid}`} placeholder="Password" />
        </div>
        <div class="form-group">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id={`dropdownCheck2${uuid}`} />
            <label class="form-check-label" for={`dropdownCheck2${uuid}`}>
              Remember me
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </Dropdown.Menu>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Dropdown options

Use `poperOptions` to customize the location of the dropdown.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="d-flex">
        <Dropdown
          overlay={(
            <Dropdown.Menu>
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </Dropdown.Menu>
          )}
          poperOptions={{
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
          <Dropdown.Toggle type="secondary">
            Offset
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}