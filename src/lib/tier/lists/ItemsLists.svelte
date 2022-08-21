<script>
  import {flip} from 'svelte/animate'
  import {dndzone} from 'svelte-dnd-action'
  import {itemDetails, heroMatchupBoard, allItems} from '$lib/stores/heroStores.js'
  import SanityImage from '$lib/SanityImage.svelte'
  import ItemInfo from '$lib/common/ItemInfo.svelte'

  import {getTiersRingColor} from '$lib/helpers/colors'
  import {getHeroGradeLetter} from '$lib/helpers/heroHelpers'
  import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte'

  const flipDurationMs = 300
  function handleDndConsider(e) {
    $allItems = e.detail.items
  }
  function handleDndFinalize(e) {
    $allItems = e.detail.items
  }
  function handleClick(item) {
    itemDetails.set(item)
    console.log(item)
  }
</script>

<section
  class="flex flex-row gap-3 p-3 overflow-x-auto "
  use:dndzone={{items: $allItems, flipDurationMs, type: 'items'}}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each $allItems as item (item.id)}
    <div
      class="flex flex-row flex-wrap gap-10 h-12 md:h-16"
      animate:flip={{duration: flipDurationMs}}
      on:click={() => handleClick(item)}
    >
      <label for={`itemInfoModal`} class="cursor-pointer modal-button mb-4 mr-2">
        <div class="grid w-10 md:w-16 indicator">
          <SanityImage
            image={item.image}
            alt={`image of mlbb item ${item.name}`}
            maxHeight={100}
            maxWidth={100}
            customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
          />
        </div>
      </label>
    </div>
  {/each}
</section>
