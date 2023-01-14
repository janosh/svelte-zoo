```svelte example
<script>
  import { Confetti, Toggle } from '$lib'

  let [show, freeze, speed] = [true, false, 0.2]

  let [min, max, step] = [0, 1, 0.01]
</script>

<p>
  Show &ensp; <Toggle bind:checked={show} />
  &emsp; Freeze &ensp; <Toggle bind:checked={freeze} />
</p>

<label>
  Speed =
  <input type="number" {min} {max} {step} bind:value={speed} />
  <input type="range" {min} {max} {step} bind:value={speed} />
</label>

{#if show}
  <Confetti {freeze} {speed} />
{/if}
```
