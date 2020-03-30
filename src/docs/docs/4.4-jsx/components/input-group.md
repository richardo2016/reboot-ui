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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

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
        prepend={() => (
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
        prepend={() => (
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Checkboxes and radios

Place any checkbox or radio option within an input group's addon instead of text.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={(
          <span class="input-group-text">
            <Input type="checkbox" aria-label="Checkbox for following text input" />
          </span>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with checkbox" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        prepend={(
          <span class="input-group-text">
            <Input type="radio" aria-label="Radio button for following text input" />
          </span>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with radio" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Multiple addons

Multiple add-ons are supported and can be mixed with checkbox and radio input versions.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={() => (
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
      </InputGroup>
      <InputGroup
        append={() => (
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Button addons

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={() => (
          <div class="input-group-prepend">
            <Button outline theme="secondary" id={`button-addon1${uuid}`}>Button</Button>
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
        append={() => (
          <div class="input-group-append">
            <Button outline theme="secondary" id={`button-addon2${uuid}`}>Button</Button>
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
        prepend={() => (
          <div class="input-group-prepend" id={`button-addon3${uuid}`}>
            <Button outline theme="secondary">Button</Button>
            <Button outline theme="secondary">Button</Button>
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
        append={() => (
          <div class="input-group-append" id={`button-addon4${uuid}`}>
            <Button outline theme="secondary">Button</Button>
            <Button outline theme="secondary">Button</Button>
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
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Buttons with dropdowns

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={() => (
          <div class="input-group-prepend">
            <Dropdown.ForInputGroup label="Dropdown" outline theme="secondary">
              <Dropdown.Menu>
                <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                <Dropdown.Item role="separator" divider />
                <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
              </Dropdown.Menu>
            </Dropdown.ForInputGroup>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with dropdown button" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        append={() => (
          <div class="input-group-append">
            <Dropdown.ForInputGroup label="Dropdown" outline theme="secondary">
              <Dropdown.Menu>
                <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                <Dropdown.Item role="separator" divider />
                <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
              </Dropdown.Menu>
            </Dropdown.ForInputGroup>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with dropdown button" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Segmented buttons

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <InputGroup
        class="mb-3"
        prepend={() => (
          <div class="input-group-prepend">
            <Dropdown.ForInputGroup split label="Action" outline theme="secondary">
              <Dropdown.Menu>
                <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                <Dropdown.Item role="separator" divider />
                <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
              </Dropdown.Menu>
            </Dropdown.ForInputGroup>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with segmented dropdown button" />
      </InputGroup>
      <InputGroup
        class="mb-3"
        append={() => (
          <div class="input-group-append">
            <Dropdown.ForInputGroup split label="Action" outline theme="secondary">
              <Dropdown.Menu>
                  <Dropdown.LinkItem>Action</Dropdown.LinkItem>
                  <Dropdown.LinkItem>Another action</Dropdown.LinkItem>
                  <Dropdown.LinkItem>Something else here</Dropdown.LinkItem>
                  <Dropdown.Item role="separator" divider />
                  <Dropdown.LinkItem>Separated link</Dropdown.LinkItem>
                </Dropdown.Menu>
            </Dropdown.ForInputGroup>
          </div>
        )}
      >
        <Input type="text" class="form-control" aria-label="Text input with segmented dropdown button" />
      </InputGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Custom forms

Input groups include support for custom selects and custom file inputs. Browser default versions of these are not supported.

### Custom select

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Select
        id="inputGroupSelect01"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup
            children={children}
            class="mb-3"
            prepend={() => 
              <div class="input-group-prepend">
                <Form.Label class="input-group-text">Options</Form.Label>
              </div>
            }
          />
        )}
      >
        <Select.Option selected>Choose...</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
      <Form.Select
        id="inputGroupSelect02"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup
            children={children}
            class="mb-3"
            append={() => 
              <div class="input-group-append">
                <Form.Label class="input-group-text">Options</Form.Label>
              </div>
            }
          />
        )}
      >
        <Select.Option selected>Choose...</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
      <Form.Select
        id="inputGroupSelect03"
        custom
        aria-label="Example select with button addon"
        controlGroupedBy={({ children }) => (
          <InputGroup
            children={children}
            class="mb-3"
            prepend={() => 
              <div class="input-group-prepend">
                <Button outline theme="secondary">Button</Button>
              </div>
            }
          />
        )}
      >
        <Select.Option selected>Choose...</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
      <Form.Select
        id="inputGroupSelect04"
        custom
        aria-label="Example select with button addon"
        controlGroupedBy={({ children }) => (
          <InputGroup
            children={children}
            class="mb-3"
            append={() => 
              <div class="input-group-append">
                <Button outline theme="secondary">Button</Button>
              </div>
            }
          />
        )}
      >
        <Select.Option selected>Choose...</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Custom file input

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Input
        type="file"
        id="inputGroupFileAddon01"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup class="mb-3" prepend="Upload">
            <div class="custom-file">
              {children}
              <Form.Label>Choose file</Form.Label>
            </div>
          </InputGroup>
        )}
      >
      </Form.Input>
      <Form.Input
        type="file"
        id="inputGroupFileAddon02"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup class="mb-3" append="Upload">
            <div class="custom-file">
              {children}
              <Form.Label>Choose file</Form.Label>
            </div>
          </InputGroup>
        )}
      >
      </Form.Input>
      <Form.Input
        type="file"
        id="inputGroupFileAddon03"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup class="mb-3" prepend={<Button outline theme="secondary">Button</Button>}>
            <div class="custom-file">
              {children}
              <Form.Label>Choose file</Form.Label>
            </div>
          </InputGroup>
        )}
      >
      </Form.Input>
      <Form.Input
        type="file"
        id="inputGroupFileAddon04"
        custom
        controlGroupedBy={({ children }) => (
          <InputGroup class="mb-3" append={<Button outline theme="secondary">Button</Button>}>
            <div class="custom-file">
              {children}
              <Form.Label>Choose file</Form.Label>
            </div>
          </InputGroup>
        )}
      >
      </Form.Input>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Accessibility

Screen readers will have trouble with your forms if you don't include a label for every input. For these input groups, ensure that any additional label or functionality is conveyed to assistive technologies.

The exact technique to be used (`<label>` elements hidden using the `.sr-only` class, or use of the `aria-label` and `aria-labelledby` attributes, possibly in combination with `aria-describedby`) and what additional information will need to be conveyed will vary depending on the exact type of interface widget you're implementing. The examples in this section provide a few suggested, case-specific approaches.
