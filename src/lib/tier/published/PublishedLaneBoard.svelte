<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import {heroDetails} from '$lib/stores/heroStores'
  import {getTiersRingColor} from '$lib/helpers/colors'
  import {getHeroGradeLetter} from '$lib/helpers/heroHelpers'
  import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte'
  export let columnItems
  function handleClick(item) {
    heroDetails.set(item)
    console.log(item)
  }
</script>

<section class="board">
  <div class="grid grid-cols-1 md:grid-cols-5">
    {#each columnItems as column (column.id)}
      <div class="col-span-1 w-full p-1 border-2">
        <div class="grid">
          <p class=" text-center h-3 mb-2">{column.name}</p>
          <div class="column-content flex flex-row flex-wrap overflow-auto gap-3 p-3 min-h-box">
            {#each column.items as item (item.id)}
              <div
                class="w-8 h-10 cursor-pointer"
                on:click={() => {
                  handleClick(item)
                }}
              >
                <div class="grid">
                  <label for={`heroInfoModal`} class="cursor-pointer modal-button">
                    <SanityImage
                      image={item.image}
                      alt={item.name + ' image'}
                      maxHeight={100}
                      maxWidth={100}
                      customClass={`rounded-full w-8 ring ${getTiersRingColor(
                        getHeroGradeLetter(item.heroGrade)
                      )} ring-offset-base-100 ring-offset-2`}
                    />
                  </label>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .min-h-box {
    min-height: 120px;
  }
  .board {
    min-height: 120px;
  }
  .column-content {
    height: 100%;
  }
</style>
