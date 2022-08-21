<script>
  import SanityImage from '$lib/SanityImage.svelte'

  export let portableText
  $: ({block} = portableText)
</script>

{#if block.asset}
  <figure>
    <SanityImage image={block} alt={block.caption} />
    {#if block.caption}
      <figcaption>{block.caption}</figcaption>
    {/if}
  </figure>
{/if}
