---
layout: docs
title: Navs
description: Documentation and examples for how to use Bootstrap's included navigation components.
group: components
toc: true
---

## Base nav

Navigation available in Bootstrap share general markup and styles, from the base `.nav` class to the active and disabled states. Swap modifier classes to switch between each style.

The base `.nav` component is built with flexbox and provide a strong foundation for building all types of navigation components. It includes some style overrides (for working with lists), some link padding for larger hit areas, and basic disabled styling.

{% capture callout %}
The base `.nav` component does not include any `.active` state. The following examples include the class, mainly to demonstrate that this particular class does not trigger any special styling.
{% endcapture %}
{% include callout.html content=callout type="info" %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List>
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Classes are used throughout, so your markup can be super flexible. Use `<ul>`s like above, `<ol>` if the order of your items is important, or roll your own with a `<nav>` element. Because the `.nav` uses `display: flex`, the nav links behave the same as nav items would, but without the extra markup.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav>
        <Nav.Link active href="#">Active</Nav.Link>
        <Nav.Link href="#">Link</Nav.Link>
        <Nav.Link href="#">Link</Nav.Link>
        <Nav.Link disabled href="#">Disabled</Nav.Link>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Available styles

Change the style of `.nav`s component with modifiers and utilities. Mix and match as needed, or build your own.

### Horizontal alignment

Change the horizontal alignment of your nav with [flexbox utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/layout/grid/#horizontal-alignment). By default, navs are left-aligned, but you can easily change them to center or right aligned.

Centered with `.justify-content-center`:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav class="justify-content-center">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Right-aligned with `.justify-content-end`:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav class="justify-content-end">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Vertical

Stack your navigation by changing the flex item direction with the `.flex-column` utility. Need to stack them on some viewports but not others? Use the responsive versions (e.g., `.flex-sm-column`).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List class="flex-column">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

As always, vertical navigation is possible without `<ul>`s, too.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav class="flex-column">
        <Nav.Link active href="#">Active</Nav.Link>
        <Nav.Link href="#">Link</Nav.Link>
        <Nav.Link href="#">Link</Nav.Link>
        <Nav.Link disabled href="#">Disabled</Nav.Link>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Tabs

Takes the basic nav from above and adds the `.nav-tabs` class to generate a tabbed interface. Use them to create tabbable regions with our [tab JavaScript plugin](#javascript-behavior).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List theme="tabs">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Pills

Take that same HTML, but use `.nav-pills` instead:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List theme="pills">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Fill and justify

Force your `.nav`'s contents to extend the full available width one of two modifier classes. To proportionately fill all available space with your `.nav-item`s, use `.nav-fill`. Notice that all horizontal space is occupied, but not every nav item has the same width.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List theme="pills fill">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Much longer nav link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

When using a `<nav>`-based navigation, be sure to include `.nav-item` on the anchors.

For equal-width elements, use `.nav-justified`. All horizontal space will be occupied by nav links, but unlike the `.nav-fill` above, every nav item will be the same width.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav.List theme="pills justified">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Much longer nav link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav.List>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

Similar to the `.nav-fill` example using a `<nav>`-based navigation, be sure to include `.nav-item` on the anchors.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav theme="pills justified">
        <Nav.Item link active href="#">Active</Nav.Item>
        <Nav.Item link href="#">Much longer nav link</Nav.Item>
        <Nav.Item link href="#">Link</Nav.Item>
        <Nav.Item link disabled href="#">Disabled</Nav.Item>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Working with flex utilities

If you need responsive nav variations, consider using a series of [flexbox utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/). While more verbose, these utilities offer greater customization across responsive breakpoints. In the example below, our nav will be stacked on the lowest breakpoint, then adapt to a horizontal layout that fills the available width starting from the small breakpoint.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav theme="pills" class="flex-column flex-sm-row">
        <Nav.Link class="flex-sm-fill text-sm-center" active href="#">Active</Nav.Link>
        <Nav.Link class="flex-sm-fill text-sm-center" href="#">Longer nav link</Nav.Link>
        <Nav.Link class="flex-sm-fill text-sm-center" href="#">Link</Nav.Link>
        <Nav.Link class="flex-sm-fill text-sm-center" disabled href="#">Disabled</Nav.Link>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Regarding accessibility

If you're using navs to provide a navigation bar, be sure to add a `role="navigation"` to the most logical parent container of the `<ul>`, or wrap a `<nav>` element around the whole navigation. Do not add the role to the `<ul>` itself, as this would prevent it from being announced as an actual list by assistive technologies.

Note that navigation bars, even if visually styled as tabs with the `.nav-tabs` class, should **not** be given `role="tablist"`, `role="tab"` or `role="tabpanel"` attributes. These are only appropriate for dynamic tabbed interfaces, as described in the [<abbr title="Web Accessibility Initiative">WAI</abbr> <abbr title="Accessible Rich Internet Applications">ARIA</abbr> Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel). See [JavaScript behavior](#javascript-behavior) for dynamic tabbed interfaces in this section for an example.

## Using dropdowns

Add dropdown menus with a little extra HTML and the [dropdowns JavaScript plugin]({{ site.baseurl }}/docs/{{ site.docs_version }}/components/dropdowns/#usage).

### Tabs with dropdowns

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav theme="tabs">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Dropdown.AsNavItem>
          Dropdown
          <Dropdown.Menu>
              <Dropdown.Item as="a" href="#">Action</Dropdown.Item>
              <Dropdown.Item as="a" href="#">Another action</Dropdown.Item>
              <Dropdown.Item as="a" href="#">Something else here</Dropdown.Item>
              <Dropdown.Item divider />
              <Dropdown.Item as="a" href="#">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.AsNavItem>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

### Pills with dropdowns

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  return (
    <>
      <Nav theme="pills">
        <Nav.Item><Nav.Link active href="#">Active</Nav.Link></Nav.Item>
        <Dropdown.AsNavItem>
          Dropdown
          <Dropdown.Menu>
              <Dropdown.Item as="a" href="#">Action</Dropdown.Item>
              <Dropdown.Item as="a" href="#">Another action</Dropdown.Item>
              <Dropdown.Item as="a" href="#">Something else here</Dropdown.Item>
              <Dropdown.Item divider />
              <Dropdown.Item as="a" href="#">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown.AsNavItem>
        <Nav.Item><Nav.Link href="#">Link</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link disabled href="#">Disabled</Nav.Link></Nav.Item>
      </Nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code %}

## Controlled NavTab

Use the tab JavaScript plugin—include it individually or through the compiled `bootstrap.js` file—to extend our navigational tabs and pills to create tabbable panes of local content, even via dropdown menus.

If you're building our JavaScript from source, it [requires `util.js`]({{ site.baseurl }}/docs/{{ site.docs_version }}/getting-started/javascript/#util).

Dynamic tabbed interfaces, as described in the [<abbr title="Web Accessibility Initiative">WAI</abbr> <abbr title="Accessible Rich Internet Applications">ARIA</abbr> Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel), require `role="tablist"`, `role="tab"`, `role="tabpanel"`, and additional `aria-` attributes in order to convey their structure, functionality and current state to users of assistive technologies (such as screen readers).

Note that dynamic tabbed interfaces should <em>not</em> contain dropdown menus, as this causes both usability and accessibility issues. From a usability perspective, the fact that the currently displayed tab's trigger element is not immediately visible (as it's inside the closed dropdown menu) can cause confusion. From an accessibility point of view, there is currently no sensible way to map this sort of construct to a standard WAI ARIA pattern, meaning that it cannot be easily made understandable to users of assistive technologies.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState('home')
  return (
    <>
      <Nav.List theme="tabs" id={`myTab${uuid}`} role="tablist">
        <Nav.Item onClick={() => setActiveKey('home')}>
          <Nav.Link active={activeKey === 'home'}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setActiveKey('profile')}>
          <Nav.Link active={activeKey === 'profile'}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setActiveKey('contact')}>
          <Nav.Link active={activeKey === 'contact'}>Contact</Nav.Link>
        </Nav.Item>
      </Nav.List>
      <NavTab id={`myTabContent${uuid}`}>
        <NavTab.Pane active={activeKey === 'home'} aria-labelledby="home-tab">
          <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'profile'} aria-labelledby="profile-tab">
          <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'contact'} aria-labelledby="contact-tab">
          <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
        </NavTab.Pane>
      </NavTab>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code class="bd-example-tabs" %}

To help fit your needs, this works with `<ul>`-based markup, as shown above, or with any arbitrary "roll your own" markup. Note that if you're using `<nav>`, you shouldn't add `role="tablist"` directly to it, as this would override the element's native role as a navigation landmark. Instead, switch to an alternative element (in the example below, a simple `<div>`) and wrap the `<nav>` around it.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState('home')
  return (
    <>
      <Nav navAsParent theme="tabs" id={`myTab${uuid}`} role="tablist">
        <Nav.Item link active={activeKey === 'home'} onClick={() => setActiveKey('home')}>
          Home
        </Nav.Item>
        <Nav.Item link active={activeKey === 'profile'} onClick={() => setActiveKey('profile')}>
          Profile
        </Nav.Item>
        <Nav.Item link active={activeKey === 'contact'} onClick={() => setActiveKey('contact')}>
          Contact
        </Nav.Item>
      </Nav>
      <NavTab id={`myTabContent${uuid}`}>
        <NavTab.Pane active={activeKey === 'home'} aria-labelledby="home-tab">
          <p>Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'profile'} aria-labelledby="profile-tab">
          <p>Nulla est ullamco ut irure incididunt nulla Lorem Lorem minim irure officia enim reprehenderit. Magna duis labore cillum sint adipisicing exercitation ipsum. Nostrud ut anim non exercitation velit laboris fugiat cupidatat. Commodo esse dolore fugiat sint velit ullamco magna consequat voluptate minim amet aliquip ipsum aute laboris nisi. Labore labore veniam irure irure ipsum pariatur mollit magna in cupidatat dolore magna irure esse tempor ad mollit. Dolore commodo nulla minim amet ipsum officia consectetur amet ullamco voluptate nisi commodo ea sit eu.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'contact'} aria-labelledby="contact-tab">
          <p>Sint sit mollit irure quis est nostrud cillum consequat Lorem esse do quis dolor esse fugiat sunt do. Eu ex commodo veniam Lorem aliquip laborum occaecat qui Lorem esse mollit dolore anim cupidatat. Deserunt officia id Lorem nostrud aute id commodo elit eiusmod enim irure amet eiusmod qui reprehenderit nostrud tempor. Fugiat ipsum excepteur in aliqua non et quis aliquip ad irure in labore cillum elit enim. Consequat aliquip incididunt ipsum et minim laborum laborum laborum et cillum labore. Deserunt adipisicing cillum id nulla minim nostrud labore eiusmod et amet. Laboris consequat consequat commodo non ut non aliquip reprehenderit nulla anim occaecat. Sunt sit ullamco reprehenderit irure ea ullamco Lorem aute nostrud magna.</p>
        </NavTab.Pane>
      </NavTab>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code class="bd-example-tabs" %}

The tabs plugin also works with pills.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState('home')
  return (
    <>
      <Nav.List theme="pills" class="mb-3" id={`pills-tab${uuid}`} role="tablist">
        <Nav.Item onClick={() => setActiveKey('home')}>
          <Nav.Link active={activeKey === 'home'}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setActiveKey('profile')}>
          <Nav.Link active={activeKey === 'profile'}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setActiveKey('contact')}>
          <Nav.Link active={activeKey === 'contact'}>Contact</Nav.Link>
        </Nav.Item>
      </Nav.List>
      <NavTab id={`pills-tabContent${uuid}`}>
        <NavTab.Pane active={activeKey === 'home'} aria-labelledby="home-tab">
          <p>Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'profile'} aria-labelledby="profile-tab">
          <p>Ad pariatur nostrud pariatur exercitation ipsum ipsum culpa mollit commodo mollit ex. Aute sunt incididunt amet commodo est sint nisi deserunt pariatur do. Aliquip ex eiusmod voluptate exercitation cillum id incididunt elit sunt. Qui minim sit magna Lorem id et dolore velit Lorem amet exercitation duis deserunt. Anim id labore elit adipisicing ut in id occaecat pariatur ut ullamco ea tempor duis.</p>
        </NavTab.Pane>
        <NavTab.Pane active={activeKey === 'contact'} aria-labelledby="contact-tab">
          <p>Est quis nulla laborum officia ad nisi ex nostrud culpa Lorem excepteur aliquip dolor aliqua irure ex. Nulla ut duis ipsum nisi elit fugiat commodo sunt reprehenderit laborum veniam eu veniam. Eiusmod minim exercitation fugiat irure ex labore incididunt do fugiat commodo aliquip sit id deserunt reprehenderit aliquip nostrud. Amet ex cupidatat excepteur aute veniam incididunt mollit cupidatat esse irure officia elit do ipsum ullamco Lorem. Ullamco ut ad minim do mollit labore ipsum laboris ipsum commodo sunt tempor enim incididunt. Commodo quis sunt dolore aliquip aute tempor irure magna enim minim reprehenderit. Ullamco consectetur culpa veniam sint cillum aliqua incididunt velit ullamco sunt ullamco quis quis commodo voluptate. Mollit nulla nostrud adipisicing aliqua cupidatat aliqua pariatur mollit voluptate voluptate consequat non.</p>
        </NavTab.Pane>
      </NavTab>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code class="bd-example-tabs" %}

And with vertical pills.

{% reboot_mvvm mexample_with_code %}
const Sample = ({ uuid }) => {
  const [ activeKey, setActiveKey ] = React.useState('home')
  return (
    <>
      <Row>
        <Col span={3}>
          <Nav theme="pills" class="flex-column" id={`v-pills-tab${uuid}`} role="tablist">
            <Nav.Item link active={activeKey === 'home'} onClick={() => setActiveKey('home')}>
              Home
            </Nav.Item>
            <Nav.Item link active={activeKey === 'profile'} onClick={() => setActiveKey('profile')}>
              Profile
            </Nav.Item>
            <Nav.Item link active={activeKey === 'messages'} onClick={() => setActiveKey('messages')}>
              Contact
            </Nav.Item>
            <Nav.Item link active={activeKey === 'settings'} onClick={() => setActiveKey('settings')}>
              Settings
            </Nav.Item>
          </Nav>
        </Col>
        <Col span={9}>
          <NavTab id={`v-pills-tabContent${uuid}`}>
            <NavTab.Pane active={activeKey === 'home'} aria-labelledby="v-pills-home-tab">
              <p>Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur. Deserunt non laborum enim et cillum eu deserunt excepteur ea incididunt minim occaecat.</p>
            </NavTab.Pane>
            <NavTab.Pane active={activeKey === 'profile'} aria-labelledby="v-pills-profile-tab">
              <p>Culpa dolor voluptate do laboris laboris irure reprehenderit id incididunt duis pariatur mollit aute magna pariatur consectetur. Eu veniam duis non ut dolor deserunt commodo et minim in quis laboris ipsum velit id veniam. Quis ut consectetur adipisicing officia excepteur non sit. Ut et elit aliquip labore Lorem enim eu. Ullamco mollit occaecat dolore ipsum id officia mollit qui esse anim eiusmod do sint minim consectetur qui.</p>
            </NavTab.Pane>
            <NavTab.Pane active={activeKey === 'messages'} aria-labelledby="v-pills-messages-tab">
              <p>Fugiat id quis dolor culpa eiusmod anim velit excepteur proident dolor aute qui magna. Ad proident laboris ullamco esse anim Lorem Lorem veniam quis Lorem irure occaecat velit nostrud magna nulla. Velit et et proident Lorem do ea tempor officia dolor. Reprehenderit Lorem aliquip labore est magna commodo est ea veniam consectetur.</p>
            </NavTab.Pane>
            <NavTab.Pane active={activeKey === 'settings'} aria-labelledby="v-pills-settings-tab">
              <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
            </NavTab.Pane>
          </NavTab>
        </Col>
      </Row>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html reboot_mvvm_ctx=mexample_with_code class="bd-example-tabs" %}