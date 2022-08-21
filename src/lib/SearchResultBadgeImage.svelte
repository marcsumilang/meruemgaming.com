<script>
  import SanityImage from '$lib/SanityImage.svelte'

  export let data
</script>

{#each data as value}
  <a href={value.slug.current} class="pt-3 link w-32 hover:bg-warning hover:text-white">
    <center> <SanityImage image={value.image} maxWidth={100} alt={value.name} /></center>
    <p class="text-center">{value.name}</p>
  </a>
{/each}
