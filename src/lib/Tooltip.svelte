<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    text?: string
    max_width?: string
    bg?: string | null
    cursor?: string | null
    tip_style?: string | null
    tip?: Snippet<[{ text: string }]>
    children?: Snippet<[{ text: string }]>
    trigger?: Snippet<[{ text: string }]>
    [key: string]: unknown
  }
  let {
    text = ``,
    max_width = `14em`,
    bg = null,
    cursor = null,
    tip_style = null,
    tip,
    children,
    trigger,
    ...rest
  }: Props = $props()

  let tooltip_div: HTMLDivElement | undefined = $state()
  let container: HTMLSpanElement | undefined = $state()
  let is_visible = false

  function position_tooltip() {
    if (!tooltip_div || !container) return

    // Get container and viewport dimensions
    const container_rect = container.getBoundingClientRect()
    const viewport_width = window.innerWidth
    const viewport_height = window.innerHeight

    // Reset position for measurements
    tooltip_div.style.width = ``
    tooltip_div.style.maxWidth = max_width
    tooltip_div.style.left = `0`
    tooltip_div.style.top = `0`

    // Force a reflow to get accurate measurements
    void tooltip_div.offsetWidth

    const natural_width = tooltip_div.offsetWidth
    const natural_height = tooltip_div.offsetHeight

    let left = container_rect.left + (container_rect.width - natural_width) / 2
    let top = container_rect.bottom + 2

    // Handle vertical overflow
    if (
      viewport_height - container_rect.bottom < natural_height &&
      container_rect.top > natural_height
    ) {
      top = container_rect.top - natural_height - 2
      tooltip_div.classList.add(`above`)
    } else {
      tooltip_div.classList.remove(`above`)
    }

    // Handle horizontal overflow
    left = Math.max(0, Math.min(viewport_width - natural_width, left))

    // Apply position and show if needed
    tooltip_div.style.top = `${top}px`
    tooltip_div.style.left = `${left}px`
    if (is_visible) {
      tooltip_div.style.visibility = `visible`
      tooltip_div.style.opacity = `1`
    }
  }

  function show_tooltip() {
    is_visible = true
    position_tooltip()
  }

  function hide_tooltip() {
    is_visible = false
    if (tooltip_div) {
      tooltip_div.style.visibility = `hidden`
      tooltip_div.style.opacity = `0`
    }
  }
</script>

{#if tip || text}
  <span
    bind:this={container}
    style:cursor
    onmouseenter={show_tooltip}
    onmouseleave={hide_tooltip}
    role="tooltip"
    {...rest}
  >
    {@render children?.({ text })}
    {@render trigger?.({ text })}
    <div bind:this={tooltip_div} style:background={bg} style={tip_style} class="tooltip">
      {#if tip}{@render tip({ text })}{:else}{@html text}{/if}
    </div>
  </span>
{:else}
  <!-- if no tip was passed, don't wrap the trigger in an unnecessary span -->
  {@render children?.({ text })}
  {@render trigger?.({ text })}
{/if}

<style>
  span {
    position: relative;
  }

  .tooltip {
    position: fixed;
    padding: 5pt 1ex;
    border-radius: 1ex;
    z-index: 1000;
    box-shadow: 0 0 1ex -3pt black;
    white-space: normal;
    word-wrap: break-word;
    box-sizing: border-box;
    transition: var(--zoo-tooltip-transition, 0s);
    background: var(--zoo-tooltip-bg, rgba(0, 0, 0, 0.3));
    color: var(--zoo-tooltip-color, white);
    border: var(--zoo-tooltip-border);
    pointer-events: none;
    user-select: none;
    visibility: hidden;
    opacity: 0;
  }

  @starting-style {
    .tooltip {
      visibility: hidden;
      opacity: 0;
    }
  }

  .tooltip::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 1ex solid;
    border-color: transparent;
    box-sizing: border-box;
  }

  .tooltip:not(.above)::before {
    bottom: 100%;
    border-bottom-color: var(--zoo-tooltip-bg, rgba(0, 0, 0, 0.3));
  }

  .tooltip.above::before {
    top: 100%;
    border-top-color: var(--zoo-tooltip-bg, rgba(0, 0, 0, 0.3));
  }
</style>
