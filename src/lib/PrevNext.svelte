<script lang="ts">
  import { goto } from '$app/navigation'
  import type { Snippet } from 'svelte'
  type Item = string | [string, unknown]
  type T = $$Generic<Item>

  interface Props {
    items?: T[]
    node?: string
    current?: string
    style?: string | null
    log?: `verbose` | `errors` | `silent`
    goto_options?: { replaceState: boolean; noScroll: boolean }
    titles?: { prev: string; next: string }
    on_keyup?: (obj: { prev: Item; next: Item }) => Record<string, string>
    class?: string | null
    prev_snippet?: Snippet<[[item: Item]]>
    children?: Snippet<[[kind: `prev` | `next`, item: Item]]>
    between?: Snippet
    next_snippet?: Snippet<[[item: Item]]>
  }

  let {
    items = [],
    node = `nav`,
    current = ``,
    style = null,
    log = `errors`,
    goto_options = {
      replaceState: true,
      noScroll: true,
    },
    titles = {
      prev: `&larr; Previous`,
      next: `Next &rarr;`,
    },
    on_keyup = ({ prev, next }) => ({
      ArrowLeft: prev[0],
      ArrowRight: next[0],
      Escape: `/`,
    }),
    class: class_name = null,
    prev_snippet,
    children,
    between,
    next_snippet,
  }: Props = $props()

  // Convert items to consistent [key, value] format
  let arr = $derived(
    (items ?? []).map((itm) => (typeof itm === `string` ? [itm, itm] : itm)) as Item[],
  )

  // Calculate prev/next items with wraparound
  let idx = $derived(arr.findIndex(([key]) => key === current))
  let prev = $derived(arr[idx - 1] ?? arr[arr.length - 1])
  let next = $derived(arr[idx + 1] ?? arr[0])

  // Validation and logging
  $effect.pre(() => {
    if (log !== `silent`) {
      if (arr.length < 2 && log === `verbose`) {
        console.warn(`PrevNext received ${arr.length} items - minimum of 2 expected`)
      }

      if (idx < 0 && log === `errors`) {
        const valid = arr.map(([key]) => key)
        console.error(
          `PrevNext received invalid current=${current}, expected one of ${valid}`,
        )
      }
    }
  })

  function handle_keyup(event: KeyboardEvent) {
    const to = on_keyup({ prev, next })[event.key]
    if (to) goto(to, goto_options)
  }
</script>

<svelte:window onkeyup={handle_keyup} />

{#if arr.length > 2}
  <svelte:element this={node} {style} class="prev-next {class_name}">
    {#if prev?.length >= 2}
      {#if prev_snippet}
        {@render prev_snippet({ item: prev[1] })}
      {:else if children}
        {@render children({ kind: `prev`, item: prev[1] })}
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
        {@render next_snippet({ item: next[1] })}
      {:else if children}
        {@render children({ kind: `next`, item: next[1] })}
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
