---
layout: docs
title: Button group
description: Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.
group: components
toc: true
---

## Basic example

Wrap a series of `<Button />` in `<ButtonGroup />`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button theme="secondary">Left</Button>
        <Button theme="secondary">Middle</Button>
        <Button theme="secondary">Right</Button>
      </ButtonGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% capture callout %}
##### Ensure correct `role` and provide a label

In order for assistive technologies (such as screen readers) to convey that a series of buttons is grouped, an appropriate `role` attribute needs to be provided. For button groups, this would be `role="group"`, while toolbars should have a `role="toolbar"`.

In addition, groups and toolbars should be given an explicit label, as most assistive technologies will otherwise not announce them, despite the presence of the correct role attribute. In the examples provided here, we use `aria-label`, but alternatives such as `aria-labelledby` can also be used.
{% endcapture %}
{% include callout.html content=callout type="warning" %}

## Button toolbar

Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup class="mr-2" aria-label="First group">
          <Button theme="secondary">1</Button>
          <Button theme="secondary">2</Button>
          <Button theme="secondary">3</Button>
          <Button theme="secondary">4</Button>
        </ButtonGroup>
        <ButtonGroup class="mr-2" aria-label="Second group">
          <Button theme="secondary">5</Button>
          <Button theme="secondary">6</Button>
          <Button theme="secondary">7</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Third group">
          <Button theme="secondary">8</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Feel free to mix input groups with button groups in your toolbars. Similar to the example above, you'll likely need some utilities though to space things properly.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonToolbar class="mb-3" aria-label="Toolbar with button groups">
        <ButtonGroup class="mr-2" aria-label="First group">
          <Button theme="secondary">1</Button>
          <Button theme="secondary">2</Button>
          <Button theme="secondary">3</Button>
          <Button theme="secondary">4</Button>
        </ButtonGroup>
        <InputGroup prepend="@">
          <Input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon" />
        </InputGroup>
      </ButtonToolbar>
      <ButtonToolbar class="justify-content-between" aria-label="Toolbar with button groups">
        <ButtonGroup class="mr-2" aria-label="First group">
          <Button theme="secondary">1</Button>
          <Button theme="secondary">2</Button>
          <Button theme="secondary">3</Button>
          <Button theme="secondary">4</Button>
        </ButtonGroup>
        <InputGroup prepend="@">
          <Input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
        </InputGroup>
      </ButtonToolbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Sizing

Instead of applying button sizing classes to every button in a group, just add `.btn-group-*` to each `.btn-group`, including each one when nesting multiple groups.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonGroup size="lg" aria-label="Large button group">
        <Button theme="secondary">Left</Button>
        <Button theme="secondary">Middle</Button>
        <Button theme="secondary">Right</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup aria-label="Default button group">
        <Button theme="secondary">Left</Button>
        <Button theme="secondary">Middle</Button>
        <Button theme="secondary">Right</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup size="sm" aria-label="Small button group">
        <Button theme="secondary">Left</Button>
        <Button theme="secondary">Middle</Button>
        <Button theme="secondary">Right</Button>
      </ButtonGroup>
      <br />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Nesting

Place a `.btn-group` within another `.btn-group` when you want dropdown menus mixed with a series of buttons.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonGroup aria-label="Button group with nested dropdown">
        <Button theme="secondary">1</Button>
        <Button theme="secondary">2</Button>
        <Dropdown noWrap>
          <Dropdown.Toggle
            id="btnGroupDrop1"
            as={ButtonGroup}
            theme="secondary"
          >
            Dropdown
          </Dropdown.Toggle>
          <Dropdown.Menu aria-labelledby="btnGroupDrop1">
            <Dropdown.Item as="a" href="#">Dropdown link</Dropdown.Item>
            <Dropdown.Item as="a" href="#">Dropdown link</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Vertical variation

Make a set of buttons appear vertically stacked rather than horizontally. **Split button dropdowns are not supported here.**

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ButtonGroup vertical aria-label="Vertical button group">
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
      </ButtonGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const getDropdown = (idx) => {
    return (
      <Dropdown noWrap>
        <Dropdown.Toggle
          id={`btnGroupVerticalDrop${idx}`}
          as={ButtonGroup}
          theme="secondary"
        >
          Dropdown
        </Dropdown.Toggle>
        <Dropdown.Menu aria-labelledby={`btnGroupVerticalDrop${idx}`}>
          <Dropdown.Item as="a" href="#">Dropdown link</Dropdown.Item>
          <Dropdown.Item as="a" href="#">Dropdown link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return (
    <>
      <ButtonGroup vertical aria-label="Vertical button group">
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        {getDropdown(1)}
        <Button theme="secondary">Button</Button>
        <Button theme="secondary">Button</Button>
        {getDropdown(2)}
        {getDropdown(3)}
        {getDropdown(4)}
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
| `size` | size of button group, affect `<Button />` in children. | Enum: <ul><li>lg</li><li>sm</li></ul> |  |
| `vertical` | whether using vertical style. | boolean | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>