<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    checked?: boolean // whether the toggle is on or off
    required?: boolean
    input_style?: string
    id?: string | null
    onclick?: (event: MouseEvent) => void
    onchange?: (event: Event) => void
    onblur?: (event: FocusEvent) => void
    onkeydown?: (event: KeyboardEvent) => void
    children?: Snippet<[]>
    [key: string]: unknown
  }
  let {
    checked = $bindable(false),
    required = false,
    input_style = ``,
    id = null,
    onclick,
    onchange,
    onblur,
    onkeydown,
    children,
    ...rest
  }: Props = $props()

  // normally input type=checkbox toggles on space bar, this handler also responds to enter
  function handle_keydown(event: KeyboardEvent) {
    onkeydown?.(event)
    if (event.key === `Enter`) {
      event.preventDefault()
      checked = !checked
    }
  }
</script>

<label {...rest}>
  {@render children?.()}
  <input
    type="checkbox"
    bind:checked
    {id}
    {required}
    onkeydown={handle_keydown}
    {onchange}
    {onblur}
    {onclick}
    style={input_style}
  />
  <span></span>
</label>

<style>
  label {
    display: var(--zoo-toggle-label-display, inline-flex);
    align-items: var(--zoo-toggle-label-align-items, center);
    width: var(--zoo-toggle-label-width, max-content);
    vertical-align: var(--zoo-toggle-label-vertical-align, middle);
  }
  span {
    box-sizing: border-box;
    height: var(--zoo-toggle-knob-height, 1.5em);
    width: var(--zoo-toggle-knob-width, 3em);
    padding: var(--zoo-toggle-knob-padding, 0.1em);
    border: var(--zoo-toggle-knob-border, 1px solid lightgray);
    border-radius: var(--zoo-toggle-knob-border-radius, 0.75em);
    transition: var(--zoo-toggle-knob-transition, 0.3s);
  }
  input:checked + span {
    background: var(--zoo-toggle-background, black);
  }
  input {
    position: absolute;
    opacity: 0;
    width: var(--zoo-toggle-input-width, 1em);
  }
  input + span::after {
    content: '';
    display: var(--zoo-toggle-knob-after-display, block);
    height: var(--zoo-toggle-knob-after-height, 1.2em);
    width: var(--zoo-toggle-knob-after-width, 1.2em);
    border-radius: var(--zoo-toggle-knob-after-border-radius, 50%);
    background: var(--zoo-toggle-knob-after-background, gray);
    transition: var(--zoo-toggle-knob-after-transition, 0.3s);
  }
  input:checked + span::after {
    background: var(--zoo-toggle-knob-after-background, green);
    transform: var(
      --zoo-toggle-knob-after-transform,
      translate(
        calc(
          var(--zoo-toggle-knob-width, 3em) - var(--zoo-toggle-knob-height, 1.5em) +
            var(--zoo-toggle-knob-padding, 0.1em) - var(--zoo-toggle-knob-border, 2px)
        )
      )
    );
  }
  input:focus + span {
    border: var(--zoo-toggle-knob-focus-border, 1px solid cornflowerblue);
  }
</style>
