<script lang="ts">
  import * as icons from './icons'

  export let icon: string
  export let style = `display: inline-block; vertical-align: middle;`
  export let width = `1em`
  export let height = width
</script>

<svelte:component this={icons[icon]} {style} {width} {height} />
