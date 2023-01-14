<script lang="ts">
  import Readme from '$root/readme.md'
  import { DemoNav } from '$site'
</script>

<Readme>
  <svelte:fragment slot="nav">
    <h2>📝 &thinsp; Component Demos</h2>
    <DemoNav />
  </svelte:fragment>
</Readme>
