<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import dayjs from 'dayjs'

  export let data
  export let maxWidth = 300
  export let maxHeight = null
  export let customClass = null
</script>

{#each data as value}
  <div class="w-full bg-white my-3 rounded-xl shadow-md overflow-hidden md:max-w-sm">
    <div class="md:flex">
      <div class="md:shrink-0">
        <a href={value.slug.current} aria-label={value.slug.current}>
          <SanityImage image={value.image} {maxWidth} {maxHeight} {customClass} alt={value.name} />
        </a>
      </div>
      <div class="p-8">
        <a
          href={value.slug.current}
          aria-label={value.title ? value.title : value.name}
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >{value.title ? value.title : value.name}
        </a>
      </div>
    </div>
  </div>
  <hr />
{/each}
