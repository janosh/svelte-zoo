<script lang="ts">
  export let text: string | null = null
  export let max_width: string = `14em`
  export let min_width: string = `max-content`
  export let bg: string | null = null
  // set e.g. to cursor='help' to inform the user the tooltip refers to the hovered element
  export let cursor: string | null = null
  export let style: string | null = null
  export let tip_style: string | null = null
  export { class_name as class }

  let class_name: string | null = null

  $: if (text && $$slots.tip) {
    console.error(
      `svelte-zoo tooltip: both text prop and slot='tip' were passed, only one is allowed`,
    )
  }
</script>

{#if $$slots.tip || text}
  <span style:cursor {style} class={class_name}>
    <slot />
    <slot name="trigger" />
    <div
      style:min-width={min_width}
      style:max-width={max_width}
      style:background={bg}
      style={tip_style}
    >
      <slot name="tip">{text}</slot>
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
    transition: var(--zoo-tooltip-transition, 0.2s);
    background: var(--zoo-tooltip-bg, rgba(0, 0, 0, 0.3));
    color: var(--zoo-tooltip-color, white);
    border: var(--zoo-tooltip-border);
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
