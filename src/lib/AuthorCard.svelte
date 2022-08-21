<script>
  import SanityImage from '$lib/SanityImage.svelte'

  export let author
</script>

{#if author?.name}
  <div class="grid grid-cols-1 gap-0">
    <div class="avatar">
      <div class="rounded-full w-14 h-14">
        <a href={author.slug.current}>
          <SanityImage image={author.image} maxWidth={100} alt={author.name} />
        </a>
      </div>
    </div>
    <div class="hover:underline"><a href={author.slug.current}>{author.name}</a></div>
  </div>
{/if}

<style>
</style>
