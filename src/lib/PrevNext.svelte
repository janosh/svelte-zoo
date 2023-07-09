<script lang="ts">
  import { goto } from '$app/navigation'

  export let items: T[] = []
  export let node: string = `nav`
  export let current: string = ``
  export let style: string | null = null
  export let on_keyup: (obj: { prev: Item; next: Item }) => Record<string, string> = ({
    prev,
    next,
  }) => ({ ArrowLeft: prev[0], ArrowRight: next[0], Escape: `/` })
  export let goto_options: { replaceState: boolean; noScroll: boolean } = {
    replaceState: true,
    noScroll: true,
  }
  export let titles: { prev: string; next: string } = {
    prev: `&larr; Previous`,
    next: `Next &rarr;`,
  }

  type Item = string | [string, unknown]
  type T = $$Generic<Item>

  $: arr = (items ?? []).map((itm) =>
    typeof itm == `string` ? [itm, itm] : itm
  ) as Item[]
  $: if (arr.length < 2) console.error(`PrevNext received ${arr.length} items`)
  $: idx = arr.findIndex(([key]) => key == current)
  $: if (idx < 0) {
    const valid = arr.map(([key]) => key)
    console.error(
      `PrevNext received invalid current=${current}, expected one of ${valid}`
    )
  }
  $: prev = arr[idx - 1] ?? arr[arr.length - 1]
  $: next = arr[idx + 1] ?? arr[0]

  function handle_keyup(event: KeyboardEvent) {
    const to = on_keyup({ prev, next })[event.key]
    if (to) goto(to, goto_options)
  }
</script>

<svelte:window on:keyup={handle_keyup} />
{#if arr.length > 2}
  <svelte:element this={node} {style} class="prev-next">
    {#if prev?.length >= 2}
      <slot name="prev" item={prev[1]}>
        <slot kind="prev" item={prev[1]}>
          <div>
            {#if titles.prev}<span>{@html titles.prev}</span>{/if}
            <a href={prev[0]}>{prev[0]}</a>
          </div>
        </slot>
      </slot>
    {/if}
    <slot name="between" />
    {#if next?.length >= 2}
      <slot name="next" item={next[1]}>
        <slot kind="next" item={next[1]}>
          <div>
            {#if titles.next}<span>{@html titles.next}</span>{/if}
            <a href={next[0]}>{next[0]}</a>
          </div>
        </slot>
      </slot>
    {/if}
  </svelte:element>
{/if}

<style>
  .prev-next {
    display: flex;
    list-style: none;
    place-content: space-between;
    gap: var(--zoo-pr-gap, 2em);
    padding: var(--zoo-pr-padding, 0);
    margin: var(--zoo-pr-margin, 3em auto);
  }
  .prev-next a {
    color: var(--zoo-pr-color);
    background: var(--zoo-pr-link-bg);
    padding: var(--zoo-pr-link-padding);
    border-radius: var(--zoo-pr-link-border-radius);
  }
  .prev-next span {
    display: block;
    margin: var(--zoo-pr-label-margin, 0 auto 1ex);
  }
  .prev-next > div:nth-child(2) {
    text-align: right;
  }
</style>
