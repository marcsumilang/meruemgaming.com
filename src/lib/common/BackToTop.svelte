<script>
  import IoIosArrowDropupCircle from 'svelte-icons/io/IoIosArrowDropupCircle.svelte'
  export let showOnPx = 150
  let hidden = true
  let height = 0

  function goTop() {
    document.body.scrollIntoView()
  }

  function scrollContainer() {
    return document.documentElement || document.body
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false
    } else {
      hidden = true
    }
  }
  console.log(height)
</script>

<svelte:window on:scroll={handleOnScroll} bind:innerHeight={height} />

<div class="back-to-top" on:click={goTop} class:hidden>
  <button class="btn btn-circle tooltip tooltip-left" data-tip="Back to top">
    <IoIosArrowDropupCircle />
  </button>
</div>

<style>
  .back-to-top {
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: fixed;
    z-index: 99;
    right: 20px;
    user-select: none;
    bottom: 20px;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
