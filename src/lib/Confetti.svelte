<script lang="ts">
  // let emojis rain across the screen to playfully show some event was triggered
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  export let speed: number = 0.2
  export let n_items: number = 50
  export let freeze: boolean = false

  const emojis = [`🥳`, `🎉`, `✨`]

  let confetti: { emoji: string; x: number; y: number; r: number }[] = [
    ...Array(n_items).keys(),
  ]
    .map((idx) => ({
      emoji: emojis[idx % emojis.length],
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      r: 0.1 + Math.random() * 1,
    }))
    .sort((a, b) => a.r - b.r)
  let frame_id: number

  function loop() {
    if (typeof requestAnimationFrame == `undefined`) return
    frame_id = requestAnimationFrame(loop)

    confetti = confetti.map((emoji) => {
      emoji.y += speed * emoji.r
      if (emoji.y > 120) emoji.y = -20
      return emoji
    })
  }

  onMount(() => {
    loop()
    return () => cancelAnimationFrame(frame_id)
  })

  $: if (freeze) cancelAnimationFrame(frame_id)
  $: if (!freeze) loop()
</script>

<div transition:fade>
  {#each confetti as con}
    <span style="left: {con.x}%; top: {con.y}%; transform: scale({con.r})">
      {con.emoji}
    </span>
  {/each}
</div>

<style>
  span {
    z-index: 10;
    position: fixed;
    font-size: 5vw;
    user-select: none;
  }
</style>
