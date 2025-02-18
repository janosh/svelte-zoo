<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    color?: string | null
    duration?: string
    size?: string
    div: HTMLDivElement
    class?: string | null
  }

  let {
    color = $bindable(null),
    duration = `1.5s`,
    size = `1em`,
    div = $bindable(),
    class: class_name = null,
  }: Props = $props()
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
