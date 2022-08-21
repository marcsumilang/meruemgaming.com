<script>
  import PostCard from '$lib/PostCard.svelte'
  import SideBar from '$lib/common/SideBar.svelte'
  export let posts = []
</script>

<section id="posts-section">
  <div class="grid grid-cols-12 overflow-hidden ">
    <div class="col-span-12 lg:col-span-8 lg:p-2">
      {#each posts as post (post.slug.current)}
        <PostCard {post} />
      {/each}
    </div>
    <div class="col-span-12 lg:col-span-4">
      <SideBar />
    </div>
  </div>
</section>

<style>
</style>
