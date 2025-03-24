<script lang="ts">
  import type { Snippet } from 'svelte'

  type GenericOption = string | number | { value: unknown; label: string | number }
  type Option = $$Generic<GenericOption>

  // get the label key from an option object or the option itself if it's a string or number
  const get_label = (op: GenericOption) => {
    if (op instanceof Object) {
      if (op.label === undefined) {
        console.error(
          `RadioButton option ${JSON.stringify(op)} is an object but has no label key`,
        )
      }
      return op.label
    }
    return op
  }
  interface Props {
    options: Option[]
    selected?: string | number | null
    style?: string | null
    id?: string | null
    name?: string | null
    disabled?: boolean
    required?: boolean
    aria_label?: string | null
    class?: string | null
    onclick?: (event: MouseEvent) => void
    onchange?: (event: Event) => void
    oninput?: (event: Event) => void
    option_snippet?: Snippet<[{ option: Option; selected: boolean; active: boolean }]>
    children?: Snippet<[{ option: Option; selected: boolean; active: boolean }]>
  }

  let {
    options,
    selected = $bindable(),
    style = null,
    id = null,
    name = null,
    disabled = false,
    required = false,
    aria_label = null,
    class: class_name = `zoo-radio-btn`,
    onclick,
    onchange,
    oninput,
    option_snippet,
    children,
  }: Props = $props()
</script>

<div {id} {style} class={class_name}>
  {#each options as option (JSON.stringify(option))}
    {@const label = get_label(option)}
    {@const active = selected && get_label(option) === get_label(selected)}
    <label class:active aria-label={aria_label}>
      <input
        type="radio"
        value={option}
        {name}
        {disabled}
        {required}
        bind:group={selected}
        {onchange}
        {oninput}
        {onclick}
      />
      {#if option_snippet}
        {@render option_snippet({ option, selected, active })}
      {:else if children}
        {@render children({ option, selected, active })}
      {:else}<span>{label}</span>{/if}
    </label>
  {/each}
</div>

<style>
  div {
    max-width: max-content;
    overflow: hidden;
    height: fit-content;
    display: var(--zoo-radio-btn-display, inline-flex);
    border-radius: var(--zoo-radio-btn-border-radius, 0.5em);
  }
  input {
    display: none;
  }
  span {
    cursor: pointer;
    display: inline-block;
    color: var(--zoo-radio-btn-color, white);
    padding: var(--zoo-radio-btn-padding, 2pt 5pt);
    background: var(--zoo-radio-btn-bg, black);
    transition: var(--zoo-radio-btn-transition, background 0.3s, transform 0.3s);
  }
  label:not(.active) span:hover {
    background: var(--zoo-radio-btn-hover-bg, cornflowerblue);
    color: var(--zoo-radio-btn-hover-color, white);
  }
  label.active span {
    box-shadow: var(--zoo-radio-btn-checked-shadow, inset 0 0 1em -3pt black);
    background: var(--zoo-radio-btn-checked-bg, darkcyan);
  }
</style>
