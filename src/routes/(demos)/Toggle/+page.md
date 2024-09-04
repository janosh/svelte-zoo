```svelte example
<script>
  import { Toggle } from '$lib'

  let checked = false
  let is_sure = false
</script>

<Toggle bind:checked --zoo-toggle-knob-width="7em">
  Are you ready?
</Toggle>

{#if checked}
  <p>I am!</p>

  <Toggle bind:checked={is_sure}>
    Are you sure?
  </Toggle>

  {#if is_sure}
    <br />
    Then do
    <pre><code>npm install svelte-zoo</code></pre>
  {/if}

{/if}

```
