---
layout: docs
title: Navbar
description: Documentation and examples for Bootstrap's powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.
group: components
toc: true
---

## How it works

Here's what you need to know before getting started with the navbar:

- Navbars require a wrapping `.navbar` with `.navbar-expand{-sm|-md|-lg|-xl}` for responsive collapsing and [color scheme](#color-schemes) classes.
- Navbars and their contents are fluid by default. Use [optional containers](#containers) to limit their horizontal width.
- Use our [spacing]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) and [flex]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/) utility classes for controlling spacing and alignment within navbars.
- Navbars are responsive by default, but you can easily modify them to change that. Responsive behavior depends on our Collapse JavaScript plugin.
- Navbars are hidden by default when printing. Force them to be printed by adding `.d-print` to the `.navbar`. See the [display]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/display/) utility class.
- Ensure accessibility by using a `<nav>` element or, if using a more generic element such as a `<div>`, add a `role="navigation"` to every navbar to explicitly identify it as a landmark region for users of assistive technologies.

{% include callout-info-prefersreducedmotion.md %}

Read on for an example and list of supported sub-components.

## Supported content

Navbars come with built-in support for a handful of sub-components. Choose from the following as needed:

- `.navbar-brand` for your company, product, or project name.
- `.navbar-nav` for a full-height and lightweight navigation (including support for dropdowns).
- `.navbar-toggler` for use with our collapse plugin and other [navigation toggling](#responsive-behaviors) behaviors.
- `.form-inline` for any form controls and actions.
- `.navbar-text` for adding vertically centered strings of text.
- `.collapse.navbar-collapse` for grouping and hiding navbar contents by a parent breakpoint.

Here's an example of all the sub-components included in a responsive light-themed navbar that automatically collapses at the `lg` (large) breakpoint.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Link</Nav.Link>
            </Nav.Item>
            <Dropdown.AsNavItem>
              Dropdown
              <Dropdown.Menu>
                <Dropdown.Item as="a">Action</Dropdown.Item>
                <Dropdown.Item as="a">Another Action</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item as="a">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.AsNavItem>
            <Nav.Item>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav.Item>
          </Nav.List>
          <Form inline class="my-2 my-lg-0">
            <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

This example uses [color]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/colors/) (`bg-light`) and [spacing]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/) (`my-2`, `my-lg-0`, `mr-sm-0`, `my-sm-0`) utility classes.

### Brand

The `.navbar-brand` can be applied to most elements, but an anchor works best as some elements might require utility classes or custom styles.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand as="a">Navbar</Navbar.Brand>
      </Navbar>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand as="span" class="mb-0 h1">Navbar</Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Adding images to the `.navbar-brand` will likely always require custom styles or utilities to properly size. Here are some examples to demonstrate.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand as="a">
          <Logo width="30" height="30" />
        </Navbar.Brand>
      </Navbar>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand as="span">
          <Logo width="30" height="30" className="d-inline-block align-top" />
          {' '}Bootstrap
        </Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Nav

Navbar navigation links build on our `.nav` options with their own modifier class and require the use of [toggler classes](#toggler) for proper responsive styling. **Navigation in navbars will also grow to occupy as much horizontal space as possible** to keep your navbar contents securely aligned.

Active states—with `.active`—to indicate the current page can be applied directly to `.nav-link`s or their immediate parent `.nav-item`s.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Features</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Pricing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

And because we use classes for our navs, you can avoid the list-based approach entirely if you like.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav navbar class="mr-auto">
            <Nav.Item link active>Home <span class="sr-only">(current)</span></Nav.Item>
            <Nav.Item link>Features</Nav.Item>
            <Nav.Item link>Pricing</Nav.Item>
            <Nav.Item link disabled>Disabled</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

You may also utilize dropdowns in your navbar nav. Dropdown menus require a wrapping element for positioning, so be sure to use separate and nested elements for `.nav-item` and `.nav-link` as shown below.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Features</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Pricing</Nav.Link>
            </Nav.Item>
            <Dropdown.AsNavItem>
              Dropdown link
              <Dropdown.Menu>
                <Dropdown.Item as="a">Action</Dropdown.Item>
                <Dropdown.Item as="a">Another Action</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item as="a">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.AsNavItem>
          </Nav.List>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Forms

Place various form controls and components within a navbar with `.form-inline`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Form inline>
          <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
        </Form>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Immediate children elements in `.navbar` use flex layout and will default to `justify-content: space-between`. Use additional [flex utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/) as needed to adjust this behavior.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Form inline>
          <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
        </Form>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Input groups work, too:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Form inline>
          <Form.Input
            type="text"
            placeholder="Username"
            aria-label="Username"
            controlGroupedBy={({ children }) => 
              <InputGroup prepend="@">{children}</InputGroup>
            }
          />
        </Form>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Various buttons are supported as part of these navbar forms, too. This is also a great reminder that vertical alignment utilities can be used to align different sized elements.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Form inline>
          <Button outline theme="success">Main button</Button>
          <Button outline theme="secondary" size="sm">Smaller button</Button>
        </Form>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Text

Navbars may contain bits of text with the help of `.navbar-text`. This class adjusts vertical alignment and horizontal spacing for strings of text.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Text>
          Navbar text with an inline element
        </Navbar.Text>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Mix and match with other components and utilities as needed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>
          Navbar w/ text
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Features</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Pricing</Nav.Link>
            </Nav.Item>
          </Nav.List>
          <Navbar.Text>
            Navbar text with an inline element
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Color schemes

Theming the navbar has never been easier thanks to the combination of theming classes and `background-color` utilities. Choose from `.navbar-light` for use with light background colors, or `.navbar-dark` for dark background colors. Then, customize with `.bg-*` utilities.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      {[
        { theme: 'dark', bgTheme: 'dark', buttonTheme: 'info', },
        { theme: 'dark', bgTheme: 'primary', buttonTheme: 'light', },
        { theme: '', bgTheme: '', buttonTheme: 'primary', style: {backgroundColor: '#e3f2fd'} },

        { theme: 'light', bgTheme: 'light', buttonTheme: 'dark', },
        { theme: 'light', bgTheme: 'warning', buttonTheme: 'dark', },
        { theme: 'dark', bgTheme: 'danger', buttonTheme: 'light', },

      ].map(({ theme, bgTheme, buttonTheme, style }) => {
        return (
          <Navbar expandWhen="lg" theme={theme} bgTheme={bgTheme} style={{...style}}>
            <Navbar.Brand>Navbar</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav.List navbar class="mr-auto">
                <Nav.Item active>
                  <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Features</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>Pricing</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>About</Nav.Link>
                </Nav.Item>
              </Nav.List>
              <Form inline class="my-2 my-lg-0">
                <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <Button outline theme={buttonTheme} class="my-2 my-sm-0" type="submit">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        )
      })}
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Containers

Although it's not required, you can wrap a navbar in a `.container` to center it on a page or add one within to only center the contents of a [fixed or static top navbar](#placement).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Container>
        <Navbar expandWhen="lg" theme="light" bgTheme="light">
          <Navbar.Brand>Navbar</Navbar.Brand>
        </Navbar>
      </Container>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

When the container is within your navbar, its horizontal padding is removed at breakpoints lower than your specified `.navbar-expand{-sm|-md|-lg|-xl}` class. This ensures we're not doubling up on padding unnecessarily on lower viewports when your navbar is collapsed.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Placement

Use our [position utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/position/) to place navbars in non-static positions. Choose from fixed to the top, fixed to the bottom, or stickied to the top (scrolls with the page until it reaches the top, then stays there). Fixed navbars use `position: fixed`, meaning they're pulled from the normal flow of the DOM and may require custom CSS (e.g., `padding-top` on the `<body>`) to prevent overlap with other elements.

Also note that **`.sticky-top` uses `position: sticky`, which [isn't fully supported in every browser](https://caniuse.com/#feat=css-sticky)**.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light">
        <Navbar.Brand>Default</Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light" class="fixed-top">
        <Navbar.Brand>Fixed top</Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light" class="fixed-bottom">
        <Navbar.Brand>Fixed bottom</Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar theme="light" bgTheme="light" class="sticky-top">
        <Navbar.Brand>Sticky top</Navbar.Brand>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Responsive behaviors

Navbars can utilize `.navbar-toggler`, `.navbar-collapse`, and `.navbar-expand{-sm|-md|-lg|-xl}` classes to change when their content collapses behind a button. In combination with other utilities, you can easily choose when to show or hide particular elements.

For navbars that never collapse, add the `.navbar-expand` class on the navbar. For navbars that always collapse, don't add any `.navbar-expand` class.

### Toggler

Navbar togglers are left-aligned by default, but should they follow a sibling element like a `.navbar-brand`, they'll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggler. Below are examples of different toggle styles.

With no `.navbar-brand` shown in lowest breakpoint:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Brand>Hidden Brand</Navbar.Brand>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav.Item>
          </Nav.List>
          <Form inline class="my-2 my-lg-0">
            <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

With a brand name shown on the left and toggler on the right:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav.Item>
          </Nav.List>
          <Form inline class="my-2 my-lg-0">
            <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

With a toggler on the left and brand name on the right:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Navbar expandWhen="lg" theme="light" bgTheme="light">
        <Navbar.Toggle />
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Navbar.Collapse>
          <Nav.List navbar class="mr-auto">
            <Nav.Item active>
              <Nav.Link>Home <span class="sr-only">(current)</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav.Item>
          </Nav.List>
          <Form inline class="my-2 my-lg-0">
            <Form.Input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <Button outline theme="success" class="my-2 my-sm-0" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### External content

Sometimes you want to use the collapse plugin to trigger hidden content elsewhere on the page. Because our plugin works on the `id` and `data-target` matching, that's easily done!

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const collapseRef = React.useRef(null)

  return (
    <>
      <div class="pos-f-t">
        {Navbar.useCollapse(({ collapse }) => {
          return (
            <>
              <Collapse collapse={collapse}>
                <div class="bg-dark p-4">
                  <h5 class="text-white h4">Collapsed content</h5>
                  <span class="text-muted">Toggleable via the navbar brand.</span>
                </div>
              </Collapse>
              <Navbar expandWhen="lg" theme="dark" bgTheme="dark">
                <Navbar.Toggle />
              </Navbar>
            </>
          )
        })}
      </div>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}