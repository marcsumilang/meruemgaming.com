<script>
  import AuthorCard from '$lib/AuthorCard.svelte'

  export let portableText

  $: ({author} = portableText.block)
</script>

{#if author}
  <AuthorCard {author} />
{/if}
