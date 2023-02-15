<script lang="ts">
  export let value: number = 0
  export let label: string = ``
  export let min: number = 0
  export let max: number = 100
  export let step: number = 1
  export let style: string = ``
  export let disabled: boolean = false
  export let id: string | null = null
</script>

<label {id} {style} aria-disabled={disabled ? `true` : `false`}>
  <slot name="label">
    <slot>{label}</slot>
  </slot>
  <input type="number" bind:value {min} {max} {step} on:click on:input {disabled} />
  <input type="range" bind:value {min} {max} {step} on:change on:drag {disabled} />
</label>

<style>
  label {
    display: flex;
    place-items: center;
    gap: var(--zoo-slider-gap, 1ex);
    margin: var(--zoo-slider-margin);
    padding: var(--zoo-slider-padding, 0 4pt);
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
