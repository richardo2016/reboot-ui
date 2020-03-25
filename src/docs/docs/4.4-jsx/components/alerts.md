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

Alerts are available for any length of text, as well as an optional dismiss button. For proper styling, use one of the eight **required** contextual classes (e.g., `.alert-success`). For inline dismissal, use the [alerts jQuery plugin](#dismissing).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Alert type={color.name}>
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

Use the `.alert-link` utility class to quickly provide matching colored links within any alert.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Alert type={color.name}>
              A simple { color.name } alert with 
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
      <Alert type="success">
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

- Be sure you've loaded the alert plugin, or the compiled Bootstrap JavaScript.
- If you're building our JavaScript from source, it [requires `util.js`]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/javascript/#util). The compiled version includes this.
- Add a dismiss button and the `.alert-dismissible` class, which adds extra padding to the right of the alert and positions the `.close` button.
- On the dismiss button, add the `data-dismiss="alert"` attribute, which triggers the JavaScript functionality. Be sure to use the `<button>` element with it for proper behavior across all devices.
- To animate alerts when dismissing them, be sure to add the `.fade` and `.show` classes.

You can see this in action with a live demo:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Alert type="warning" closable>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## JavaScript behavior

### Triggers

Enable dismissal of an alert via JavaScript:

{% highlight js %}
$('.alert').alert()
{% endhighlight %}

Or with `data` attributes on a button **within the alert**, as demonstrated above:

{% highlight html %}
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
{% endhighlight %}

Note that closing an alert will remove it from the DOM.

### Methods

| Method | Description |
| --- | --- |
| `$().alert()` | Makes an alert listen for click events on descendant elements which have the `data-dismiss="alert"` attribute. (Not necessary when using the data-api's auto-initialization.) |
| `$().alert('close')` | Closes an alert by removing it from the DOM. If the `.fade` and `.show` classes are present on the element, the alert will fade out before it is removed. |
| `$().alert('dispose')` | Destroys an element's alert. |

{% highlight js %}$('.alert').alert('close'){% endhighlight %}

### Events

Bootstrap's alert plugin exposes a few events for hooking into alert functionality.

| Event | Description |
| --- | --- |
| `close.bs.alert` | This event fires immediately when the <code>close</code> instance method is called. |
| `closed.bs.alert` | This event is fired when the alert has been closed (will wait for CSS transitions to complete). |

{% highlight js %}
$('#myAlert').on('closed.bs.alert', function () {
  // do something...
})
{% endhighlight %}
