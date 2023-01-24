<script lang="ts">
  import { Icon } from '.'

  export let content: string
  export let style: string | null = null
  export let state: 'default' | 'success' | 'error' = `default`

  const labels = {
    default: [`Copy`, `Copy`],
    success: [`Copied`, `Check`],
    error: [`Error`, `Alert`],
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

<button on:click={copy} {style}>
  <Icon icon={labels[state][1]} />
  <span>{labels[state][0]}</span>
</button>
