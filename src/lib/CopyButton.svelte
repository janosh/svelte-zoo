<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { CopyButton, Icon } from '$lib'
  import type { Snippet } from 'svelte'
  import { mount } from 'svelte'

  interface Props {
    content?: string
    state?: `default` | `success` | `error`
    global_selector?: string | null
    global?: boolean
    skip_selector?: string | null
    as?: string
    labels?: Record<`default` | `success` | `error`, { icon: string; text: string }>
    children?: Snippet<[]>
    [key: string]: unknown
  }

  let {
    content = ``,
    state = $bindable(`default`),
    global_selector = null,
    global = false,
    skip_selector = `button`,
    as = `button`,
    labels = {
      default: { icon: `Copy`, text: `Copy` },
      success: { icon: `Check`, text: `Copied` },
      error: { icon: `Alert`, text: `Error` },
    },
    children,
    ...rest
  }: Props = $props()

  if (global || global_selector) {
    afterNavigate(() => {
      for (const node of document.querySelectorAll(global_selector ?? `pre > code`)) {
        // skip if <pre> already contains a button (presumably for copy)
        const pre = node.parentElement
        if (!pre || (skip_selector && pre.querySelector(skip_selector))) continue

        mount(CopyButton, {
          target: pre,
          props: {
            content: node.textContent ?? ``,
            style: `position: absolute; top: 9pt; right: 9pt;`,
          },
        })
      }
    })
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(content)
      state = `success`
    } catch (err) {
      console.error(err)
      state = `error`
    }
    setTimeout(() => (state = `default`), 2000)
  }
</script>

{#if !(global || global_selector)}
  {@const { text, icon } = labels[state]}
  <svelte:element this={as} onclick={copy} role="button" tabindex={0} {...rest}>
    {#if children}
      {@render children()}
    {:else}
      <Icon {icon} />&nbsp;<span>{text}</span>
    {/if}
  </svelte:element>
{/if}
