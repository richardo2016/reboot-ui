---
layout: docs
title: Pagination
description: Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages.
group: components
toc: true
---

## Overview

We use a large block of connected links for our pagination, making links hard to miss and easily scalable—all while providing large hit areas. Pagination is built with list HTML elements so screen readers can announce the number of available links. Use a wrapping `<nav>` element to identify it as a navigation section to screen readers and other assistive technologies.

In addition, as pages likely have more than one such navigation section, it's advisable to provide a descriptive `aria-label` for the `<nav>` to reflect its purpose. For example, if the pagination component is used to navigate between a set of search results, an appropriate label could be `aria-label="Search results pages"`.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 1,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item link prev>Previous</Pagination.Item>
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
          <Pagination.Item link next>Next</Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Working with icons

Looking to use an icon or symbol in place of text for some pagination links? Be sure to provide proper screen reader support with `aria` attributes.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 1,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item prev>
            <Pagination.Link aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item link page={1}></Pagination.Item>
          <Pagination.Item link page={2}></Pagination.Item>
          <Pagination.Item link page={3}></Pagination.Item>
          <Pagination.Item next>
            <Pagination.Link aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Pagination.Link>
          </Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Disabled and active states

Pagination links are customizable for different circumstances. Use `.disabled` for links that appear un-clickable and `.active` to indicate the current page.

While the `.disabled` class uses `pointer-events: none` to _try_ to disable the link functionality of `<a>`s, that CSS property is not yet standardized and doesn't account for keyboard navigation. As such, you should always add `tabindex="-1"` on disabled links and use custom JavaScript to fully disable their functionality.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="...">
        <Pagination
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item prev disabled link>
            Previous
          </Pagination.Item>
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
          <Pagination.Item next>
            <Pagination.Link aria-label="Next">
              Next
            </Pagination.Link>
          </Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

You can optionally swap out active or disabled anchors for `<span>`, or omit the anchor in the case of the prev/next arrows, to remove click functionality and prevent keyboard focus while retaining intended styles.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="...">
        <Pagination
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item prev disabled>
            <span class="page-link">Previous</span>
          </Pagination.Item>
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
          <Pagination.Item next>
            <Pagination.Link>
              Next
            </Pagination.Link>
          </Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Sizing

Fancy larger or smaller pagination? Add `.pagination-lg` or `.pagination-sm` for additional sizes.

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="...">
        <Pagination
          size="lg"
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="...">
        <Pagination
          size="sm"
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Alignment

Change the alignment of pagination components with [flexbox utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/flex/).

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          class="justify-content-center"
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item prev disabled link>
            Previous
          </Pagination.Item>
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
          <Pagination.Item next>
            <Pagination.Link>
              Next
            </Pagination.Link>
          </Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          class="justify-content-end"
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          <Pagination.Item prev disabled link>
            Previous
          </Pagination.Item>
          <Pagination.Item link page={1} />
          <Pagination.Item link page={2} />
          <Pagination.Item link page={3} />
          <Pagination.Item next>
            <Pagination.Link>
              Next
            </Pagination.Link>
          </Pagination.Item>
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}

## Customize Pagination Items

Some times you may want customize your pagination items layout:

{% reboot_mvvm mexample_with_code %}
const Sample = () => {
  const [ pagination, setPagination ] = Pagination.usePagination({
    startPage: 1,
    currentPage: 2,
    pageSize: 3,
    total: 8,
  })

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          pagination={pagination}
          onChange={
            ({ currentPage, pageSize }) => {
              setPagination({ currentPage, pageSize })
            }
          }
        >
          {({ pagination }) => {
            const ranges = []
            let idx = pagination.startPage
            // dangerous code, never copy, just for example
            while (idx <= pagination.maxPage) {
              ranges.push(idx)
              idx++
            }
            
            return (
              <>
                <Pagination.Item prev disabled link>
                  Previous
                </Pagination.Item>
                {ranges.map(page => {
                  return (
                    <Pagination.Item key={`pagi-${page}`} link page={page} />
                  )
                })}
                <Pagination.Item next>
                  <Pagination.Link>
                    Next
                  </Pagination.Link>
                </Pagination.Item>
              </>
            )
          }}
        </Pagination>
      </nav>
    </>
  )
}
{% endreboot_mvvm %}
{% include mvvm-example.html mexample=mexample_with_code %}