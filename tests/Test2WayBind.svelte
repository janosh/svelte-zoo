<script lang="ts">
  import type { RadioButtons } from '$lib'
  import { createEventDispatcher } from 'svelte'

  export let component: typeof RadioButtons
  export let options: RadioButtons['options']
  export let selected: string | number | null = null

  const dispatch = createEventDispatcher()
  $: dispatch(`selected-changed`, { selected })
</script>

<svelte:component this={component} {options} bind:selected {...$$restProps} />
