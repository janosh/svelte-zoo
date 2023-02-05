<script lang="ts">
  export let options: (string | number)[]
  export let selected: string | number | null = null
  export { className as class }

  let className = `zoo-radio-btn`
</script>

<div class={className}>
  {#each options as value}
    <label class:active={value === selected}>
      <input type="radio" bind:group={selected} {value} on:change on:input on:click />
      <slot name="option" {value} {selected} active={value === selected}>
        <span>{value}</span>
      </slot>
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
