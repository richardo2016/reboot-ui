---
layout: docs
title: Alerts
description: Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
group: components
redirect_from:
  - "/components/"
  - "/docs/4.4/components/"
toc: true
---

## Examples

Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the eight **required** contextual `theme` type (e.g., `success`).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Alert theme={color.name}>
              A simple { color.name } alert—check it out!
            </Alert>
          )
        })
      }
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% include callout-warning-color-assistive-technologies.md %}

### Link color

Use the `Alert.Link` component to quickly provide matching colored links within any alert.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Alert theme={color.name}>
              A simple { color.name } alert with{' '}
              <Alert.Link href="#">
              an example link
              </Alert.Link>. 
              Give it a click if you like.
            </Alert>
          )
        })
      }
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Additional content

Alerts can also contain additional HTML elements like headings, paragraphs and dividers.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Alert theme="success">
        <Alert.Heading as="h4">
          Well done!
        </Alert.Heading>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr />
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </Alert>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Dismissing

Using the alert JavaScript plugin, it's possible to dismiss any alert inline. Here's how:

You can see this in action with a live demo:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Alert theme="warning" closable>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
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
| `Alert.Link` | `Alert`'s anchor element |
| `Alert.Heading` | `Alert`'s heading element, for case alert containing details |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `show` | whether `Alert` displaying, use it to controll Alert. | boolean | true |
| `fade` | whether `Alert` using animation. | boolean | true |
| `theme` | `Alert`'s theme type. | Enum: {{ site.rbtMdFragments.themeTypes }} |  |
| `closable` | whether dismissable. | boolean | false |
{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>