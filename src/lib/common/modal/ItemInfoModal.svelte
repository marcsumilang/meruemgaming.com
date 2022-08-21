<script>
  import {itemDetails} from '$lib/stores/heroStores.js'
  import SanityImage from '$lib/SanityImage.svelte'
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`itemInfoModal`} class="modal-toggle" />
<label for={`itemInfoModal`} class="modal cursor-pointer ">
  <label class="modal-box relative" for="">
    <label for="itemInfoModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label>
    {#if $itemDetails}
      <div class="flex flex-row gap-5 flex-wrap">
        <div>
          <SanityImage
            image={$itemDetails.image}
            alt={`image of mlbb item ${$itemDetails.name}`}
            maxWidth={100}
            maxHeight={100}
            customClass="rounded-full w-24 ring ring-secondary ring-offset-base-100 ring-offset-2"
          />
        </div>
        <div class="grid content-center gap-1">
          <div>
            <h3 class="text-lg text-base-content font-bold capitalize">
              {$itemDetails.name}
              <span class="badge badge-secondary ">
                {$itemDetails.category?.name}
              </span>
              <span class="badge badge-secondary ">
                Tier {$itemDetails.tier.name}
              </span>
            </h3>
          </div>
          <div class="flex flex-row flex-wrap gap-2">
            <span>Cost:</span>
            <span class=" ">
              {$itemDetails.cost}
            </span>
            <span>Sell:</span>
            <span class=" ">
              {$itemDetails.sell}
            </span>
          </div>
        </div>
      </div>

      <div class="grid gap-3 mt-3">
        <div>
          <p>Item Stats</p>
          {#each $itemDetails.itemStats as stat}
            <p>{stat}</p>
          {/each}
        </div>
        {#if $itemDetails.uniqueAttribute}
          <div>
            <h4>Unique Attribute</h4>
            <p>{$itemDetails.uniqueAttribute}</p>
          </div>
        {/if}
        {#if $itemDetails.uniquePassive}
          <div>
            <h4>Unique Passive</h4>
            <p>{$itemDetails.uniquePassive}</p>
          </div>
        {/if}
      </div>
    {/if}
  </label>
</label>
