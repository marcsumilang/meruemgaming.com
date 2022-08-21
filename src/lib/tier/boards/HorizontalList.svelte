<script>
  import {flip} from 'svelte/animate'
  import {dndzone} from 'svelte-dnd-action'
  import {heroDetails} from '$lib/stores/heroStores.js'
  import SanityImage from '$lib/SanityImage.svelte'
  import {getTiersRingColor} from '$lib/helpers/colors'
  import {getHeroGradeLetter} from '$lib/helpers/heroHelpers'
  import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte'

  export let items
  const flipDurationMs = 300
  function handleDndConsider(e) {
    items = e.detail.items
  }
  function handleDndFinalize(e) {
    items = e.detail.items
  }
  function handleClick(item) {
    heroDetails.set(item)
    console.log(item)
  }
</script>

<section
  class="flex flex-row gap-3 p-3 overflow-x-auto overflow-y-hidden"
  use:dndzone={{items, flipDurationMs}}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as item (item.id)}
    <div
      class="flex flex-row flex-wrap gap-10 h-16 md:h-20"
      animate:flip={{duration: flipDurationMs}}
      on:click={() => handleClick(item)}
    >
      <label for={`heroInfoModal`} class="cursor-pointer modal-button mb-4 mr-2">
        <div class="grid w-10 md:w-16 indicator">
          <HeroGradeBadge heroGrade={getHeroGradeLetter(item.heroGrade)} />
          <SanityImage
            image={item.image}
            alt={item.name + ' image'}
            maxHeight={100}
            maxWidth={100}
            customClass={`rounded-full w-10 md:w-16 ring ${getTiersRingColor(
              getHeroGradeLetter(item.heroGrade)
            )} ring-offset-base-100 ring-offset-2`}
          />
          <p class="text-center mt-1">{item.name}</p>
        </div>
      </label>
    </div>
  {/each}
</section>

<style>
  /* section {
    height: 60px;
    padding: 0.3em;
    border: 1px solid black;
    display: flex;
    overflow-x: scroll;
  }
  div {
    height: 45px;
    display: inline-block;
    padding: 0.9em;
    border: 1px solid blue;
    margin: 0 0.15em;
  } */
</style>
