<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    value?: number
    label?: string
    min?: number
    max?: number
    step?: number
    slider_style?: string
    disabled?: boolean
    id?: string | null
    number?: `before` | `after` | false
    onclick?: (event: MouseEvent) => void
    oninput?: (event: Event) => void
    onchange?: (event: Event) => void
    label_snippet?: Snippet<[]>
    children?: Snippet<[]>
    [key: string]: unknown
  }
  let {
    value = $bindable(0),
    label = ``,
    min = 0,
    max = 100,
    step = 1,
    slider_style = ``,
    disabled = false,
    id = null,
    number = `before`,
    onclick,
    oninput,
    onchange,
    label_snippet,
    children,
    ...rest
  }: Props = $props()
</script>

<label {id} aria-disabled={disabled ? `true` : `false`} {...rest}>
  {#if label_snippet}
    {@render label_snippet()}
  {:else if children}
    {@render children()}
  {:else}{label}{/if}
  {#if number == `before`}
    <input type="number" bind:value {min} {max} {step} {onclick} {oninput} {disabled} />
  {/if}
  <input
    type="range"
    bind:value
    {min}
    {max}
    {step}
    {onchange}
    {oninput}
    {disabled}
    style={slider_style}
  />
  {#if number == `after`}
    <input type="number" bind:value {min} {max} {step} {onclick} {oninput} {disabled} />
  {/if}
</label>

<style>
  label {
    display: flex;
    place-items: center;
    gap: var(--zoo-slider-gap, 1ex);
    margin: var(--zoo-slider-margin);
    padding: var(--zoo-slider-padding);
  }
  input[type='number'] {
    background: transparent;
    color: inherit;
    border-radius: 5pt;
    text-align: center;
    outline: none;
    box-sizing: border-box;
    font-size: var(--zoo-slider-input-font-size);
    width: var(--zoo-slider-input-width, 3em);
    padding: var(--zoo-slider-input-padding, 0 4pt);
    border: var(--zoo-slider-input-border);
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: none;
  }
</style>
