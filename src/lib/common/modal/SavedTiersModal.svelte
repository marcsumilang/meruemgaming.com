<script>
  import {savedTiers, getTierBoardData, loading, deleteTier} from '$lib/stores/heroStores.js'
  import {userSession} from '$lib/stores/sessionStores.js'
  import Loading from '$lib/common/spinner/Loading.svelte'
  import ConfirmModal from '$lib/common/modal/DeleteTierModal.svelte'
  import dayjs from 'dayjs'
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`savedTiersModal`} class="modal-toggle" />
<label for={`savedTiersModal`} class="modal cursor-pointer glass">
  <label class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
    <label for="savedTiersModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label
    >
    <h3>{$userSession?.user?.user_metadata?.name}</h3>

    <table class="table table-zebra table-compact w-full">
      <thead>
        <tr>
          <td>Tier Name</td>
          <td>Created</td>
          <td>Published</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {#if $loading}
          <tr>
            <td colspan="3" align="center">
              <Loading />
            </td>
          </tr>
        {:else}
          {#each $savedTiers as tier}
            <tr>
              <td>
                {tier.tier_name}
              </td>
              <td>
                {dayjs(tier.created_at).format('MMM DD, YYYY')}
              </td>
              <td>
                {#if tier.published}
                  <span class="badge badge-xs badge-success">YES</span>
                {:else}
                  <span class="badge badge-xs"> NO </span>
                {/if}
              </td>
              <td>
                <label
                  for={`savedTiersModal`}
                  class="btn btn-info btn-xs"
                  on:click={() => {
                    getTierBoardData(tier.id)
                  }}
                >
                  Load on Board
                </label>
                <ConfirmModal label="delete" description="Delete Tier?" id={tier.id} />
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </label>
</label>
