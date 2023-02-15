<script lang="ts">
  export let options: (string | number)[]
  export let selected: string | number | null = null
  export { class_name as class }
  export let style: string | null = null
  export let id: string | null = null
  export let name: string | null = null
  export let disabled: boolean = false
  export let required: boolean = false
  export let aria_label: string | null = null

  let class_name = `zoo-radio-btn`
</script>

<div {id} {style} class={class_name}>
  {#each options as value}
    {@const active = value === selected}
    <label class:active aria-label={aria_label}>
      <input
        type="radio"
        {value}
        {name}
        {disabled}
        {required}
        bind:group={selected}
        on:change
        on:input
        on:click
      />
      <slot name="option" {value} {selected} {active}>
        <slot {value} {selected} {active}><span>{value}</span></slot>
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
