---
layout: docs
title: Input group
description: Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.
group: components
toc: true
---

## Basic example

Place one add-on or button on either side of an input. You may also place one on both sides of an input. Remember to place `<label>`s outside the input group.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup class="mb-3" prepend="@">
        <Input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby={`basic-addon1${uuid}`}
        />
      </InputGroup>
      <InputGroup class="mb-3" append="@example.com">
        <Input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby={`basic-addon2${uuid}`}
        />
      </InputGroup>
      <label for={`basic-url${uuid}`}>Your vanity URL</label>
      <InputGroup class="mb-3" prepend="https://example.com/users/">
        <Input
          type="text"
          class="form-control"
          id={`basic-url${uuid}`}
          aria-describedby={`basic-addon3${uuid}`}
        />
      </InputGroup>
      <InputGroup class="mb-3" prepend="$" append=".00">
        <Input
          type="text"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
        />
      </InputGroup>
      <InputGroup prepend="With textarea">
        <Input
          textarea
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
        />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Wrapping

Input groups wrap by default via `flex-wrap: wrap` in order to accommodate custom form field validation within an input group. You may disable this with `.flex-nowrap`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup class="flex-nowrap" prepend="@">
        <Input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Sizing

Add the relative form sizing classes to the `.input-group` itself and contents within will automatically resize—no need for repeating the form control size classes on each element.

**Sizing on the individual input group elements isn't supported.**

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        size="sm"
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <span class="input-group-text" id={`inputGroup-sizing-sm${uuid}`}>Small</span>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby={`inputGroup-sizing-sm${uuid}`}
        />
      </InputGroup>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <span class="input-group-text" id={`inputGroup-sizing-default${uuid}`}>Default</span>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby={`inputGroup-sizing-default${uuid}`}
        />
      </InputGroup>
      <InputGroup
        size="lg"
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <span class="input-group-text" id={`inputGroup-sizing-lg${uuid}`}>Large</span>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby={`inputGroup-sizing-lg${uuid}`}
        />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Checkboxes and radios

Place any checkbox or radio option within an input group's addon instead of text.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={(
          <Input type="checkbox" aria-label="Checkbox for following text input" />
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with checkbox" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        prepend={(
          <Input type="radio" aria-label="Radio button for following text input" />
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with radio" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Multiple inputs

While multiple `<input>`s are supported visually, validation styles are only available for input groups with a single `<input>`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend="First and last name"
      >
        <Input type="text" aria-label="First name" class="form-control" />
        <Input type="text" aria-label="Last name" class="form-control" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Multiple addons

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
      </InputGroup>
      <InputGroup
        appendNoWrap
        append={(
          <div class="input-group-append">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Button addons

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <Button outline type="secondary" id={`button-addon1${uuid}`}>Button</Button>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby={`button-addon1${uuid}`}
        />
      </InputGroup>
      <InputGroup
        class="mb-3"
        appendNoWrap
        append={(
          <div class="input-group-append">
            <Button outline type="secondary" id={`button-addon2${uuid}`}>Button</Button>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby={`button-addon2${uuid}`}
        />
      </InputGroup>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend" id={`button-addon3${uuid}`}>
            <Button outline type="secondary">Button</Button>
            <Button outline type="secondary">Button</Button>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with two button addons"
          aria-describedby={`button-addon3${uuid}`}
        />
      </InputGroup>
      <InputGroup
        class="mb-3"
        appendNoWrap
        append={(
          <div class="input-group-append" id={`button-addon4${uuid}`}>
            <Button outline type="secondary">Button</Button>
            <Button outline type="secondary">Button</Button>
          </div>
        )}
      >
        <Input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby={`button-addon4${uuid}`}
        />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Buttons with dropdowns

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <InputGroup.ButtonDropdown label="Dropdown" outline type="secondary">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href="javascript:;">Action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Another action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Something else here</Dropdown.Item>
                <Dropdown.Item role="separator" divider />
                <Dropdown.Item as="a" href="javascript:;">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </InputGroup.ButtonDropdown>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with dropdown button" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        appendNoWrap
        append={(
          <div class="input-group-append">
            <InputGroup.ButtonDropdown label="Dropdown" outline type="secondary">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href="javascript:;">Action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Another action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Something else here</Dropdown.Item>
                <Dropdown.Item role="separator" divider />
                <Dropdown.Item as="a" href="javascript:;">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </InputGroup.ButtonDropdown>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with dropdown button" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Segmented buttons

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prependNoWrap
        prepend={(
          <div class="input-group-prepend">
            <InputGroup.ButtonDropdown split="Action" outline type="secondary">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href="javascript:;">Action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Another action</Dropdown.Item>
                <Dropdown.Item as="a" href="javascript:;">Something else here</Dropdown.Item>
                <Dropdown.Item role="separator" divider />
                <Dropdown.Item as="a" href="javascript:;">Separated link</Dropdown.Item>
              </Dropdown.Menu>
            </InputGroup.ButtonDropdown>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with segmented dropdown button" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        appendNoWrap
        append={(
          <div class="input-group-append">
            <InputGroup.ButtonDropdown split="Action" outline type="secondary">
              <Dropdown.Menu>
                  <Dropdown.Item as="a" href="javascript:;">Action</Dropdown.Item>
                  <Dropdown.Item as="a" href="javascript:;">Another action</Dropdown.Item>
                  <Dropdown.Item as="a" href="javascript:;">Something else here</Dropdown.Item>
                  <Dropdown.Item role="separator" divider />
                  <Dropdown.Item as="a" href="javascript:;">Separated link</Dropdown.Item>
                </Dropdown.Menu>
            </InputGroup.ButtonDropdown>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with segmented dropdown button" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Custom forms

Input groups include support for custom selects and custom file inputs. Browser default versions of these are not supported.

### Custom select

{% capture example %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Options</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</div>

<div class="input-group mb-3">
  <select class="custom-select" id="inputGroupSelect02">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <div class="input-group-append">
    <label class="input-group-text" for="inputGroupSelect02">Options</label>
  </div>
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
  <select class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</div>

<div class="input-group">
  <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
</div>
{% endcapture %}
{% include example.html content=example %}

### Custom file input

{% capture example %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
  </div>
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
  </div>
</div>

<div class="input-group mb-3">
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile02">
    <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
  </div>
  <div class="input-group-append">
    <span class="input-group-text" id="inputGroupFileAddon02">Upload</span>
  </div>
</div>

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">Button</button>
  </div>
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03">
    <label class="custom-file-label" for="inputGroupFile03">Choose file</label>
  </div>
</div>

<div class="input-group">
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
  </div>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
  </div>
</div>
{% endcapture %}
{% include example.html content=example %}

## Accessibility

Screen readers will have trouble with your forms if you don't include a label for every input. For these input groups, ensure that any additional label or functionality is conveyed to assistive technologies.

The exact technique to be used (`<label>` elements hidden using the `.sr-only` class, or use of the `aria-label` and `aria-labelledby` attributes, possibly in combination with `aria-describedby`) and what additional information will need to be conveyed will vary depending on the exact type of interface widget you're implementing. The examples in this section provide a few suggested, case-specific approaches.
