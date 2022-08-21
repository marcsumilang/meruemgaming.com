<script>
  import SanityImage from '$lib/SanityImage.svelte'
  import {heroDetails} from '$lib/stores/heroStores'
  import {getTiersRingColor} from '$lib/helpers/colors'
  import {getHeroGradeLetter} from '$lib/helpers/heroHelpers'

  export let tiersHeroBoard
  function handleClick(item) {
    heroDetails.set(item)
    console.log(item)
  }
</script>

<div class="grid grid-cols-1">
  {#each tiersHeroBoard as tier}
    <div class="flex flex-row">
      <div class={`${tier.color} text-black grid content-center text-center p-3 w-8`}>
        {tier.name}
      </div>
      <div class="grow">
        <div class="board border-2 p-2 flex flex-row flex-wrap gap-3">
          {#each tier.items as item (item.id)}
            <div
              class="w-8 h-6 cursor-pointer"
              on:click={() => {
                handleClick(item)
              }}
            >
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
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .board {
    min-height: 150px;
  }
</style>
