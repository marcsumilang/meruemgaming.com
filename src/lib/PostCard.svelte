<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import dayjs from 'dayjs'

  export let post
</script>

<div class="max-w-2xl bg-white my-3 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <a href={post.slug.current} aria-label={post.slug.curren}>
        <SanityImage
          image={post.image}
          maxWidth={500}
          customClass="h-48 w-full object-cover md:h-full md:w-48"
          alt={post.title}
        />
      </a>
    </div>
    <div class="p-8">
      <a
        href={post.slug.current}
        aria-label={post.title}
        class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >{post.title}
      </a>
      <p class="mt-2 text-slate-500">
        {#if post.short_description}
          {post.short_description}
        {:else}
          Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus
          veritatis sed molestiae voluptates incidunt iure sapiente.
        {/if}
      </p>
      <div class="capitalize tracking-wide text-sm text-base-content font-semibold mt-2">
        {dayjs(post.publishedA).format('MMMM DD, YYYY hh:00 A')}
      </div>
    </div>
  </div>
</div>
<hr />

<style>
</style>
