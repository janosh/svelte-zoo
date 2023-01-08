<script lang="ts">
  export let options: (string | number)[]
  export let selected: string | number | null = null
</script>

<div class="zoo-radio-btn">
  {#each options as value}
    <label>
      <input type="radio" bind:group={selected} {value} />
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
    color: white;
    padding: 2pt 1ex;
    background: var(--zoo-radio-btn-bg, black);
    transition: var(--zoo-radio-btn-transition, background 0.3s, transform 0.3s);
  }
  input:not(:checked) + span:hover {
    background: var(--zoo-radio-btn-hover-bg, cornflowerblue);
    transform: scale(1.01);
  }
  input:checked + span {
    box-shadow: var(--zoo-radio-btn-checked-shadow, inset 0 0 1em -3pt black);
    background: var(--zoo-radio-btn-checked-bg, darkcyan);
  }
</style>
