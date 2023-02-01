<script lang="ts">
  export let options: (string | number)[]
  export let selected: string | number | null = null
  export { className as class }

  let className = `zoo-radio-btn`
</script>

<div class={className}>
  {#each options as value}
    <label>
      <input type="radio" bind:group={selected} {value} on:change on:input on:click />
      <span>{value}</span>
    </label>
  {/each}
</div>

<style>
  div {
    display: flex;
    border-radius: 3pt;
    max-width: max-content;
    overflow: hidden;
    height: fit-content;
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
  input:not(:checked) + span:hover {
    background: var(--zoo-radio-btn-hover-bg, cornflowerblue);
    color: var(--zoo-radio-btn-hover-color, white);
  }
  input:checked + span {
    box-shadow: var(--zoo-radio-btn-checked-shadow, inset 0 0 1em -3pt black);
    background: var(--zoo-radio-btn-checked-bg, darkcyan);
  }
</style>
