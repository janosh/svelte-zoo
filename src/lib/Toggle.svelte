<script lang="ts">
  export let checked: boolean = false // whether the toggle is on or off
  export let required: boolean = false
  export let style: string = ``
  export let id: string = ``

  // normally input type=checkbox toggles on space bar, this handler also responds to enter
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === `Enter`) {
      checked = !checked
      event.preventDefault()
    }
  }
</script>

<label {style}>
  <slot />
  <input type="checkbox" bind:checked {id} {required} on:keydown={handleKeydown} />
  <span />
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
    transform: var(--zoo-toggle-knob-after-transform, translate(100%));
  }
  input:focus + span {
    border: var(--zoo-toggle-knob-focus-border, 1px solid cornflowerblue);
  }
</style>
