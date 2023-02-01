<script lang="ts">
  export let value: number = 0
  export let label: string = ``
  export let min: number = 0
  export let max: number = 100
  export let step: number = 1
  export let style: string = ``
  export let disabled: boolean = false
</script>

<label {style} aria-disabled={disabled ? `true` : `false`}>
  {label}
  <input type="number" bind:value {min} {max} {step} on:click on:input {disabled} />
  <input type="range" bind:value {min} {max} {step} on:change on:drag {disabled} />
</label>

<style>
  label {
    display: flex;
    gap: 1ex;
  }
  input[type='number'] {
    background: transparent;
    color: inherit;
    border: 1px solid white;
    border-radius: 5pt;
    text-align: center;
    padding: 0 4pt;
    outline: none;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: none;
  }
</style>
