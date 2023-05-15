<script lang="ts">
  import { createEventDispatcher, SvelteComponent } from 'svelte'

  export let component: typeof SvelteComponent
  export let selected: string | number | null = null

  const dispatch = createEventDispatcher()
  $: dispatch(`selected-changed`, { selected })
</script>

<svelte:component this={component} bind:selected {...$$restProps} />
