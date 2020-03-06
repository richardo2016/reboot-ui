---
layout: docs
title: Forms
description: Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms.
group: components
toc: true
---

## Overview

Bootstrap's form controls expand on [our Rebooted form styles]({{ site.baseurl }}/docs/{{ site.docs_version }}/content/reboot/#forms) with classes. Use these classes to opt into their customized displays for a more consistent rendering across browsers and devices.

Be sure to use an appropriate `type` attribute on all inputs (e.g., `email` for email address or `number` for numerical information) to take advantage of newer input controls like email verification, number selection, and more.

Here's a quick example to demonstrate Bootstrap's form styles. Keep reading for documentation on required classes, form layout, and more.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            id="exampleInputEmail1"
            label="Email address"
            type="email"
            aria-describedby="emailHelp"
            controlHelp={<Form.Text as="small" id="emailHelp" muted>We'll never share your email with anyone else.</Form.Text>}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            id="exampleInputPassword1"
            label="Password"
            type="password"
          />
        </Form.Group>
        <Form.CheckGroup>
          <Form.Checkbox
            controlId={`exampleCheck1`}
            label="Check me out"
          />
        </Form.CheckGroup>
        <Button theme="primary" type="submit">Submit</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Form controls

Textual form controls—like `<input>`s, `<select>`s, and `<textarea>`s—are styled with the `.form-control` class. Included are styles for general appearance, focus state, sizing, and more.

Be sure to explore our [custom forms](#custom-forms) to further style `<select>`s.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control controlId={`exampleFormControlInput1`} label="Email address">
            <Form.Input type="email" placeholder="name@example.com" />
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control controlId={`exampleFormControlSelect1`} label="Email select">
            <Form.Select>
              <Select.Option>1</Select.Option>
              <Select.Option>2</Select.Option>
              <Select.Option>3</Select.Option>
              <Select.Option>4</Select.Option>
              <Select.Option>5</Select.Option>
            </Form.Select>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control controlId={`exampleFormControlSelect2`} label="Email multiple select">
            <Form.Select multiple>
              <Select.Option>1</Select.Option>
              <Select.Option>2</Select.Option>
              <Select.Option>3</Select.Option>
              <Select.Option>4</Select.Option>
              <Select.Option>5</Select.Option>
            </Form.Select>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control controlId={`exampleFormControlTextarea1`} label="Example textarea">
            <TextArea />
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

For file inputs, swap the `.form-control` for `.form-control-file`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control controlId={`exampleFormControlFile1`} label="Example file input">
            <Form.Input type="file" />
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Sizing

Set heights using classes like `.form-control-lg` and `.form-control-sm`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Control>
        <Form.Input size="lg" type="text" placeholder=".form-control-lg" />
        <Form.Input type="text" placeholder="Default input" />
        <Form.Input size="sm" type="text" placeholder=".form-control-sm" />
      </Form.Control>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Control>
        <Form.Select controlSize="lg" placeholder=".form-control-lg">
          <Select.Option>Large select</Select.Option>
        </Form.Select>
        <Form.Select placeholder="Default input">
          <Select.Option>Default select</Select.Option>
        </Form.Select>
        <Form.Select controlSize="sm" placeholder=".form-control-sm">
          <Select.Option>Small select</Select.Option>
        </Form.Select>
      </Form.Control>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Readonly

Add the `readonly` boolean attribute on an input to prevent modification of the input's value. Read-only inputs appear lighter (just like disabled inputs), but retain the standard cursor.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Control>
        <Form.Input type="text" placeholder="Readonly input here..." readonly />
      </Form.Control>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Readonly plain text

If you want to have `<input readonly>` elements in your form styled as plain text, use the `.form-control-plaintext` class to remove the default form field styling and preserve the correct margin and padding.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group as={Row}>
          <Form.Control
            controlId="staticEmail"
            label={<Form.Label class="col-sm-2 col-form-label">Email</Form.Label>}
          >
            <Col span={10}>
              <Form.Input type="text" value="email@example.com" readonly plaintext />
            </Col>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Control
            controlId="inputPassword"
            label={<Form.Label class="col-sm-2 col-form-label">Password</Form.Label>}
          >
            <Col span={10}>
              <Form.Input type="password" placeholder="Password" />
            </Col>
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form inline>
        <Form.Group class="mb-2">
          <Form.Control
            controlId="staticEmail2"
            label={<Form.Label class="sr-only">Email</Form.Label>}
          >
            <Form.Input type="text" value="email@example.com" readonly plaintext />
          </Form.Control>
        </Form.Group>
        <Form.Group class="mx-sm-3 mb-2">
          <Form.Control
            controlId="inputPassword2"
            label={<Form.Label class="sr-only">Password</Form.Label>}
          >
            <Form.Input type="password" placeholder="Password" />
          </Form.Control>
        </Form.Group>
        <Button type="submit" theme="primary" class="mb-2">Confirm identity</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Range Inputs

Set horizontally scrollable range inputs using `.form-control-range`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group class="mb-2">
          <Form.Control
            controlId="formControlRange"
            label="Example Range input"
          >
            <Form.Input type="range" />
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Checkboxes and radios

Default checkboxes and radios are improved upon with the help of `.form-check`, **a single class for both input types that improves the layout and behavior of their HTML elements**. Checkboxes are for selecting one or several options in a list, while radios are for selecting one option from many.

Disabled checkboxes and radios are supported. The `disabled` attribute will apply a lighter color to help indicate the input's state.

Checkboxes and radio buttons support HTML-based form validation and provide concise, accessible labels. As such, our `<input>`s and `<label>`s are sibling elements as opposed to an `<input>` within a `<label>`. This is slightly more verbose as you must specify `id` and `for` attributes to relate the `<input>` and `<label>`.

### Default (stacked)

By default, any number of checkboxes and radios that are immediate sibling will be vertically stacked and appropriately spaced with `.form-check`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
        <Form.CheckGroup>
          <Form.Checkbox
            id="defaultCheck1"
            label="Default checkbox"
            value="" 
          />
        </Form.CheckGroup>
        <Form.CheckGroup>
          <Form.Checkbox
            id="defaultCheck2"
            label="Disabled checkbox"
            value=""
            disabled
          />
        </Form.CheckGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
        <Form.CheckGroup>
          <Form.Radio
            controlId="exampleRadios1"
            label="Default radio"
            name="exampleRadios"
            value="option1"
            checked
          />
        </Form.CheckGroup>
        <Form.CheckGroup>
          <Form.Radio
            controlId="exampleRadios2"
            label="Second default radio"
            name="exampleRadios"
            value="option2"
          />
        </Form.CheckGroup>
        <Form.CheckGroup>
          <Form.Radio
            controlId="exampleRadios3"
            label="Disabled radio"
            name="exampleRadios"
            value="option3"
            disabled
          />
        </Form.CheckGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Inline

Group checkboxes or radios on the same horizontal row by adding `.form-check-inline` to any `.form-check`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
        <Form.CheckGroup inline>
          <Form.Checkbox
            controlId="inlineCheckbox1"
            label="1"
            value="option1" 
          />
        </Form.CheckGroup>
        <Form.CheckGroup inline>
          <Form.Checkbox
            controlId="inlineCheckbox2"
            label="2"
            value="option2" 
          />
        </Form.CheckGroup>
        <Form.CheckGroup inline>
          <Form.Checkbox
            controlId="inlineCheckbox3"
            label="3 (disabled)"
            value="option3"
            disabled 
          />
        </Form.CheckGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
        <Form.CheckGroup inline>
          <Form.Radio
            id="inlineRadio1"
            label="1"
            name="inlineRadioOptions"
            value="option1"
          />
        </Form.CheckGroup>
        <Form.CheckGroup inline>
          <Form.Radio
            id="inlineRadio2"
            label="2"
            name="inlineRadioOptions"
            value="option2"
          />
        </Form.CheckGroup>
        <Form.CheckGroup inline>
          <Form.Radio
            id="inlineRadio3"
            label="3 (disabled)"
            name="inlineRadioOptions"
            value="option3"
            disabled
          />
        </Form.CheckGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Without labels

Add `.position-static` to inputs within `.form-check` that don't have any label text. Remember to still provide some form of label for assistive technologies (for instance, using `aria-label`).

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
        <Form.CheckGroup>
          <Form.Checkbox
            controlId="blankCheckbox"
            class="position-static"
            value="option1"
            aria-label="..."
          />
        </Form.CheckGroup>
        <Form.CheckGroup>
          <Form.Radio
            controlId="blankRadio1"
            class="position-static"
            name="blankRadio"
            value="option1"
            aria-label="..."
          />
        </Form.CheckGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Layout

Since Bootstrap applies `display: block` and `width: 100%` to almost all our form controls, forms will by default stack vertically. Additional classes can be used to vary this layout on a per-form basis.

### Form groups

The `.form-group` class is the easiest way to add some structure to forms. It provides a flexible class that encourages proper grouping of labels, controls, optional help text, and form validation messaging. By default it only applies `margin-bottom`, but it picks up additional styles in `.form-inline` as needed. Use it with `<fieldset>`s, `<div>`s, or nearly any other element.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
          <Form.Group>
            <Form.Input
              id="formGroupExampleInput"
              label="Example label"
              type="text"
              placeholder="Example input placeholder"
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              id="formGroupExampleInput2"
              label="Another label"
              type="text"
              placeholder="Another input placeholder"
            />
          </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Form grid

More complex forms can be built using our grid classes. Use these for form layouts that require multiple columns, varied widths, and additional alignment options.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Input type="text" class="form-control" placeholder="First name" />
        </Col>
        <Col>
          <Form.Input type="text" class="form-control" placeholder="Last name" />
        </Col>
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Form row

You may also swap `.row` for `.form-row`, a variation of our standard grid row that overrides the default column gutters for tighter and more compact layouts.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row>
          <Col>
            <Form.Input type="text" class="form-control" placeholder="First name" />
          </Col>
          <Col>
            <Form.Input type="text" class="form-control" placeholder="Last name" />
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

More complex layouts can also be created with the grid system.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row>
          <Col as={Form.Group} md={6}>
            <Form.Input type="email" id="inputEmail4" label="Email" />
          </Col>
          <Col as={Form.Group} md={6}>
            <Form.Input type="password" id="inputPassword4" label="Password" />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Input type="text" id="inputAddress" label="Address" placeholder="1234 Main St" />
        </Form.Group>
        <Form.Group>
          <Form.Input type="text" id="inputAddress2" label="Address 2" placeholder="Apartment, studio, or floor" />
        </Form.Group>
        <Form.Row>
          <Col as={Form.Group} md={6}>
            <Form.Input type="text" id="inputCity" label="City" />
          </Col>
          <Col as={Form.Group} md={4}>
            <Form.Select id="inputState" label="State">
              <Form.Option selected>Choose...</Form.Option>
              <Form.Option>...</Form.Option>
            </Form.Select>
          </Col>
          <Col as={Form.Group} md={2}>
            <Form.Input type="text" id="inputZip" label="Zip" />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.CheckGroup>
            <Form.Checkbox id="gridCheck" label="Check me out" />
          </Form.CheckGroup>
        </Form.Group>
        <Button type="submit" theme="primary">Sign in</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Horizontal form

Create horizontal forms with the grid by adding the `.row` class to form groups and using the `.col-*-*` classes to specify the width of your labels and controls. Be sure to add `.col-form-label` to your `<label>`s as well so they're vertically centered with their associated form controls.

At times, you maybe need to use margin or padding utilities to create that perfect alignment you need. For example, we've removed the `padding-top` on our stacked radio inputs label to better align the text baseline.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group as={Row}>
          <Form.Input
            controlRefParentCol={{ sm: 10 }}
            type="email"
            id="inputEmail3"
            label={<Form.Label col={{ sm: 2 }}>Email</Form.Label>}
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Input
            controlRefParentCol={{ sm: 10 }}
            type="password"
            id="inputPassword3"
            label={<Form.Label col={{ sm: 2 }}>Password</Form.Label>}
          />
        </Form.Group>
        <Form.Group as="fieldset">
          <Row>
            <Col as="legend" sm={2} class="col-form-label pt-0">Radios</Col>
            <Col sm={10}>
              <Form.CheckGroup>
                <Form.Radio labelAfter="First radio" name="gridRadios" id="gridRadios1" value="option1" checked />
              </Form.CheckGroup>
              <Form.CheckGroup>
                <Form.Radio labelAfter="Second radio" name="gridRadios" id="gridRadios2" value="option2" />
              </Form.CheckGroup>
              <Form.CheckGroup disabled>
                <Form.Radio labelAfter="Third disabled radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
              </Form.CheckGroup>
            </Col>
          </Row>
        </Form.Group>
        <Row as={Form.Group}>
          <Col sm={2}>Checkbox</Col>
          <Col sm={10}>
            <Form.CheckGroup>
              <Form.Checkbox label="Example checkbox" id="gridCheck1" />
            </Form.CheckGroup>
          </Col>
        </Row>
        <Row as={Form.Group}>
          <Col sm={10}>
            <Button type="submit" theme="primary">Sign in</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

##### Horizontal form label sizing

Be sure to use `.col-form-label-sm` or `.col-form-label-lg` to your `<label>`s or `<legend>`s to correctly follow the size of `.form-control-lg` and `.form-control-sm`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Group as={Row}>
          <Form.Input
            size="sm"
            controlRefParentCol={{ sm: 10 }}
            type="email"
            id="colFormLabelSm"
            label={<Form.Label col={{ sm: 2 }}>Email</Form.Label>}
            placeholder="col-form-label-sm"
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Input
            controlRefParentCol={{ sm: 10 }}
            type="email"
            id="colFormLabel"
            label={<Form.Label col={{ sm: 2 }}>Email</Form.Label>}
            placeholder="col-form-label"
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Input
            size="lg"
            controlRefParentCol={{ sm: 10 }}
            type="email"
            id="colFormLabelLg"
            label={<Form.Label col={{ sm: 2 }}>Email</Form.Label>}
            placeholder="col-form-label-lg"
          />
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Column sizing

As shown in the previous examples, our grid system allows you to place any number of `.col`s within a `.row` or `.form-row`. They'll split the available width equally between them. You may also pick a subset of your columns to take up more or less space, while the remaining `.col`s equally split the rest, with specific column classes like `.col-7`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row>
          <Col span={7}>
            <Form.Input placeholder="City" />
          </Col>
          <Col class="col">
            <Form.Input placeholder="State" />
          </Col>
          <Col class="col">
            <Form.Input placeholder="Zip" />
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Auto-sizing

The example below uses a flexbox utility to vertically center the contents and changes `.col` to `.col-auto` so that your columns only take up as much space as needed. Put another way, the column sizes itself based on the contents.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row class="align-items-center">
          <Col span="auto">
            <Form.Input
              class="mb-2"
              id="inlineFormInput"
              placeholder="Jane Doe"
              label={<Form.Label class="sr-only">Name</Form.Label>}
            />
          </Col>
          <Col span="auto">
            <Form.Input
              id="inlineFormInputGroup"
              placeholder="Username"
              controlRefParentAs={({ children }) => 
                <InputGroup class="mb-2" prepend="@">{children}</InputGroup>
              }
              label={<Form.Label class="sr-only">Username</Form.Label>}
            />
          </Col>
          <Col span="auto">
            <Form.CheckGroup noGroup>
              <Form.Checkbox
                id="autoSizingCheck"
                placeholder="Username"
                label="Remember me"
              />
            </Form.CheckGroup>
          </Col>
          <Col span="auto">
            <Button type="submit" theme="primary" class="mb-2">Submit</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

You can then remix that once again with size-specific column classes.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row class="align-items-center">
          <Col sm={3} class="my-1">
            <Form.Input
              id="inlineFormInputName"
              placeholder="Jane Doe"
              label={<Form.Label class="sr-only">Name</Form.Label>}
            />
          </Col>
          <Col sm={3} class="my-1">
            <Form.Input
              id="inlineFormInputGroupUsername"
              placeholder="Username"
              controlRefParentAs={({ children }) => 
                <InputGroup prepend="@">{children}</InputGroup>
              }
              label={<Form.Label class="sr-only">Username</Form.Label>}
            />
          </Col>
          <Col span="auto" class="my-1">
            <Form.CheckGroup noGroup>
              <Form.Checkbox
                id="autoSizingCheck2"
                label="Remember me"
              />
            </Form.CheckGroup>
          </Col>
          <Col span="auto" class="my-1">
            <Button type="submit" theme="primary">Submit</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

And of course [custom form controls](#custom-forms) are supported.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row class="align-items-center">
          <Col span="auto" class="my-1">
            <Form.Select
              id="inlineFormCustomSelect"
              class="mr-sm-2"
              label={<Form.Label class="mr-sm-2 sr-only">Preference</Form.Label>}
              custom
            >
              <Select.Option selected>Choose...</Select.Option>
              <Select.Option value="1">One</Select.Option>
              <Select.Option value="2">Two</Select.Option>
              <Select.Option value="3">Three</Select.Option>
            </Form.Select>
          </Col>
          <Col span="auto" class="my-1">
            <Form.Checkbox
              id="customControlAutosizing"
              custom
              controlAs={({ children }) => (
                <div class="custom-control custom-checkbox mr-sm-2">
                  {children}
                </div>
              )}
              labelAfter={<Form.Label custom>Remember my preference</Form.Label>}
            />
          </Col>
          <Col span="auto" class="my-1">
            <Button type="submit" theme="primary">Submit</Button>
          </Col>
        </Form.Row>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Inline forms

Use the `.form-inline` class to display a series of labels, form controls, and buttons on a single horizontal row. Form controls within inline forms vary slightly from their default states.

- Controls are `display: flex`, collapsing any HTML white space and allowing you to provide alignment control with [spacing]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) and [flexbox]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/) utilities.
- Controls and input groups receive `width: auto` to override the Bootstrap default `width: 100%`.
- Controls **only appear inline in viewports that are at least 576px wide** to account for narrow viewports on mobile devices.

You may need to manually address the width and alignment of individual form controls with [spacing utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) (as shown below). Lastly, be sure to always include a `<label>` with each form control, even if you need to hide it from non-screenreader visitors with `.sr-only`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form inline>
        <Form.Input
          id="inlineFormInputName2"
          placeholder="Jane Doe"
          class="mb-2 mr-sm-2"
          label={<Form.Label class="sr-only">Name</Form.Label>}
        />
        <Form.Input
          id="inlineFormInputGroupUsername2"
          placeholder="Username"
          label={<Form.Label class="sr-only">Username</Form.Label>}
          controlRefParentAs={({ children }) => (
            <InputGroup children={children} class="mb-2 mr-sm-2" prepend="@" />
          )}
        />
        <Form.Checkbox
          id="inlineFormCheck"
          labelAfter="Remember me"
          controlAs={({ children }) => (
            <Form.CheckGroup children={children} class="mb-2 mr-sm-2" />
          )}
        />
        <Button type="submit" theme="primary" class="mb-2">Submit</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Custom form controls and selects are also supported.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form inline>
        <Form.Select
          id="inlineFormCustomSelectPref"
          class="my-1 mr-sm-2"
          label={<Form.Label class="my-1 mr-2">Preference</Form.Label>}
          custom
        >
          <Select.Option selected>Choose...</Select.Option>
          <Select.Option value="1">One</Select.Option>
          <Select.Option value="2">Two</Select.Option>
          <Select.Option value="3">Three</Select.Option>
        </Form.Select>
        <Form.Checkbox
          id="customControlInline"
          labelAfter={<Form.Label custom>Remember my preference</Form.Label>}
          controlAs={({ children }) => (
            <div children={children} class="custom-control custom-checkbox my-1 mr-sm-2" />
          )}
          custom
        />
        <Button type="submit" theme="primary" class="my-1">Submit</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% capture callout %}
##### Alternatives to hidden labels
Assistive technologies such as screen readers will have trouble with your forms if you don't include a label for every input. For these inline forms, you can hide the labels using the `.sr-only` class. There are further alternative methods of providing a label for assistive technologies, such as the `aria-label`, `aria-labelledby` or `title` attribute. If none of these are present, assistive technologies may resort to using the `placeholder` attribute, if present, but note that use of `placeholder` as a replacement for other labelling methods is not advised.
{% endcapture %}
{% include callout.html content=callout type="warning" %}

## Help text

Block-level help text in forms can be created using `.form-text` (previously known as `.help-block` in v3). Inline help text can be flexibly implemented using any inline HTML element and utility classes like `.text-muted`.

{% capture callout %}
##### Associating help text with form controls

Help text should be explicitly associated with the form control it relates to using the `aria-describedby` attribute. This will ensure that assistive technologies—such as screen readers—will announce this help text when the user focuses or enters the control.
{% endcapture %}
{% include callout.html content=callout type="warning" %}

Help text below inputs can be styled with `.form-text`. This class includes `display: block` and adds some top margin for easy spacing from the inputs above.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Input
        id="inputPassword5"
        type="password"
        aria-describedby="passwordHelpBlock"
        label="Password"
        controlHelp={(
          <Form.Text as="small" muted id="passwordHelpBlock">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        )}
      />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Inline text can use any typical inline HTML element (be it a `<small>`, `<span>`, or something else) with nothing more than a utility class.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form inline>
        <Form.Group>
          <Form.Input
            id="inputPassword6"
            type="password"
            aria-describedby="passwordHelpInline"
            label="Password"
            class="mx-sm-3"
            controlHelp={(
              <Form.Text as="small" muted id="passwordHelpInline">
                Must be 8-20 characters long.
              </Form.Text>
            )}
          />
        </Form.Group>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Disabled forms

Add the `disabled` boolean attribute on an input to prevent user interactions and make it appear lighter.

{% highlight jsx %}
<Form.Input id="disabledInput" type="text" placeholder="Disabled input here..." disabled />
{% endhighlight %}

Add the `disabled` attribute to a `<fieldset>` to disable all the controls within.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <fieldset disabled>
          <Form.Group>
            <Form.Input
              id="disabledTextInput"
              label="Disabled input"
              placeholder="Disabled input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              id="disabledSelect"
              label="Disabled select menu"
            >
              <Select.Option>Disabled select</Select.Option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              id="disabledFieldsetCheck"
              labelAfter="Can't check this"
              placeholder="Disabled input"
              disabled
              controlAs={({ children }) => (
                <div class="form-check" children={children} />
              )}
            />
          </Form.Group>
          <Button type="submit" theme="primary">Submit</Button>
        </fieldset>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% capture callout %}
##### Caveat with anchors

By default, browsers will treat all native form controls (`<input>`, `<select>` and `<button>` elements) inside a `<fieldset disabled>` as disabled, preventing both keyboard and mouse interactions on them. However, if your form also includes `<a ... class="btn btn-*">` elements, these will only be given a style of `pointer-events: none`. As noted in the section about [disabled state for buttons]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/buttons/#disabled-state) (and specifically in the sub-section for anchor elements), this CSS property is not yet standardized and isn't fully supported in Internet Explorer 10, and won't prevent keyboard users from being able to focus or activate these links. So to be safe, use custom JavaScript to disable such links.
{% endcapture %}
{% include callout.html content=callout type="warning" %}

{% capture callout %}
#### Cross-browser compatibility

While Bootstrap will apply these styles in all browsers, Internet Explorer 11 and below don't fully support the `disabled` attribute on a `<fieldset>`. Use custom JavaScript to disable the fieldset in these browsers.
{% endcapture %}
{% include callout.html content=callout type="danger" %}

## Validation

Provide valuable, actionable feedback to your users with HTML5 form validation–[available in all our supported browsers](https://caniuse.com/#feat=form-validation). Choose from the browser default validation feedback, or implement custom messages with our built-in classes and starter JavaScript.

{% capture callout %}
We currently recommend using custom validation styles, as native browser default validation messages are not consistently exposed to assistive technologies in all browsers (most notably, Chrome on desktop and mobile).
{% endcapture %}
{% include callout.html content=callout type="warning" %}

### How it works

Here's how form validation works with Bootstrap:

- HTML form validation is applied via CSS's two pseudo-classes, `:invalid` and `:valid`. It applies to `<input>`, `<select>`, and `<textarea>` elements.
- Bootstrap scopes the `:invalid` and `:valid` styles to parent `.was-validated` class, usually applied to the `<form>`. Otherwise, any required field without a value shows up as invalid on page load. This way, you may choose when to activate them (typically after form submission is attempted).
- To reset the appearance of the form (for instance, in the case of dynamic form submissions using AJAX), remove the `.was-validated` class from the `<form>` again after submission.
- As a fallback, `.is-invalid` and `.is-valid` classes may be used instead of the pseudo-classes for [server side validation](#server-side). They do not require a `.was-validated` parent class.
- Due to constraints in how CSS works, we cannot (at present) apply styles to a `<label>` that comes before a form control in the DOM without the help of custom JavaScript.
- All modern browsers support the [constraint validation API](https://www.w3.org/TR/html5/sec-forms.html#the-constraint-validation-api), a series of JavaScript methods for validating form controls.
- Feedback messages may utilize the [browser defaults](#browser-defaults) (different for each browser, and unstylable via CSS) or our custom feedback styles with additional HTML and CSS.
- You may provide custom validity messages with `setCustomValidity` in JavaScript.

With that in mind, consider the following demos for our custom form validation styles, optional server side classes, and browser defaults.

### Custom styles

For custom Bootstrap form validation messages, you'll need to add the `novalidate` boolean attribute to your `<form>`. This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript. Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you. When attempting to submit, you'll see the `:invalid` and `:valid` styles applied to your form controls.

Custom feedback styles apply custom colors, borders, focus styles, and background icons to better communicate feedback. Background icons for `<select>`s are only available with `.custom-select`, and not `.form-control`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ wasValidated, setWasValidated ] = React.useState(false)

  return (
    <>
      <Form
        class="needs-validation"
        rbWasValidated={wasValidated}
        novalidate
        onSubmitCapture={(event) => {
          const form = event.target
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          setWasValidated(true)
        }}
      >
        <Form.Row>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationCustom01"
              label="First name"
              value="Mark"
              required
              controlValidationFeedback={<Form.ValidationFeedback when="valid">Looks good!</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationCustom02"
              label="Last name"
              value="Otto"
              required
              controlValidationFeedback={<Form.ValidationFeedback when="valid">Looks good!</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationCustomUsername"
              label="Username"
              required
              aria-describedby="inputGroupPrepend"
              controlRefParentAs={({ children }) => (
                <InputGroup prepend="@" id="inputGroupPrepend" children={children} />
              )}
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please choose a username.</Form.ValidationFeedback>}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={6} class="mb-3">
            <Form.Input
              id="validationCustom03"
              label="City"
              required
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please provide a valid city.</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={3} class="mb-3">
            <Form.Select
              id="validationCustom04"
              label="State"
              required
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please select a valid state.</Form.ValidationFeedback>}
            >
              <Select.Option selected disabled value="">Choose...</Select.Option>
              <Select.Option>...</Select.Option>
            </Form.Select>
          </Col>
          <Col md={3} class="mb-3">
            <Form.Input
              id="validationCustom05"
              label="Zip"
              required
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please provide a valid zip.</Form.ValidationFeedback>}
            />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Checkbox
            id="invalidCheck"
            labelAfter="Agree to terms and conditions"
            value=""
            required
            controlAs={({ children }) => (
              <Form.CheckGroup children={children} />
            )}
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">You must agree before submitting.</Form.ValidationFeedback>}
          />
        </Form.Group>
        <Button theme="primary" type="submit">Submit form</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Browser defaults

Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you'll see a slightly different style of feedback.

While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationDefault01"
              label="First name"
              value="Mark"
              required
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationDefault02"
              label="Last name"
              value="Otto"
              required
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationDefaultUsername"
              label="Username"
              aria-describedby="inputGroupPrepend2"
              controlRefParentAs={({ children }) => 
                <InputGroup prepend="@" id="inputGroupPrepend2">{children}</InputGroup>
              }
              required
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={6} class="mb-3">
            <Form.Input
              id="validationDefault03"
              label="City"
              required
            />
          </Col>
          <Col md={3} class="mb-3">
            <Form.Select
              id="validationDefault04"
              label="State"
              custom
              required
            >
              <Select.Option selected disabled value="">Choose...</Select.Option>
              <Select.Option>...</Select.Option>
            </Form.Select>
          </Col>
          <Col md={3} class="mb-3">
            <Form.Input
              id="validationDefault05"
              label="Zip"
              required
            />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Checkbox
            id="invalidCheck2"
            labelAfter="Agree to terms and conditions"
            value=""
            required
            controlAs={({ children }) => (
              <Form.CheckGroup children={children} />
            )}
          />
        </Form.Group>
        <Button theme="primary" type="submit">Submit form</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Server side

We recommend using client-side validation, but in case you require server-side validation, you can indicate invalid and valid form fields with `.is-invalid` and `.is-valid`. Note that `.invalid-feedback` is also supported with these classes.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form>
        <Form.Row>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationServer01"
              label="First name"
              value="Mark"
              required
              rbValid
              controlValidationFeedback={<Form.ValidationFeedback when="valid">Looks good!</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationServer02"
              label="Last name"
              value="Otto"
              required
              rbValid
              controlValidationFeedback={<Form.ValidationFeedback when="valid">Looks good!</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationServerUsername"
              label="Username"
              required
              rbValid={false}
              aria-describedby="inputGroupPrepend3"
              controlRefParentAs={({ children }) => 
                <InputGroup prepend="@" id="inputGroupPrepend3">{children}</InputGroup>
              }
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please choose a username.</Form.ValidationFeedback>}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={6} class="mb-3">
            <Form.Input
              id="validationServer03"
              label="City"
              required
              rbValid={false}
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please provide a valid city.</Form.ValidationFeedback>}
            />
          </Col>
          <Col md={3} class="mb-3">
            <Form.Select
              id="validationServer04"
              label="State"
              custom
              required
              rbValid={false}
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please select a valid state.</Form.ValidationFeedback>}
            >
              <Select.Option selected disabled value="">Choose...</Select.Option>
              <Select.Option>...</Select.Option>
            </Form.Select>
          </Col>
          <Col md={3} class="mb-3">
            <Form.Input
              id="validationServer05"
              label="Zip"
              required
              rbValid={false}
              controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please provide a valid zip.</Form.ValidationFeedback>}
            />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Checkbox
            id="invalidCheck3"
            label="Agree to terms and conditions"
            value=""
            required
            rbValid={false}
            controlAs={({ children }) => (
              <Form.CheckGroup children={children} />
            )}
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">You must agree before submitting.</Form.ValidationFeedback>}
          />
        </Form.Group>
        <Button theme="primary" type="submit">Submit form</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Supported elements

Validation styles are available for the following form controls and components:

- `<input>`s and `<textarea>`s with `.form-control` (including up to one `.form-control` in input groups)
- `<select>`s with `.form-control` or `.custom-select`
- `.form-check`s
- `.custom-checkbox`s and `.custom-radio`s
- `.custom-file`

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form rbWasValidated>
        <div class="mb-3">
          <Form.Input
            textarea
            id="validationTextarea"
            label="Textarea"
            required
            rbValid={false}
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">Please enter a message in the textarea.</Form.ValidationFeedback>}
          />
        </div>
        <div class="custom-control custom-checkbox mb-3">
          <Form.Checkbox
            id="customControlValidation1"
            labelAfter={<Form.Label custom>Check this custom checkbox</Form.Label>}
            custom
            required
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">Example invalid feedback text</Form.ValidationFeedback>}
          />
        </div>
        <div class="custom-control custom-radio">
          <Form.Radio
            id="customControlValidation2"
            labelAfter={<Form.Label custom>Toggle this custom radio</Form.Label>}
            name="radio-stacked"
            custom
            required
          />
        </div>
        <div class="custom-control custom-radio mb-3">
          <Form.Radio
            id="customControlValidation3"
            labelAfter={<Form.Label custom>Or toggle this other custom radio</Form.Label>}
            name="radio-stacked"
            custom
            required
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">More example invalid feedback text</Form.ValidationFeedback>}
          />
        </div>
        <Form.Group>
          <Form.Select
            custom
            required
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">Example invalid custom select feedback</Form.ValidationFeedback>}
          >
            <Select.Option value="">Open this select menu</Select.Option>
            <Select.Option value="1">One</Select.Option>
            <Select.Option value="2">Two</Select.Option>
            <Select.Option value="3">Three</Select.Option>
          </Form.Select>
        </Form.Group>
        <div class="custom-file">
          <Form.Input
            type="file"
            id="validatedCustomFile"
            labelAfter="Choose file..."
            required
            custom
            controlValidationFeedback={<Form.ValidationFeedback when="invalid">Example invalid custom file feedback</Form.ValidationFeedback>}
          />
        </div>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Tooltips

If your form layout allows it, you can swap the `.{valid|invalid}-feedback` classes for `.{valid|invalid}-tooltip` classes to display validation feedback in a styled tooltip. Be sure to have a parent with `position: relative` on it for tooltip positioning. In the example below, our column classes have this already, but your project may require an alternative setup.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ wasValidated, setWasValidated ] = React.useState(false)

  return (
    <>
      <Form
        class="needs-validation"
        rbWasValidated={wasValidated}
        novalidate
        onSubmitCapture={(event) => {
          const form = event.target
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          setWasValidated(true)
        }}
      >
        <Form.Row>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationTooltip01"
              label="First name"
              value="Mark"
              required
              controlValidationTooltip={<Form.ValidationTooltip when="valid">Looks good!</Form.ValidationTooltip>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationTooltip02"
              label="Last name"
              value="Otto"
              required
              controlValidationTooltip={<Form.ValidationTooltip when="valid">Looks good!</Form.ValidationTooltip>}
            />
          </Col>
          <Col md={4} class="mb-3">
            <Form.Input
              id="validationTooltipUsername"
              label="Username"
              required
              aria-describedby="inputGroupPrepend"
              controlRefParentAs={({ children }) => (
                <InputGroup prepend="@" id="inputGroupPrepend" children={children} />
              )}
              controlValidationTooltip={<Form.ValidationTooltip when="invalid">Please choose a username.</Form.ValidationTooltip>}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={6} class="mb-3">
            <Form.Input
              id="validationTooltip03"
              label="City"
              required
              controlValidationTooltip={<Form.ValidationTooltip when="invalid">Please provide a valid city.</Form.ValidationTooltip>}
            />
          </Col>
          <Col md={3} class="mb-3">
            <Form.Select
              id="validationTooltip04"
              label="State"
              required
              controlValidationTooltip={<Form.ValidationTooltip when="invalid">Please select a valid state.</Form.ValidationTooltip>}
            >
              <Select.Option selected disabled value="">Choose...</Select.Option>
              <Select.Option>...</Select.Option>
            </Form.Select>
          </Col>
          <Col md={3} class="mb-3">
            <Form.Input
              id="validationTooltip05"
              label="Zip"
              required
              controlValidationTooltip={<Form.ValidationTooltip when="invalid">Please provide a valid zip.</Form.ValidationTooltip>}
            />
          </Col>
        </Form.Row>
        <Button theme="primary" type="submit">Submit form</Button>
      </Form>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Customizing

Validation states can be customized via Sass with the `$form-validation-states` map. Located in our `_variables.scss` file, this Sass map is looped over to generate the default `valid`/`invalid` validation states. Included is a nested map for customizing each state's color and icon. While no other states are supported by browsers, those using custom styles can easily add more complex form feedback.

Please note that we do not recommend customizing these values without also modifying the `form-validation-state` mixin.

{% highlight scss %}
// Sass map from `_variables.scss`
// Override this and recompile your Sass to generate different states
$form-validation-states: map-merge(
  (
    "valid": (
      "color": $form-feedback-valid-color,
      "icon": $form-feedback-icon-valid
    ),
    "invalid": (
      "color": $form-feedback-invalid-color,
      "icon": $form-feedback-icon-invalid
    )
  ),
  $form-validation-states
);

// Loop from `_forms.scss`
// Any modifications to the above Sass map will be reflected in your compiled
// CSS via this loop.
@each $state, $data in $form-validation-states {
  @include form-validation-state($state, map-get($data, color), map-get($data, icon));
}
{% endhighlight %}

## Custom forms

For even more customization and cross browser consistency, use our completely custom form elements to replace the browser defaults. They're built on top of semantic and accessible markup, so they're solid replacements for any default form control.

### Checkboxes and radios

Each checkbox and radio `<input>` and `<label>` pairing is wrapped in a `<div>` to create our custom control. Structurally, this is the same approach as our default `.form-check`.

We use the sibling selector (`~`) for all our `<input>` states—like `:checked`—to properly style our custom form indicator. When combined with the `.custom-control-label` class, we can also style the text for each item based on the `<input>`'s state.

We hide the default `<input>` with `opacity` and use the `.custom-control-label` to build a new custom form indicator in its place with `::before` and `::after`. Unfortunately we can't build a custom one from just the `<input>` because CSS's `content` doesn't work on that element.

In the checked states, we use **base64 embedded SVG icons** from [Open Iconic](https://github.com/iconic/open-iconic). This provides us the best control for styling and positioning across browsers and devices.

#### Checkboxes

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-checkbox">
        <Form.Input
          type="checkbox"
          custom
          id="customCheck1"
          label="Check this custom checkbox"
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Custom checkboxes can also utilize the `:indeterminate` pseudo class when manually set via JavaScript (there is no available HTML attribute for specifying it).

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-checkbox">
        <Form.Checkbox
          custom
          id="customCheck2"
          label="Check this custom checkbox"
          indeterminate
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code class="bd-example-indeterminate" %}

#### Radios

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-radio">
        <Form.Radio
          custom
          name="customRadio"
          id="customRadio1"
          label="Toggle this custom radio"
        />
      </div>
      <div class="custom-control custom-radio">
        <Form.Radio
          custom
          name="customRadio"
          id="customRadio2"
          label="Or toggle this other custom radio"
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Inline

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-radio custom-control-inline">
        <Form.Radio
          custom
          name="customRadioInline1"
          id="customRadioInline1"
          label="Toggle this custom radio"
        />
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <Form.Radio
          custom
          name="customRadioInline1"
          id="customRadioInline2"
          label="Or toggle this other custom radio"
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Disabled

Custom checkboxes and radios can also be disabled. Add the `disabled` boolean attribute to the `<input>` and the custom indicator and label description will be automatically styled.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-checkbox">
        <Form.Checkbox
          custom
          id="customCheckDisabled1"
          label="Check this custom checkbox"
          disabled
        />
      </div>
      <div class="custom-control custom-radio">
        <Form.Radio
          custom
          name="radioDisabled"
          id="customRadioDisabled2"
          label="Toggle this custom radio"
          disabled
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Switches

A switch has the markup of a custom checkbox but uses the `.custom-switch` class to render a toggle switch. Switches also support the `disabled` attribute.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-control custom-switch">
        <Form.Checkbox
          custom
          id="customSwitch1"
          label="Toggle this switch element"
        />
      </div>
      <div class="custom-control custom-switch">
        <Form.Checkbox
          custom
          id="customSwitch2"
          label="Disabled switch element"
          disabled
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Select menu

Custom `<select>` menus need only a custom class, `.custom-select` to trigger the custom styles. Custom styles are limited to the `<select>`'s initial appearance and cannot modify the `<option>`s due to browser limitations.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Select custom>
        <Select.Option selected>Open this select menu</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

You may also choose from small and large custom selects to match our similarly sized text inputs.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Select custom controlSize="lg" class="mb-3">
        <Select.Option selected>Open this select menu</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
      <Form.Select custom controlSize="sm" class="mb-3">
        <Select.Option selected>Open this select menu</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

The `multiple` attribute is also supported:

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Select custom multiple>
        <Select.Option selected>Open this select menu</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

As is the `size` attribute:

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Select custom size="3">
        <Select.Option selected>Open this select menu</Select.Option>
        <Select.Option value="1">One</Select.Option>
        <Select.Option value="2">Two</Select.Option>
        <Select.Option value="3">Three</Select.Option>
      </Form.Select>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Range

Create custom `<input type="range">` controls with `.custom-range`. The track (the background) and thumb (the value) are both styled to appear the same across browsers. As only IE and Firefox support "filling" their track from the left or right of the thumb as a means to visually indicate progress, we do not currently support it.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Range
        id="customRange1"
        label="Example range"
      />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Range inputs have implicit values for `min` and `max`—`0` and `100`, respectively. You may specify new values for those using the `min` and `max` attributes.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Range
        custom
        id="customRange2"
        min={0}
        max={5}
        label="Example range"
      />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

By default, range inputs "snap" to integer values. To change this, you can specify a `step` value. In the example below, we double the number of steps by using `step="0.5"`.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <Form.Range
        custom
        id="customRange3"
        min={0}
        max={5}
        step={0.5}
        label="Example range"
      />
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### File browser

{% capture callout %}
The recommended plugin to animate custom file input: [bs-custom-file-input](https://www.npmjs.com/package/bs-custom-file-input), that's what we are using currently here in our docs.
{% endcapture %}
{% include callout.html content=callout type="info" %}

The file input is the most gnarly of the bunch and requires additional JavaScript if you'd like to hook them up with functional *Choose file...* and selected file name text.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-file">
        <Form.File
          custom
          id="customFile"
          label="Choose range"
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

We hide the default file `<input>` via `opacity` and instead style the `<label>`. The button is generated and positioned with `::after`. Lastly, we declare a `width` and `height` on the `<input>` for proper spacing for surrounding content.

#### Translating or customizing the strings with SCSS

The [`:lang()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang) is used to allow for translation of the "Browse" text into other languages. Override or add entries to the `$custom-file-text` Sass variable with the relevant [language tag](https://en.wikipedia.org/wiki/IETF_language_tag) and localized strings. The English strings can be customized the same way. For example, here's how one might add a Spanish translation (Spanish's language code is `es`):

{% highlight scss %}
$custom-file-text: (
  en: "Browse",
  es: "Elegir"
);
{% endhighlight %}

Here's `lang(es)` in action on the custom file input for a Spanish translation:

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-file">
        <Form.File
          custom
          id="customFileLang"
          label="Seleccionar Archivo"
          lang="es"
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

You'll need to set the language of your document (or subtree thereof) correctly in order for the correct text to be shown. This can be done using [the `lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) on the `<html>` element or the [`Content-Language` HTTP header](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.12), among other methods.

#### Translating or customizing the strings with HTML

Bootstrap also provides a way to translate the "Browse" text in HTML with the `data-browse` attribute which can be added to the custom input label (example in Dutch):

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <div class="custom-file">
        <Form.File
          custom
          id="customFileLangHTML"
          label={<Form.Label data-browse="Bestand kiezen">Voeg je document toe</Form.Label>}
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}
