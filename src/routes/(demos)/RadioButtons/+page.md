```svelte example
<script>
  import { RadioButtons } from '$lib'

  const options = [1, 2, 3]
  let selected
  const handler = (event) => {
    console.log(
      'New value is ' + event.target.value + ' triggered by on:' + event.type
    )
  }
</script>

<RadioButtons
  {options}
  bind:selected
  on:change={handler}
  on:input={handler}
  on:click={handler}
  --zoo-radio-btn-bg="rgba(255, 255, 255, 0.2)"
/>

<pre><code>selected = {JSON.stringify(selected)}</code></pre>
```

Pre-selected value:

```svelte example
<script>
  import { RadioButtons } from '$lib'

  const options = ['foo', 'bar', 'baz']
  let selected = 'baz'
  const handler = (event) => {
    console.log(
      'New value is ' + event.target.value + ' triggered by on:' + event.type
    )
  }
</script>

<RadioButtons
  {options}
  bind:selected
  on:change={handler}
  on:input={handler}
  on:click={handler}
  --zoo-radio-btn-bg="rgba(255, 255, 255, 0.2)"
/>

<pre><code>selected = {JSON.stringify(selected)}</code></pre>
```

Disabled RadioButtons:

```svelte example
<script>
  import { RadioButtons } from '$lib'

  const options = ['foo', 'bar', 'baz']
  let selected = 'baz'
  const handler = (event) => {
    console.log(
      'New value is ' + event.target.value + ' triggered by on:' + event.type
    )
  }
</script>

<RadioButtons
  {options}
  bind:selected
  on:change={handler}
  on:input={handler}
  on:click={handler}
  disabled
  --zoo-radio-btn-bg="rgba(255, 255, 255, 0.2)"
/>

<pre><code>selected = {JSON.stringify(selected)}</code></pre>
```
