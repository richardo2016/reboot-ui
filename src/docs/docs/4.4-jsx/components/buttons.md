---
layout: docs
title: Buttons
description: Use Bootstrap's custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
group: components
toc: true
---

## Examples

Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
        {site.data['theme-colors'].map(({ name: theme }) =>
          <>
            <Button class="mb-3" theme={theme}>
              {stringUtils.ucfirst(theme)}
            </Button>
            {' '}
          </>
        )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% include callout-warning-color-assistive-technologies.md %}

## Disable text wrapping

If you don't want the button text to wrap, you can add the `.text-nowrap` class to the button. In Sass, you can set `$btn-white-space: nowrap` to disable text wrapping for each button.

## Button tags

The `<Button />` uses `button` as JSXElement by default, you can also pass `a` to `as`, make it trigger in-page functionality (like collapsing content), rather than linking to new pages or sections within the current page, these links should be given a `role="button"` to appropriately convey their purpose to assistive technologies such as screen readers.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button as="a" href="#" class="mr-1" theme="primary" role="button">Link</Button>
      <Button class="mr-1" theme="primary" role="button" type='submit'>Button</Button>
      <Button as="input" class="mr-1" theme="primary" role="button" value="Input" type='button' />
      <Button as="input" class="mr-1" theme="primary" role="button" value="Submit" type='submit' />
      <Button as="input" class="mr-1" theme="primary" role="button" value="Reset" type='reset' />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Outline buttons

In need of a button, but not the hefty background colors they bring? Just set `outline` property as `true`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors'].map(({ name: theme }) =>
        <>
          <Button outline theme={theme}>
            {stringUtils.ucfirst(theme)}
          </Button>
          {' '}
        </>
      )}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Sizes

Fancy larger or smaller buttons? set `size` for additional sizes.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button type="button" size="lg" theme="primary">Large button</Button>{' '}
      <Button type="button" size="lg" theme="secondary">Large button</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button type="button" size="sm" theme="primary">Small button</Button>{' '}
      <Button type="button" size="sm" theme="secondary">Small button</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Create block level buttons—those that span the full width of a parent—by set `block`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button type="button" size="lg" block theme="primary">Block level button</Button>{' '}
      <Button type="button" size="lg" block theme="secondary">Block level button</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Active state

Buttons will appear pressed (with a darker background, darker border, and inset shadow) when active. **There's no need to add a class to `<button>`s as they use a pseudo-class**. However, you can still force the same active appearance with property `active={true}`  (and include the <code>aria-pressed="true"</code> attribute).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button as="a" size="lg" active theme="primary" aria-pressed="true">Primary link</Button>{' '}
      <Button as="a" size="lg" active theme="secondary" aria-pressed="true">Link</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Disabled state

Make buttons look inactive by adding the `disabled` boolean attribute to any `<button>` element.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button size="lg" active theme="primary" disabled>Primary button</Button>{' '}
      <Button size="lg" active theme="secondary" disabled>Button</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Disabled `<Button />` using the `<a>` element behave a bit different:

- `<a>`s don't support the `disabled` attribute, so RebootUI adds the `.disabled` class to make it visually appear disabled.
- Some future-friendly styles are included to disable all `pointer-events` on anchor buttons. In browsers which support that property, you won't see the disabled cursor at all.
- Disabled buttons include the `aria-disabled="true"` attribute to indicate the state of the element to assistive technologies.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button as="a" size="lg" theme="primary" disabled>Primary link</Button>{' '}
      <Button as="a" size="lg" theme="secondary" disabled>Link</Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% capture callout %}
##### Link functionality caveat

The `.disabled` class uses `pointer-events: none` to try to disable the link functionality of `<a>`s, but that CSS property is not yet standardized. In addition, even in browsers that do support `pointer-events: none`, keyboard navigation remains unaffected, meaning that sighted keyboard users and users of assistive technologies will still be able to activate these links. So to be safe, add a `tabindex="-1"` attribute on these links (to prevent them from receiving keyboard focus) and use custom JavaScript to disable their functionality.
{% endcapture %}
{% include callout.html content=callout type="warning" %}

## Button usage

Do more with buttons. Control button states or create groups of buttons for more components like toolbars.

### Toggle states

Toggle a button's `active` state.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [active, setActive] = React.useState(false)

  return (
    <>
      <Button
        theme="primary"
        active={active}
        onClick={() => setActive(!active)}
      >
        Single toggle ({active ? 'active' : 'inactive'})
      </Button>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Checkbox and radio buttons

Bootstrap's `.button` styles can be applied to other elements, such as `<label>`s, to provide checkbox or radio style button toggling. Add `data-toggle="buttons"` to a `.btn-group` containing those modified buttons to enable their toggling behavior via JavaScript and add `.btn-group-toggle` to style the `<input>`s within your buttons. **Note that you can create single input-powered buttons or groups of them.**

The checked state for these buttons is **only updated via `click` event** on the button. If you use another method to update the input—e.g., with `<input type="reset">` or by manually applying the input's `checked` property—you'll need to toggle `.active` on the `<label>` manually.

Note that pre-checked buttons require you to manually add the `.active` class to the input's `<label>`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button.Checkbox theme="secondary">
        Checked
      </Button.Checkbox>{' '}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonGroup toggle data-toggle="buttons">
        <Button as="label" active theme="secondary">
          <Radio name="options" id="option1" checked /> Active
        </Button>
        {' '}
        <Button as="label" theme="secondary">
          <Radio name="options" id="option2" /> Radio
        </Button>
        {' '}
        <Button as="label" theme="secondary">
          <Radio name="options" id="option3" /> Radio
        </Button>
        {' '}
      </ButtonGroup>
      
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## React API

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `theme` | theme type. | Enum: {{ site.rbtMdFragments.themeTypes }} |  |
| `size` | size of button group, affect `<Button />` in children. | Enum: <ul><li>lg</li><li>sm</li></ul> |  |
| `vertical` | whether using vertical style. | boolean | false  |
| `outline` | whether using outline style. | boolean | false  |
| `block` | whether using block style. | boolean | false  |
| `active` | whether active. | boolean | false  |
| `disabled` | whether disabled. | boolean | false  |
| `divider` | whether using divider. | boolean | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>