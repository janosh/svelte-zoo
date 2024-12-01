<script lang="ts">
  import { onMount } from 'svelte'

  export let color: string | null = null
  export let duration: string = `1.5s`
  export let size: string = `1em`
  export { class_name as class }
  export let div: HTMLDivElement

  let class_name: string | null = null
  onMount(() => {
    if (!color) {
      color = getComputedStyle(div).color
    }
  })
</script>

<div
  bind:this={div}
  style="--duration: {duration}"
  style:border-color="{color} transparent {color}
  {color}"
  style:width={size}
  style:height={size}
  class={class_name}
></div>

<style>
  div {
    display: inline-block;
    vertical-align: middle;
    margin: 0 3pt;
    border-width: calc(1em / 5);
    border-style: solid;
    border-radius: 50%;
    animation: var(--duration) infinite rotate;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
