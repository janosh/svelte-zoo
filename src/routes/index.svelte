<script lang="ts">
  import Readme from '../../readme.md'
  import GitHubCorner from '../lib/GitHubCorner.svelte'
  import '../app.css'
</script>

<GitHubCorner
  href="https://github.com/janosh/svelte-github-corner"
  --ghc-bg="white"
  --ghc-color="var(--bodyBg)"
/>

<Readme />
