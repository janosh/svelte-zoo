<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { CopyButton, Icon } from '$lib'

  export let content: string = ``
  export let style: string | null = null
  export let state: `default` | `success` | `error` = `default`
  export let global_selector: string | null = null
  export let global: boolean = false
  export let skip_selector: string | null = `button`
  export let as: string = `button`
  export let labels: Record<
    `default` | `success` | `error`,
    { icon: string; text: string }
  > = {
    default: { icon: `Copy`, text: `Copy` },
    success: { icon: `Check`, text: `Copied` },
    error: { icon: `Alert`, text: `Error` },
  }

  if (global || global_selector) {
    afterNavigate(() => {
      for (const node of document.querySelectorAll(global_selector ?? `pre > code`)) {
        // skip if <pre> already contains a button (presumably for copy)
        const pre = node.parentElement
        if (!pre || (skip_selector && pre.querySelector(skip_selector))) continue

        new CopyButton({
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
  <svelte:element this={as} on:click={copy} {style} role="button" tabindex={0}>
    <slot>
      <Icon {icon} /><span>{text}</span>
    </slot>
  </svelte:element>
{/if}
