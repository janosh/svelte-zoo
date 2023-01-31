Using `slot='tip'` to pass a component as tooltip:

```svelte example
<script>
  import { Tooltip } from '$lib'
</script>

<Tooltip>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <span slot="tip">tooltip</span>
</Tooltip>
```

Using `text` prop to simply pass text as tooltip using default slot component:

```svelte example
<script>
  import { Tooltip } from '$lib'
</script>

<Tooltip text="tooltip" --zoo-tooltip-bg="white" --zoo-tooltip-color="black">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</Tooltip>
```
