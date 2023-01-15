<script lang="ts">
  import { get_bg_color } from '$lib'

  export let text: string | null = null
  export let max_width = `14em`
  export let min_width = `0`
  // set e.g. to cursor='help' to inform the user the tooltip refers to the hovered element
  export let cursor: string | null = null

  let span: HTMLSpanElement
  $: bg_color = get_bg_color(span)
</script>

{#if $$slots.tip}
  <span bind:this={span} style="--default-bg: {bg_color}" style:cursor>
    <slot />
    <slot name="trigger" />
    <div style:min-width={min_width} style:max-width={max_width}>
      <slot name="tip">
        <span>{text}</span>
      </slot>
    </div>
  </span>
{:else}
  <!-- if no tip was passed, don't wrap the trigger in an unnecessary span -->
  <slot />
  <slot name="trigger" />
{/if}

<style>
  span {
    position: relative;
  }
  span > div {
    visibility: hidden;
    opacity: 0;
    cursor: default;
    transition: var(--zoo-tooltip-transition, 0.2s);
    position: absolute;
    top: 100%;
    padding: 5pt 1ex;
    border-radius: 1ex;
    left: 50%;
    transform: translate(-50%, 1ex);
    z-index: 1;
    box-shadow: 0 0 1ex -3pt black;
    width: fit-content;
    box-sizing: border-box;
    background: var(--zoo-tooltip-bg, gray);
  }
  span > div::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%);
    border: 1ex solid;
    border-color: transparent transparent var(--zoo-tooltip-bg, gray) transparent;
    box-sizing: border-box;
  }
  span:hover > div {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 2ex);
  }
  /* needed to increase the div hover area beyond its top edge across its entire width */
  span > div::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 100%;
    height: 1ex;
  }
</style>
