---
layout: docs
title: Cards
description: Bootstrap's cards provide a flexible and extensible content container with multiple variants and options.
group: components
toc: true
---

## About

A **card** is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. If you're familiar with Bootstrap 3, cards replace our old panels, wells, and thumbnails. Similar functionality to those components is available as modifier classes for cards.

## Example

Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no `margin` by default, so use [spacing utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) as needed.

Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they'll naturally fill the full width of its parent element. This is easily customized with our various [sizing options](#sizing).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Typical
        style="width: 18rem;"
        title={`Card title`}
        text={`Some quick example text to build on the card title and make up the bulk of the card's content.`}
      >
        <Button theme="primary">Go somewhere</Button>
      </Card.Typical>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Content types

Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what's supported.

### Body

The building block of a card is the `.card-body`. Use it whenever you need a padded section within a card.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card>
        <Card.Body>
          This is some text within a card body.
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Titles, text, and links

Card titles are used by adding `.card-title` to a `<h*>` tag. In the same way, links are added and placed next to each other by adding `.card-link` to an `<a>` tag.

Subtitles are used by adding a `.card-subtitle` to a `<h*>` tag. If the `.card-title` and the `.card-subtitle` items are placed in a `.card-body` item, the card title and subtitle are aligned nicely.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Title sub class="mb-2 text-muted">Card subtitle</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <Card.Link href={`javascript:;`}>Card link</Card.Link>
          <Card.Link href={`javascript:;`}>Another link</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Images

`.card-img-top` places an image to the top of the card. With `.card-text`, text can be added to the card. Text within `.card-text` can also be styled with the standard HTML tags.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Image as={PlaceholderImage} height="180" className="bd-placeholder-img" />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### List groups

Create lists of content in a card with a flush list group.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Header>
          Featured
        </Card.Header>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Kitchen sink

Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Image as={PlaceholderImage} height="180" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <Card.Body>
          <Card.Link>Card Link</Card.Link>
          <Card.Link>Another link</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Header and footer

Add an optional header and/or footer within a card.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Card headers can be styled by adding `.card-header` to `<h*>` elements.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card>
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card>
        <Card.Header>Quote</Card.Header>
        <Card.Body>
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer class="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Sizing

Cards assume no specific `width` to start, so they'll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.

### Using grid markup

Using the grid, wrap cards in columns and rows as needed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
              <Button theme="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
              <Button theme="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Using utilities

Use our handful of [available sizing utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/sizing/) to quickly set a card's width.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="w-75">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card class="w-50">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Using custom CSS

Use custom CSS in your stylesheets or as inline styles to set a width.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Text alignment

You can quickly change the text alignment of any card—in its entirety or specific parts—with our [text align classes]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/text/#text-alignment).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card style="width: 18rem;">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card class="text-center" style="width: 18rem;">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card class="text-right" style="width: 18rem;">
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Navigation

Add some navigation to a card's header (or block) with Bootstrap's [nav components]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/navs/).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="text-center">
        <Card.Header>
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="text-center">
        <Card.Header>
          <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
          <Button theme="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Images

Cards include a few options for working with images. Choose from appending "image caps" at either end of a card, overlaying images with card content, or simply embedding the image in a card.

### Image caps

Similar to headers and footers, cards can include top and bottom "image caps"—images at the top or bottom of a card.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="mb-3">
        <Card.Image as={PlaceholderImage} height="180" class="bd-placeholder-img" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          <Card.Text>
            <small class="text-muted">Last updated 3 mins ago</small>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          <Card.Text>
            <small class="text-muted">Last updated 3 mins ago</small>
          </Card.Text>
        </Card.Body>
        <Card.Image as={PlaceholderImage} height="180" class="bd-placeholder-img" />
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Image overlays

Turn an image into a card background and overlay your card's text. Depending on the image, you may or may not need additional styles or utilities.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="bg-dark text-white">
        <Card.Image as={PlaceholderImage} height="270" class="bd-placeholder-img bd-placeholder-img-lg">Card Image</Card.Image>
        <Card.ImageOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImageOverlay>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% capture callout %}
Note that content should not be larger than the height of the image. If content is larger than the image the content will be displayed outside the image.
{% endcapture %}
{% include callout.html content=callout type="info" %}

## Horizontal

Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with `.no-gutters` and use `.col-md-*` classes to make the card horizontal at the `md` breakpoint. Further adjustments may be needed depending on your card content.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card class="mb-3" style="max-width: 540px;">
        <Row class="no-gutters">
          <Col md={4}>
            <Card.Image as={PlaceholderImage} class="bd-placeholder-img" height="250">Image</Card.Image>
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
              <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Card styles

Cards include various options for customizing their backgrounds, borders, and color.

### Background and color

Use [text and background utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/colors/) to change the appearance of a card.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors'].map(theme => {
        return (
          <Card theme={theme.name} class="mb-3" style="max-width: 18rem;">
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title>{stringUtils.ucfirst(theme.name)} card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% include callout-warning-color-assistive-technologies.md %}

### Border

Use [border utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/borders/) to change just the `border-color` of a card. Note that you can put `.text-{color}` classes on the parent `.card` or a subset of the card's contents as shown below.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {site.data['theme-colors'].map(theme => {
        return (
          <Card borderTheme={theme.name} class="mb-3" style="max-width: 18rem;">
            <Card.Header>Header</Card.Header>
            <Card.Body
              {...theme.name !== 'light' && { theme: theme.name }}
            >
              <Card.Title>{stringUtils.ucfirst(theme.name)} card title</Card.Title>
              <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Mixins utilities

You can also change the borders on the card header and footer as needed, and even remove their `background-color` with `.bg-transparent`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card borderTheme="success" class="mb-3" style="max-width: 18rem;">
        <Card.Header borderTheme="success" class="bg-transparent">Header</Card.Header>
        <Card.Body theme="success">
          <Card.Title>Success card title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        </Card.Body>
        <Card.Footer borderTheme="success" class="bg-transparent">Footer</Card.Footer>
      </Card>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Card layout

In addition to styling the content within cards, Bootstrap includes a few options for laying out series of cards. For the time being, **these layout options are not yet responsive**.

### Card groups

Use card groups to render cards as a single, attached element with equal width and height columns. Card groups use `display: flex;` to achieve their uniform sizing.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Group>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
      </Card.Group>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

When using card groups with footers, their content will automatically line up.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Group>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
      </Card.Group>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Card decks

Need a set of equal width and height cards that aren't attached to one another? Use card decks.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Group deck>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
      </Card.Group>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Just like with card groups, card footers in decks will automatically line up.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Group deck>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</Card.Text>
          </Card.Body>
          <Card.Footer><small class="text-muted">Last updated 3 mins ago</small></Card.Footer>
        </Card>
      </Card.Group>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Grid cards

Use the Bootstrap grid system and its [`.row-cols` classes]({{ site.baseurl }}/docs/{{ site.docs_version }}/layout/grid/#row-columns) to control how many grid columns (wrapped around your cards) you show per row. For example, here's `.row-cols-1` laying out the cards on one column, and `.row-cols-md-2` splitting four cards to equal width across multiple rows, from the medium breakpoint up.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Row rowCols={1} md={{ rowCols: 2 }}>
        {[
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          'This is a longer card with supporting text below as a natural lead-in to additional content.',
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        ].map((text, idx) => {
          return (
            <Col class="mb-4">
              <Card>
                <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Change it to `.row-cols-3` and you'll see the fourth card wrap.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Row rowCols={1} md={{ rowCols: 3 }}>
        {[
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          'This is a longer card with supporting text below as a natural lead-in to additional content.',
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        ].map((text, idx) => {
          return (
            <Col class="mb-4">
              <Card>
                <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

When you need equal height, add `.h-100` to the cards. If you want equal heights by default, you can set `$card-height: 100%` in Sass.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Row rowCols={1} md={{ rowCols: 3 }}>
        {[
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
          'This is a short card.',
          'This is a longer card with supporting text below as a natural lead-in to additional content.',
          'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        ].map((text, idx) => {
          return (
            <Col class="mb-4">
              <Card class="h-100">
                <Card.Image as={PlaceholderImage} height="180" class="card-img-top">Image cap</Card.Image>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Card columns

Cards can be organized into [Masonry](https://masonry.desandro.com/)-like columns with just CSS by wrapping them in `.card-columns`. Cards are built with CSS `column` properties instead of flexbox for easier alignment. Cards are ordered from top to bottom and left to right.

**Heads up!** Your mileage with card columns may vary. To prevent cards breaking across columns, we must set them to `display: inline-block` as `column-break-inside: avoid` isn't a bulletproof solution yet.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Card.Columns>
        <Card>
          <Card.Image as={PlaceholderImage} height="160" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title that wraps to a new line</Card.Title>
            <Card.Text>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</Card.Text>
          </Card.Body>
        </Card>
        <Card class="p-3">
          <blockquote class="blockquote mb-0 card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
              <small class="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="160" class="card-img-top">Image cap</Card.Image>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has supporting text below as a natural lead-in to additional content.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card theme="primary" class="text-center p-3">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
            <footer class="blockquote-footer text-white">
              <small>
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card class="text-center">
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This card has a regular title and short paragraphy of text below it.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Image as={PlaceholderImage} height="260" class="card-img-top">Image cap</Card.Image>
        </Card>
        <Card class="p-3 text-right">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
              <small class="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</Card.Text>
            <Card.Text><small class="text-muted">Last updated 3 mins ago</small></Card.Text>
          </Card.Body>
        </Card>
      </Card.Columns>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Card columns can also be extended and customized with some additional code. Shown below is an extension of the `.card-columns` class using the same CSS we use—CSS columns— to generate a set of responsive tiers for changing the number of columns.

{% highlight scss %}
.card-columns {
  @include media-breakpoint-only(lg) {
    column-count: 4;
  }
  @include media-breakpoint-only(xl) {
    column-count: 5;
  }
}
{% endhighlight %}

## React API

### Sub Components

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description |
| --- | --- |
| `Card.Title` | title widget |
| `Card.Header` | header widget |
| `Card.Footer` | footer widget |
| `Card.Body` | body widget |
| `Card.Image` | image element |
| `Card.ImageOverlay` | image overlay element |
| `Card.Text` | text element |
| `Card.Link` | link anchor element |
| `Card.Group` | group element |
| `Card.Columns` | columns layout |
| `Card.Typical` | typical card configurable |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `theme` | theme type. | Enum: {{ site.rbtMdFragments.themeTypes }} |  |
| `borderTheme` | theme type. | Enum: {{ site.rbtMdFragments.themeTypes }} |  |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>