---
layout: docs
title: Spinners
description: Indicate the loading state of a component or page with Bootstrap spinners, built entirely with HTML, CSS, and no JavaScript.
group: components
toc: true
---

## About

Bootstrap "spinners" can be used to show the loading state in your projects. They're built only with HTML and CSS, meaning you don't need any JavaScript to create them. You will, however, need some custom JavaScript to toggle their visibility. Their appearance, alignment, and sizing can be easily customized with our amazing utility classes.

For accessibility purposes, each loader here includes `role="status"` and a nested `<span class="sr-only">Loading...</span>`.

## Border spinner

Use the border spinners for a lightweight loading indicator.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Spinner type="border">
        <span class="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Colors

The border spinner uses `currentColor` for its `border-color`, meaning you can customize the color with [text color utilities][color]. You can use any of our text color utilities on the standard spinner.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors'].map(theme => {
        return (
          <Spinner class="mr-1" type="border" color={theme.name}>
            <span class="sr-only">Loading...</span>
          </Spinner>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% capture callout %}
**Why not use `border-color` utilities?** Each border spinner specifies a `transparent` border for at least one side, so `.border-{color}` utilities would override that.
{% endcapture %}
{% include callout.html content=callout type="info" %}

## Growing spinner

If you don't fancy a border spinner, switch to the grow spinner. While it doesn't technically spin, it does repeatedly grow!

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Spinner type="grow">
        <span class="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Once again, this spinner is built with `currentColor`, so you can easily change its appearance with [text color utilities][color]. Here it is in blue, along with the supported variants.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors'].map(theme => {
        return (
          <Spinner class="mr-1" type="grow" color={theme.name}>
            <span class="sr-only">Loading...</span>
          </Spinner>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Alignment

Spinners in Bootstrap are built with `rem`s, `currentColor`, and `display: inline-flex`. This means they can easily be resized, recolored, and quickly aligned.

### Margin

Use [margin utilities][margin] like `.m-5` for easy spacing.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Spinner type="border" class="m-5">
        <span class="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

### Placement

Use [flexbox utilities][flex], [float utilities][float], or [text alignment][text] utilities to place spinners exactly where you need them in any situation.

#### Flex

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <div class="d-flex justify-content-center">
        <Spinner type="border">
          <span class="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <div class="d-flex align-items-center">
        <strong>Loading...</strong>
        <Spinner type="border" class="ml-auto" aria-hidden="true" />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Floats

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <div class="clearfix">
        <Spinner type="border" class="float-right">
          <span class="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

#### Text align

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <div class="text-center">
        <Spinner type="border">
          <span class="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Size

Add `.spinner-border-sm` and `.spinner-grow-sm` to make a smaller spinner that can quickly be used within other components.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Spinner type="border" size="sm">
        <span class="sr-only">Loading...</span>
      </Spinner>
      <Spinner type="grow" size="sm">
        <span class="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

Or, use custom CSS or inline styles to change the dimensions as needed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Spinner type="border" style={{width: '3rem', 'height': '3rem'}}>
        <span class="sr-only">Loading...</span>
      </Spinner>
      <Spinner type="grow" style={{width: '3rem', 'height': '3rem'}}>
        <span class="sr-only">Loading...</span>
      </Spinner>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Buttons

Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner element and utilize button text as needed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button type="primary" disabled class="mr-1">
        <Spinner size="sm" type="border" aria-hidden="true" />
        <span class="sr-only">Loading...</span>
      </Button>
      <Button type="primary" disabled class="mr-1">
        <Spinner size="sm" type="border" aria-hidden="true" class="mr-1" />
        Loading...
      </Button>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button type="primary" disabled class="mr-1">
        <Spinner size="sm" type="grow" aria-hidden="true" />
        <span class="sr-only">Loading...</span>
      </Button>
      <Button type="primary" disabled class="mr-1">
        <Spinner size="sm" type="grow" aria-hidden="true" class="mr-1" />
        Loading...
      </Button>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

[color]:   {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/colors/
[display]: {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/display/
[flex]:    {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/
[float]:   {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/float/
[margin]:  {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/
[sizing]:  {{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/sizing/
[text]:    {{ site.baseurl }}/docs/{{ site.docs_version }}/content/typography/
