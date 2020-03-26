---
layout: docs
title: List group
description: List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.
group: components
toc: true
---

## Basic example

The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with your own CSS as needed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Active items

Add `.active` to a `.list-group-item` to indicate the current active selection.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item active>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Disabled items

Add `.disabled` to a `.list-group-item` to make it _appear_ disabled. Note that some elements with `.disabled` will also require custom JavaScript to fully disable their click events (e.g., links).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Links and buttons

Use `<a>`s or `<button>`s to create _actionable_ list group items with hover, disabled, and active states by adding `.list-group-item-action`. We separate these pseudo-classes to ensure list groups made of non-interactive elements (like `<li>`s or `<div>`s) don't provide a click or tap affordance.

Be sure to **not use the standard `.btn` classes here**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.LinkItem active>Cras justo odio</ListGroup.LinkItem>
        <ListGroup.LinkItem>Dapibus ac facilisis in</ListGroup.LinkItem>
        <ListGroup.LinkItem>Morbi leo risus</ListGroup.LinkItem>
        <ListGroup.LinkItem>Porta ac consectetur ac</ListGroup.LinkItem>
        <ListGroup.LinkItem>Vestibulum at eros</ListGroup.LinkItem>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

With `<button>`s, you can also make use of the `disabled` attribute instead of the `.disabled` class. Sadly, `<a>`s don't support the disabled attribute.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.ButtonItem active>Cras justo odio</ListGroup.ButtonItem>
        <ListGroup.ButtonItem>Dapibus ac facilisis in</ListGroup.ButtonItem>
        <ListGroup.ButtonItem>Morbi leo risus</ListGroup.ButtonItem>
        <ListGroup.ButtonItem>Porta ac consectetur ac</ListGroup.ButtonItem>
        <ListGroup.ButtonItem>Vestibulum at eros</ListGroup.ButtonItem>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Flush

Add `.list-group-flush` to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup flush>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Horizontal

Add `.list-group-horizontal` to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant `.list-group-horizontal-{sm|md|lg|xl}` to make a list group horizontal starting at that breakpoint's `min-width`. Currently **horizontal list groups cannot be combined with flush list groups.**

**ProTip:** Want equal-width list group items when horizontal? Add `.flex-fill` to each list group item.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      {site.data.breakpoints.map(({ breakpoint, abbr }) => {
        return (
          <ListGroup horizontal size={abbr ? breakpoint : ''} class="mb-3">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          </ListGroup>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Contextual classes

Use contextual classes to style list items with a stateful background and color.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        {site.data['theme-colors'].map(({ name: theme }) => {
          return (
              <ListGroup.Item theme={theme}>A simple { theme } list group item</ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Contextual classes also work with `.list-group-item-action`. Note the addition of the hover styles here not present in the previous example. Also supported is the `.active` state; apply it to indicate an active selection on a contextual list group item.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  return (
    <>
      <ListGroup>
        <ListGroup.LinkItem action>Dapibus ac facilisis in</ListGroup.LinkItem>
        {site.data['theme-colors'].map(({ name: theme }) => {
          return (
              <ListGroup.LinkItem theme={theme}>A simple { theme } list group item</ListGroup.LinkItem>
          )
        })}
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% include callout-warning-color-assistive-technologies.md %}

## With badges

Add badges to any list group item to show unread counts, activity, and more with the help of some [utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item class="d-flex justify-content-between align-items-center">
          Cras justo odio
          <Badge type="primary" pill>14</Badge>
        </ListGroup.Item>
        <ListGroup.Item class="d-flex justify-content-between align-items-center">
          Dapibus ac facilisis in
          <Badge type="primary" pill>2</Badge>
        </ListGroup.Item>
        <ListGroup.Item class="d-flex justify-content-between align-items-center">
          Morbi leo risus
          <Badge type="primary" pill>1</Badge>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Custom content

Add nearly any HTML within, even for linked list groups like the one below, with the help of [flexbox utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item active>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroup.Item>
        <ListGroup.Item>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small class="text-muted">Donec id elit non mi porta.</small>
        </ListGroup.Item>
        <ListGroup.Item>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small class="text-muted">Donec id elit non mi porta.</small>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Controlled Items

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const listViews = [
    {
      key: 'home',
      text: 'Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt sit sunt nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim tempor sunt voluptate consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip eiusmod dolor. Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.',
    },
    {
      key: 'profile',
      text: 'Cupidatat quis ad sint excepteur laborum in esse qui. Et excepteur consectetur ex nisi eu do cillum ad laborum. Mollit et eu officia dolore sunt Lorem culpa qui commodo velit ex amet id ex. Officia anim incididunt laboris deserunt anim aute dolor incididunt veniam aute dolore do exercitation. Dolor nisi culpa ex ad irure in elit eu dolore. Ad laboris ipsum reprehenderit irure non commodo enim culpa commodo veniam incididunt veniam ad.',
    },
    {
      key: 'messages',
      text: 'Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum voluptate. Irure Lorem et laboris nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim tempor. Consectetur est minim nostrud nostrud consectetur irure labore voluptate irure. Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et deserunt culpa sit eiusmod deserunt. Consectetur et fugiat anim do eiusmod aliquip nulla laborum elit adipisicing pariatur cillum.',
    },
    {
      key: 'settings',
      text: 'Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia magna sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore aute occaecat ea aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco nisi amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor eiusmod eu pariatur culpa mollit in irure.',
    },
  ]

  const [ activeKey, setActiveKey ] = React.useState(listViews[0].key)

  return (
    <>
      <Row>
        <Col span={4}>
          <ListGroup id={`list-tab${uuid}`} role="tablist">
            {listViews.map(({ key: title, text }) => {
              return (
                <ListGroup.LinkItem
                  active={title === activeKey}
                  id={`list-${title}-list${uuid}`}
                  role="tab"
                  aria-controls={`list-${title}${uuid}`}
                  onClick={() => { setActiveKey(title) }}
                >
                  {stringUtils.ucfirst(title)}
                </ListGroup.LinkItem>
              )
            })}
          </ListGroup>
        </Col>
        <Col span={8}>
          <NavTab id={`nav-tabContent${uuid}`}>
            {listViews.map(({ key: title, text }) => {
              return (
                <NavTab.Pane
                  active={title === activeKey}
                  id={`list-${title}${uuid}`}
                  aria-labelledby={`list-${title}-list${uuid}`}
                >
                  <p>{text}</p>
                </NavTab.Pane>
              )
            })}
          </NavTab>
        </Col>
      </Row>
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
| `ListGroup.Item` | styled item in list group.  |
| `ListGroup.LinkItem` | |
| `ListGroup.ButtonItem` | |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `size` | list group size. | Enum: {{ site.rbtMdFragments.breakpoints }} |  |
| `flush` | whether using flush style. | `boolean` | false  |
| `horizontal` | whether using horizontal style. | `boolean` | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

<br />

### Properties of `<ListGroup.Item>`

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `theme` | theme type. | Enum: {{ site.rbtMdFragments.themeTypes }} | |
| `active` | whether active. | `boolean` | false  |
| `disabled` | whether disabled. | `boolean` | false  |
| `action` | whether action. | `boolean` | false  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}

</div>

### Properties of `<ListGroup.LinkItem>`

Same with `<ListGroup.Item>`, with `as` property always set `a`.

### Properties of `<ListGroup.ButtonItem>`

Same with `<ListGroup.Item>`, with `as` property always set `button`.
