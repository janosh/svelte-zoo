<script lang="ts">
  import { goto } from '$app/navigation'

  export let routes: Item[] = []
  export let node: string = `nav`
  export let current: string = ``
  export let style: string | null = null
  export let on_keyup: (obj: {
    prev: [string, unknown?]
    next: [string, unknown?]
  }) => Record<string, string> = ({ prev, next }) => ({
    ArrowLeft: prev[0],
    ArrowRight: next[0],
    Escape: `/`,
  })
  export let goto_options: { replaceState: boolean; noScroll: boolean } = {
    replaceState: true,
    noScroll: true,
  }

  type Item = string | [string, unknown?] | Record<string, unknown>

  $: arr = (Array.isArray(routes) ? routes : Object.entries(routes)).map((itm) =>
    typeof itm == `string` ? [itm] : itm
  ) as [string, unknown][]
  $: if (arr.length < 2) console.error(`PrevNext only received ${arr.length} routes`)
  $: idx = arr.findIndex((slug) =>
    typeof slug == `string` ? slug == current : slug[0] == current
  )
  $: prev = arr[idx - 1] ?? arr[arr.length - 1] ?? {}
  $: next = arr[idx + 1] ?? arr[0] ?? {}

  function handle_keyup(event: KeyboardEvent) {
    const to = on_keyup({ prev, next })[event.key]
    if (to) goto(to, goto_options)
  }
</script>

<svelte:window on:keyup={handle_keyup} />

<svelte:element this={node} {style} class="prev-next">
  <div>
    <slot name="prev" item={prev}>
      <slot item={prev}>
        <p>&larr; Previous</p>
        <a href={prev[0]}>{prev[0]}</a>
      </slot>
    </slot>
  </div>
  <slot name="between" />
  <div>
    <slot name="next" item={next}>
      <slot item={next}>
        <p>Next &rarr;</p>
        <a href={next[0]}>{next[0]}</a>
      </slot>
    </slot>
  </div>
</svelte:element>

<style>
  .prev-next {
    display: flex;
    list-style: none;
    padding: 0;
    place-content: space-between;
    gap: 2em;
  }
  .prev-next > div:nth-child(2) {
    text-align: right;
  }
</style>
