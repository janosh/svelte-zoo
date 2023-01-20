<script lang="ts">
  import * as icons from './icons'

  export let icon: string
  export let style = `display: inline-block; vertical-align: middle;`
  export let width = `1em`
  export let height = width

  if (!icons[icon]) {
    console.error(`Icon '${icon}' not found`)
  }
</script>

<svelte:component this={icons[icon]} {style} {width} {height} />
