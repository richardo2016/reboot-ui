---
layout: docs
title: Carousel
description: A slideshow component for cycling through elements—images or slides of text—like a carousel.
group: components
toc: true
---

## How it works

The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators.

In browsers where the [Page Visibility API](https://www.w3.org/TR/page-visibility/) is supported, the carousel will avoid sliding when the webpage is not visible to the user (such as when the browser tab is inactive, the browser window is minimized, etc.).

{% include callout-info-prefersreducedmotion.md %}

Please be aware that nested carousels are not supported, and carousels are generally not compliant with accessibility standards.

## Example

Carousels don't automatically normalize slide dimensions. As such, you may need to use additional utilities or custom styles to appropriately size content. While carousels support previous/next controls and indicators, they're not explicitly required. Add and customize as you see fit.

### Slides only

Here's a carousel with slides only. Note the presence of the `.d-block` and `.w-100` on carousel images to prevent browser default image alignment.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Carousel id="carouselExampleSlidesOnly">
        <Carousel.Item>
          <Carousel.PlaceholderImage
            as={PlaceholderImage}
            size="lg"
            class="d-block w-100"
            width={800}
            height={400}
            rectProps={{ fill: "#777" }}
            textProps={{ fill: "#555" }}
            label="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.PlaceholderImage
            as={PlaceholderImage}
            size="lg"
            class="d-block w-100"
            width={800}
            height={400}
            rectProps={{ fill: "#666" }}
            textProps={{ fill: "#444" }}
            label="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.PlaceholderImage
            as={PlaceholderImage}
            size="lg"
            class="d-block w-100"
            width={800}
            height={400}
            rectProps={{ fill: "#555" }}
            textProps={{ fill: "#333" }}
            label="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### With controls

Adding in the previous and next controls:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const slides = [
    {
      label: 'First slide',
    },
    {
      label: 'Second slide'
    },
    {
      label: 'Third slide'
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleControls" interval={3000}>
        {slides.map((slide, idx) => {
          return (
            <Carousel.Item>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### With indicators

You can also add the indicators to the carousel, alongside the controls, too.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const slides = [
    {
      label: 'First slide',
    },
    {
      label: 'Second slide'
    },
    {
      label: 'Third slide'
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleIndicators" ride="carousel">
        <Carousel.Indicators />
        {slides.map((slide, idx) => {
          return (
            <Carousel.Item>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### With captions

Add captions to your slides easily with the `<Carousel.Caption />` element within any `<Carousel.Item />`. They can be easily hidden on smaller viewports, as shown below, with optional [display utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/display/). We hide them initially with `.d-none` and bring them back on medium-sized devices with `.d-md-block`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const slides = [
    {
      label: 'First slide',
      caption: {
        title: 'First slide label',
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      }
    },
    {
      label: 'Second slide',
      caption: {
        title: 'Second slide label',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }
    },
    {
      label: 'Third slide',
      caption: {
        title: 'Third slide label',
        text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      }
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleCaptions" ride="carousel">
        <Carousel.Indicators />
        {slides.map((slide, idx) => {
          return (
            <Carousel.Item>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
              <Carousel.Caption class="d-none d-md-block">
                <h5>{slide.caption.title}</h5>
                <p>{slide.caption.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Crossfade

Set `crossFade={true}` to your carousel to animate slides with a fade transition instead of a slide.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const slides = [
    {
      label: 'First slide',
    },
    {
      label: 'Second slide',
    },
    {
      label: 'Third slide',
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleFade" crossFade ride="carousel">
        {slides.map((slide, idx) => {
          return (
            <Carousel.Item>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Individual `.carousel-item` interval

Set `interval` for each `<Carousel.Item />` to change the amount of time to delay between automatically cycling to the next item.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const slides = [
    {
      label: 'First slide',
      interval: 10000,
    },
    {
      label: 'Second slide',
      interval: 2000,
    },
    {
      label: 'Third slide',
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleInterval" ride="carousel">
        {slides.map((slide, idx) => {
          const interval = slide.interval
          return (
            <Carousel.Item interval={interval}>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
              <Carousel.Caption class="d-none d-md-block">
                <h5>Interval: {interval}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Control carousel with ArrowLeft/ArrowRight

Set `keyboard` to make carousel play on ArrowLeft/ArrowRight pressed

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [useKeyboard, setUseKeyboard] = React.useState(true)
  const slides = [
    {
      label: 'First slide',
    },
    {
      label: 'Second slide',
    },
    {
      label: 'Third slide',
    },
  ]

  return (
    <>
      <Carousel id="carouselExampleKeyboard" keyboard={useKeyboard}>
        {slides.map((slide, idx) => {
          const interval = slide.interval
          return (
            <Carousel.Item interval={interval}>
              <Carousel.PlaceholderImage
                as={PlaceholderImage}
                size="lg"
                class="d-block w-100"
                width={800}
                height={400}
                rectProps={{ fill: `#${777 - idx * 111}` }}
                textProps={{ fill: `#${555 - idx * 111}` }}
                label={slide.label}
              />
              <Carousel.Caption class="d-none d-md-block">
                <h5>{!useKeyboard ? 'Free from' : 'Controlled By'} Keyboard</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        <Carousel.Control prev />
        <Carousel.Control next />
      </Carousel>
      <div class="custom-control custom-switch mt-2">
        <Form.Checkbox
          custom
          id="customSwitchForKeyboard"
          label="Toggle this switch To enable/disable keyboard"
          checked={useKeyboard}
          onChange={React.useCallback((nativeEvent) => {
            setUseKeyboard(nativeEvent.target.checked)
          }, [])}
        />
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Change transition duration

The transition duration of `.carousel-item` can be changed with the `$carousel-transition` Sass variable before compiling or custom styles if you're using the compiled CSS. If multiple transitions are applied, make sure the transform transition is defined first (eg. `transition: transform 2s ease, opacity .5s ease-out`).

## React API

### Sub Components

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description |
| --- | --- |
| `Carousel.Indicators` | carousel indicators |
| `Carousel.Inner` | carousel inner wrapper |
| `Carousel.Caption` | carousel caption element |
| `Carousel.Item` | carousel item element |
| `Carousel.Control` | carousel control element |
| `Carousel.PlaceholderImage` | carousel placeholder widget |

{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered' }}
</div>

### Properties

<div class="rbt-properties-table-wrapper">
{% capture markdown %}
| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `slide` | whether using slide. | boolean | true  |
| `pause` | time slide pause. | Enum: `hover` | `hover` |
| `ride` | play mode of carousel. By default, carousel would start playing after user's first manual click; for `ride=carousel`, carousel would auto-start. | Enum: `carousel` | | 
| `interval` | duration carousel switch to next item | number | 5000 |
| `keyboard` | whether controlled by keyowrd arrowLeft/arrowRight. | boolean | false |
| `crossFade` | whether using cross face animation when playing. | boolean | false |
{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table table-bordered table-hover' }}
</div>