<script>
  import {
    tierBoardId,
    tierBoardName,
    tierBoardDescription,
    tiersLaneBoard,
    saveTier,
    updateTier,
    heroMatchupBoard,
    tierType,
    tiersHeroBoard,
    tierPublished,
    currentPatch
  } from '$lib/stores/heroStores'
  import {userSession, userProfile} from '$lib/stores/sessionStores'

  const formSubmit = () => {
    let selectedBoard = ''

    if ($tierType == 'laneTier') {
      selectedBoard = $tiersLaneBoard
    } else if ($tierType == 'heroTier') {
      selectedBoard = $tiersHeroBoard
    } else if ($tierType == 'heroMatchup') {
      selectedBoard = $heroMatchupBoard
    }

    console.log('selectedBoard', selectedBoard)
    if ($tierBoardId) {
      updateTier(
        $tierBoardName,
        $tierBoardDescription,
        selectedBoard,
        $tierBoardId,
        $tierPublished,
        $userProfile
      )
    } else {
      saveTier(
        $tierBoardName,
        $tierBoardDescription,
        selectedBoard,
        $userSession,
        $tierType,
        $tierPublished,
        $userProfile,
        $currentPatch
      )
    }
  }
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`saveTierListFormModal`} class="modal-toggle" />
<label for={`saveTierListFormModal`} class="modal cursor-pointer glass">
  <label class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
    <label for="saveTierListFormModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass"
      >✕</label
    >
    <h3>Save Tier List</h3>

    <div class="grid grid-cols-1 md:flex md:flex-row justify-end gap-2 my-5">
      {#if $userSession}
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text pr-1">Publish: </span>
            <input type="checkbox" class="toggle" bind:checked={$tierPublished} />
          </label>
        </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <div class="form-control w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Tier name"
            class="input input-bordered w-full"
            bind:value={$tierBoardName}
          />
        </div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <div class="form-control w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Say something about this guide.. (explanation, reasons, etc..)"
            class="input input-bordered w-full"
            bind:value={$tierBoardDescription}
          />
        </div>

        <label
          for="saveTierListFormModal"
          class="btn btn-info btn-outline g-recaptcha"
          data-sitekey="6LfCFsAgAAAAAMn_5mshQ280CD5Ba76Iql3zxgiP"
          data-callback="onSubmit"
          data-action="submit"
          on:click={(e) => {
            formSubmit()
          }}
        >
          {$tierBoardId ? 'Update' : 'Save'} Tier
        </label>
      {/if}
    </div>
  </label>
</label>
