<script>
  import {flip} from 'svelte/animate'
  import {dndzone} from 'svelte-dnd-action'
  import {heroDetails, heroMatchupBoard, allItems} from '$lib/stores/heroStores.js'
  import SanityImage from '$lib/SanityImage.svelte'
  import ItemInfo from '$lib/common/ItemInfo.svelte'

  const flipDurationMs = 300
  function handleDndConsider(e) {
    $heroMatchupBoard.left.builds = e.detail.items
  }
  function handleDndFinalize(e) {
    $heroMatchupBoard.left.builds = e.detail.items
  }
  function handleClick(item) {
    heroDetails.set(item)
    console.log(item)
  }
</script>

<section
  class="flex flex-row gap-3 p-3 border-2 w-96 min-h-16 overflow-x-auto overflow-y-hidden"
  use:dndzone={{
    items: $heroMatchupBoard.left.builds,
    flipDurationMs,
    type: 'items',

    dropFromOthersDisabled: $heroMatchupBoard.left.builds.length < 6 ? false : true
  }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each $heroMatchupBoard.left.builds as item (item.id)}
    <div
      class="flex flex-row flex-wrap gap-10 h-10 md:h-12"
      animate:flip={{duration: flipDurationMs}}
      on:click={() => handleClick(item)}
    >
      <ItemInfo {item} key={`build${item.id}`}>
        <SanityImage
          image={item.image}
          alt={`image of mlbb item ${item.name}`}
          maxHeight={100}
          maxWidth={100}
          customClass="w-10 md:w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
        />
      </ItemInfo>
    </div>
  {/each}
</section>
