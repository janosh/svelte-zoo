---
title: Click Outside
description: A Svelte action to detect clicks outside an element and close it.
---

# Click Outside

This [Svelte action](https://svelte.dev/docs/svelte/svelte-action) detects clicks outside the HTML element it's attached to and triggers a callback and/or dispatches an `outside-click` event. It's useful for closing dropdowns, modals, or `<details>` elements when users click elsewhere on the page.

## Usage

```ts
import { click_outside } from '$lib/actions'
```

## Demo

Try clicking the button to open the details element, then click anywhere outside to close it.

```svelte example
<!-- A demo showing how to close a details element when clicking outside -->
<script lang="ts">
  import { click_outside } from '$lib/actions'
</script>

<div>
  <details use:click_outside={{ callback: (node) => (node.open = false) }}>
    <summary>Click me to open</summary>
    <p>Now try clicking anywhere outside this box to close it.</p>
    <p>
      The click_outside action will detect the click and invoke a callback to set
      details.open = false.
    </p>
  </details>
</div>
```

## Props

The action accepts a configuration object with these optional properties:

- `enabled` (`boolean`, default: `true`): Whether the click outside detection is active
- `exclude` (`string[]`): CSS selectors for elements to exclude from triggering the close action
- `callback` (`function`): Called when a click outside is detected, receives the node and current config as positional arguments
