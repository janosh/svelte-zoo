<script lang="ts">
  import * as icons from './icons'

  export let icon: string
  export let style: string = `display: inline-block; vertical-align: middle;`
  export let width: string = `1em`
  export let height: string = width

  $: if (!(icon in icons)) {
    console.error(`Icon '${icon}' not found`)
  }
</script>

<svelte:component this={icons[icon]} {style} {width} {height} />
