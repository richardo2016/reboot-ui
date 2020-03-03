---
layout: docs
title: Progress
description: Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
group: components
toc: true
---

## How it works

Progress components are built with two HTML elements, some CSS to set the width, and a few attributes. We don't use [the HTML5 `<progress>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), ensuring you can stack progress bars, animate them, and place text labels over them.

- We use the `.progress` as a wrapper to indicate the max value of the progress bar.
- We use the inner `.progress-bar` to indicate the progress so far.
- The `.progress-bar` requires an inline style, utility class, or custom CSS to set their width.
- The `.progress-bar` also requires some `role` and `aria` attributes to make it accessible.

Put that all together, and you have the following examples.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Progress><Progress.Bar value={0} /></Progress>
      <Progress><Progress.Bar value={25} /></Progress>
      <Progress><Progress.Bar value={50} /></Progress>
      <Progress><Progress.Bar value={75} /></Progress>
      <Progress><Progress.Bar value={100} /></Progress>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Labels

Add labels to your progress bars by placing text within the `.progress-bar`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Progress><Progress.Bar value={25} label="25%" /></Progress>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Height

We only set a `height` value on the `.progress`, so if you change that value the inner `.progress-bar` will automatically resize accordingly.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Progress style={{height: 1}}><Progress.Bar value={25} /></Progress>
      <Progress style={{height: 20}}><Progress.Bar value={25} /></Progress>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Backgrounds

Use background utility classes to change the appearance of individual progress bars.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const tuples = [
    { value: 25, theme: 'success' },
    { value: 50, theme: 'info' },
    { value: 75, theme: 'warning' },
    { value: 100, theme: 'danger' },
  ]
  return (
    <>
      {tuples.map(({ value, theme }) => {
        return <Progress><Progress.Bar bgTheme={theme} value={value} /></Progress>
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Multiple bars

Include multiple progress bars in a progress component if you need.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const tuples = [
    { value: 15, theme: '' },
    { value: 30, theme: 'success' },
    { value: 20, theme: 'info' },
  ]
  return (
    <>
      <Progress>
        {tuples.map(({ value, theme }) => {
          return <Progress.Bar bgTheme={theme} value={value} />
        })}
      </Progress>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Striped

Add `.progress-bar-striped` to any `.progress-bar` to apply a stripe via CSS gradient over the progress bar's background color.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const tuples = [
    { value: 10, theme: '' },
    { value: 25, theme: 'success' },
    { value: 50, theme: 'info' },
    { value: 75, theme: 'warning' },
    { value: 100, theme: 'danger' },
  ]
  return (
    <>
      {tuples.map(({ value, theme }) => {
        return <Progress><Progress.Bar striped bgTheme={theme} value={value} /></Progress>
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Animated stripes

The striped gradient can also be animated. Add `.progress-bar-animated` to `.progress-bar` to animate the stripes right to left via CSS3 animations.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ animated, setAnimated ] = React.useState(true)

  return (
    <>
      <Progress><Progress.Bar striped animated={animated} bgTheme={''} value={75} /></Progress>
      <Button
        type="secondary"
        class="bd-toggle-animated-progress"
        onClick={() => {
          setAnimated(!animated)
        }}
      >
        Toggle animation
      </Button>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}