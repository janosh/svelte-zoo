<script lang="ts">
  import Readme from '../../readme.md'
  import GitHubCorner from '../lib/GitHubCorner.svelte'
</script>

<GitHubCorner
  href="https://github.com/janosh/svelte-github-corner"
  --ghc-bg="white"
  --ghc-color="var(--bodyBg)"
/>

<img src="/favicon.svg" alt="Svelte GitHub Corner" height="75" />
<Readme />

<style>
  :global(h1) {
    font-size: clamp(2rem, 2rem + 2vw, 3rem);
    display: flex;
    place-items: center;
    place-content: center;
  }
  @media (max-width: 400px) {
    :global(h1) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  :global(img[src='/favicon.svg']) {
    display: block;
    margin: auto;
  }
  :global(div.hide-in-demo) {
    display: none;
  }
</style>
