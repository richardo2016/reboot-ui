---
layout: docs
title: Jumbotron
description: Lightweight, flexible component for showcasing hero unit style content.
group: components
---

A lightweight, flexible component that can optionally extend the entire viewport to showcase key marketing messages on your site.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Jumbotron>
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <Button as="a" href="#" theme="primary" size="lg">Learn more</Button>
      </Jumbotron>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

To make the jumbotron full width, and without rounded corners, add the `.jumbotron-fluid` modifier class and add a `.container` or `.container-fluid` within.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 class="display-4">Fluid jumbotron</h1>
          <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}
