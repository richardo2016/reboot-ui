---
layout: docs
title: Badges
description: Documentation and examples for badges, our small count and labeling component.
group: components
toc: true
---

## Example

Badges scale to match the size of the immediate parent element by using relative font sizing and `em` units.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {Array.apply(null, {length: 6})
        .map((_, idx) => {
          const JSXEl = `h${idx + 1}`
          return (
            <JSXEl>
              Example heading <Badge theme="secondary">New</Badge>
            </JSXEl>
          )
        })
      }
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Badges can be used as part of links or buttons to provide a counter.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button theme="primary">
        Notifications <Badge theme="light">4</Badge>
      </Button>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.

Unless the context is clear (as with the "Notifications" example, where it is understood that the "4" is the number of notifications), consider including additional context with a visually hidden piece of additional text.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Button theme="primary">
        Profile <Badge theme="light">9</Badge>
        <span class="sr-only">unread messages</span>
      </Button>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Contextual variations

Add any of the below mentioned modifier classes to change the appearance of a badge.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Badge theme={color.name} class="mr-1">
              {stringUtils.ucfirst(color.name)}
            </Badge>
          )
        })
      }
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% include callout-warning-color-assistive-technologies.md %}

## Pill badges

Use the `pill` property to make badges more rounded (with a larger `border-radius` and additional horizontal `padding`). Useful if you miss the badges from v3.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Badge theme={color.name} pill class="mr-1">
              {stringUtils.ucfirst(color.name)}
            </Badge>
          )
        })
      }
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Links

Using the contextual `.badge-*` classes on an `<a>` element quickly provide _actionable_ badges with hover and focus states.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors']
        .map(color => {
          return (
            <Badge href="#" as="a" theme={color.name} class="mr-1">
              {stringUtils.ucfirst(color.name)}
            </Badge>
          )
        })
      }
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
| `pill` | whether using pill style. | boolean | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>