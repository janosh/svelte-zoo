Without passing `value`, it initializes to `undefined`

```svelte example
<script>
  import { Slider } from '$lib'

  function oninput(event) {
    console.log(`oninput`, event)
  }
</script>

<Slider {oninput} />
```

Passing `min`, `max` and initial `value` prop:

```svelte example
<script>
  import { Slider } from '$lib'

  let value = 42
</script>

<Slider min={0} max={50} step={3} bind:value />

<br />

The current value is <code>{value}</code>
```
