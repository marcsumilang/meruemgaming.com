<script>
  import {allSpells, heroMatchupBoard, spellDetails} from '$lib/stores/heroStores.js'
  import SpellInfo from '$lib/common/SpellInfo.svelte'
  import SanityImage from '$lib/SanityImage.svelte'
  export let heroPower
</script>

{#if heroPower}
  {#if heroPower.name == 'left'}
    <!-- Put this part before </body> tag -->
    <input
      type="checkbox"
      id={`selectSpellModal${$heroMatchupBoard.left.name}`}
      class="modal-toggle"
    />
    <label for={`selectSpellModal${$heroMatchupBoard.left.name}`} class="modal cursor-pointer ">
      <label class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
        <label
          for={`selectSpellModal${$heroMatchupBoard.left.name}`}
          class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label
        >
        <h3>Select Spell</h3>

        <div class="flex flex-row flex-wrap gap-2">
          {#each $allSpells as spell}
            <div class="grid gap-1">
              <input
                type="radio"
                name="radio-2"
                class="radio radio-primary"
                bind:group={$heroMatchupBoard.left.spell}
                value={spell}
              />
              <label
                for="spellInfoModal"
                class="cursor-pointer"
                on:click={() => {
                  spellDetails.set(spell)
                }}
              >
                <SanityImage
                  image={spell.image}
                  alt={`image of mlbb spell ${spell.name}`}
                  maxWidth={50}
                  customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
                />
              </label>
            </div>
          {/each}
        </div>
      </label>
    </label>
  {:else}
    <!-- Put this part before </body> tag -->
    <input
      type="checkbox"
      id={`selectSpellModal${$heroMatchupBoard.right.name}`}
      class="modal-toggle"
    />
    <label for={`selectSpellModal${$heroMatchupBoard.right.name}`} class="modal cursor-pointer ">
      <label class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
        <label
          for={`selectSpellModal${$heroMatchupBoard.right.name}`}
          class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label
        >
        <h3>Select Spell</h3>

        <div class="flex flex-row flex-wrap gap-2">
          {#each $allSpells as spell}
            <div class="grid gap-1">
              <input
                type="radio"
                name="radio-2"
                class="radio radio-primary"
                bind:group={$heroMatchupBoard.right.spell}
                value={spell}
              />
              <label
                for="spellInfoModal"
                class="cursor-pointer"
                on:click={() => {
                  spellDetails.set(spell)
                }}
              >
                <SanityImage
                  image={spell.image}
                  alt={`image of mlbb spell ${spell.name}`}
                  maxWidth={50}
                  customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
                />
              </label>
            </div>
          {/each}
        </div>
      </label>
    </label>
  {/if}
{/if}
