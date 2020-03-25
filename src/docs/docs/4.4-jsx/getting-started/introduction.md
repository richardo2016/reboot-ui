---
layout: docs
title: Introduction
description: Get started with RebootUI, based on the world's most popular framework Bootstrap, for building responsive, mobile-first sites.
group: getting-started
redirect_from:
  - "/docs/"
  - "/docs/4.4/"
  - "/docs/4.4/getting-started/"
  - "/docs/getting-started/"
  - "/getting-started/"
toc: true
---

## Quick start

Looking to quickly add `reboot-ui` to your **(p)react** project? Using a package manager to install it.

```bash
npm install -S reboot-ui
```

or

```bash
yarn add reboot-ui
```

Create one **React** Component and use it in your `<App />`.

{% highlight jsx %}
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Button } from 'reboot-ui';

import 'reboot-ui/dist/index.css';

function BasicLayout () {
  return (
    <Layout.Row>
      <Layout.Col span="6">
        Side Left
      </Layout.Col>
      <Layout.Col span="18">
        Main Content
      </Layout.Col>
    </Layout.Row>
  )
}

function App () {
  return <BasicLayout />
}

ReactDOM.render(<App />, document.querySelector('#app'));
{% endhighlight %}

## Thrid dependencies

<details>
<summary class="text-primary mb-3">Show components dependent on 3rd JavaScript library</summary>
{% capture markdown %}
| Component | Dependencies |
|:--|--|
| Dropdown | [Popper.js] / [@popperjs/core] |
| Tooltip | [Popper.js] / [@popperjs/core] |
| Collapse | [react-transition-group] |
| Modal | [react-transition-group] |

[Popper.js]:https://popper.js.org/
[@popperjs/core]:https://www.npmjs.com/package/@popperjs/core
[react-transition-group]:https://www.npmjs.com/package/react-transition-group
{% endcapture %}
{{ markdown | markdownify | cheerio_addCls: 'table', 'table' }}
</details>

## Starter template

Be sure to have your pages set up with the latest design and development standards. That means using an HTML5 doctype and including a viewport meta tag for proper responsive behaviors. Put it all together and your pages should look like this:

{% highlight html %}
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Hello, world!</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./app.js"></script>
  </body>
</html>
{% endhighlight %}

That's all you need for overall page requirements. Visit the [Layout docs]({{ site.baseurl }}/docs/{{ site.docs_version }}/layout/overview/) or [our official examples]({{ site.baseurl }}/docs/{{ site.docs_version }}/examples/) to start laying out your site's content and components.

## Important globals

Bootstrap employs a handful of important global styles and settings that you'll need to be aware of when using it, all of which are almost exclusively geared towards the *normalization* of cross browser styles. Let's dive in.

### HTML5 doctype

Bootstrap requires the use of the HTML5 doctype. Without it, you'll see some funky incomplete styling, but including it shouldn't cause any considerable hiccups.

{% highlight html %}
<!doctype html>
<html lang="en">
  ...
</html>
{% endhighlight %}

### Responsive meta tag

Bootstrap is developed *mobile first*, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, **add the responsive viewport meta tag** to your `<head>`.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
{% endhighlight %}

You can see an example of this in action in the [starter template](#starter-template).

### Box-sizing

For more straightforward sizing in CSS, we switch the global `box-sizing` value from `content-box` to `border-box`. This ensures `padding` does not affect the final computed width of an element, but it can cause problems with some third party software like Google Maps and Google Custom Search Engine.

On the rare occasion you need to override it, use something like the following:

{% highlight css %}
.selector-for-some-widget {
  box-sizing: content-box;
}
{% endhighlight %}

With the above snippet, nested elements—including generated content via `::before` and `::after`—will all inherit the specified `box-sizing` for that `.selector-for-some-widget`.

Learn more about [box model and sizing at CSS Tricks](https://css-tricks.com/box-sizing/).

### Reboot

For improved cross-browser rendering, we use [Reboot]({{ site.baseurl }}/docs/{{ site.docs_version }}/content/reboot/) to correct inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.