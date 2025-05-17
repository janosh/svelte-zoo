<script lang="ts">
  import { goto } from '$app/navigation'
  import type { Snippet } from 'svelte'

  export type Item = string | [string, unknown]
  type T = $$Generic<Item>

  interface Props {
    items?: T[]
    node?: string
    current?: string
    log?: `verbose` | `errors` | `silent`
    goto_options?: { replaceState: boolean; noScroll: boolean }
    titles?: { prev: string; next: string }
    onkeyup?: ((obj: { prev: Item; next: Item }) => Record<string, string>) | null
    prev_snippet?: Snippet<[{ item: Item }]>
    children?: Snippet<[{ kind: `prev` | `next`; item: Item }]>
    between?: Snippet<[]>
    next_snippet?: Snippet<[{ item: Item }]>
    [key: string]: unknown
  }
  let {
    items = [],
    node = `nav`,
    current = ``,
    log = `errors`,
    goto_options = { replaceState: true, noScroll: true },
    titles = { prev: `&larr; Previous`, next: `Next &rarr;` },
    onkeyup = ({ prev, next }) => ({
      ArrowLeft: prev[0],
      ArrowRight: next[0],
    }),
    prev_snippet,
    children,
    between,
    next_snippet,
    ...rest
  }: Props = $props()

  // Convert items to consistent [key, value] format
  let items_arr = $derived(
    (items ?? []).map((itm) => (typeof itm === `string` ? [itm, itm] : itm)) as Item[],
  )

  // Calculate prev/next items with wraparound
  let idx = $derived(items_arr.findIndex(([key]) => key === current))
  let prev = $derived(items_arr[idx - 1] ?? items_arr[items_arr.length - 1])
  let next = $derived(items_arr[idx + 1] ?? items_arr[0])

  // Validation and logging
  $effect.pre(() => {
    if (log !== `silent`) {
      if (items_arr.length < 2 && log === `verbose`) {
        console.warn(
          `PrevNext received ${items_arr.length} items - minimum of 2 expected`,
        )
      }

      if (idx < 0 && log === `errors`) {
        const valid = items_arr.map(([key]) => key)
        console.error(
          `PrevNext received invalid current=${current}, expected one of ${valid}`,
        )
      }
    }
  })

  function handle_keyup(event: KeyboardEvent) {
    if (!onkeyup) return
    const key_map = onkeyup({ prev, next })
    const to = key_map[event.key]
    if (to) goto(to, goto_options)
  }
</script>

<svelte:window onkeyup={handle_keyup} />

{#if items_arr.length > 2}
  <svelte:element this={node} class="prev-next" {...rest}>
    <!-- ensures `prev` is a defined [key, value] tuple.
      Due to prior normalization of the `items` prop, any defined `prev` item
      is guaranteed to be a 2-element array except if `prev` is null.
    -->
    {#if prev?.length >= 2}
      {#if prev_snippet}
        {@render prev_snippet({ item: prev })}
      {:else if children}
        {@render children({ kind: `prev`, item: prev })}
      {:else}
        <div>
          {#if titles.prev}<span>{@html titles.prev}</span>{/if}
          <a href={prev[0]}>{prev[0]}</a>
        </div>
      {/if}
    {/if}
    {@render between?.()}
    {#if next?.length >= 2}
      {#if next_snippet}
        {@render next_snippet({ item: next })}
      {:else if children}
        {@render children({ kind: `next`, item: next })}
      {:else}
        <div>
          {#if titles.next}<span>{@html titles.next}</span>{/if}
          <a href={next[0]}>{next[0]}</a>
        </div>
      {/if}
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
