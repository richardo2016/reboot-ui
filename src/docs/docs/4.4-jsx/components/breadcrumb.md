---
layout: docs
title: Breadcrumb
description: Indicate the current page's location within a navigational hierarchy that automatically adds separators via CSS.
group: components
---

## Example

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active aria-current="page">Home</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.Item><a href="#">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item active aria-current="page">Library</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb>
        <Breadcrumb.Item><a href="#">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="#">Library</a></Breadcrumb.Item>
        <Breadcrumb.Item active aria-current="page">Data</Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Changing the separator

Separators are automatically added in CSS through [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) and [`content`](https://developer.mozilla.org/en-US/docs/Web/CSS/content). They can be changed by changing `$breadcrumb-divider`. The [quote](https://sass-lang.com/documentation/functions/string#quote) function is needed to generate the quotes around a string, so if you want `>` as separator, you can use this:

```scss
$breadcrumb-divider: quote(">");
```

It's also possible to use a **base64 embedded SVG icon**:

```scss
$breadcrumb-divider: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0yLjUgMEwxIDEuNSAzLjUgNCAxIDYuNSAyLjUgOGw0LTQtNC00eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+);
```

The separator can be removed by setting `$breadcrumb-divider` to `none`:

```scss
$breadcrumb-divider: none;
```

## Accessibility

Since breadcrumbs provide a navigation, it's a good idea to add a meaningful label such as `aria-label="breadcrumb"` to describe the type of navigation provided in the `<nav>` element, as well as applying an `aria-current="page"` to the last item of the set to indicate that it represents the current page.

For more information, see the [WAI-ARIA Authoring Practices for the breadcrumb pattern](https://www.w3.org/TR/wai-aria-practices/#breadcrumb).

## React API

### Sub Components

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description |
| --- | --- |
| `Breadcrumb.Item` | `Breadcrumb`'s footprint item. |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties of `<Breadcrumb.Item />`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `active` | if active breadcrumb item. | boolean | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>