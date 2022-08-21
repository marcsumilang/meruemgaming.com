<script>
  import {deleteTier} from '$lib/stores/heroStores.js'
  export let label
  export let description
  export let id
</script>

<label for="confirmModal" class="btn btn-error btn-xs btn-outline">
  {label}
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`confirmModal`} class="modal-toggle" />
<label for={`confirmModal`} class="modal cursor-pointer glass">
  <label class="modal-box relative" for="">
    <label for="confirmModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label>
    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Confirmation</h2>
        <p>{description}</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-warning"
            on:click={() => {
              deleteTier(id)
            }}>Delete</button
          >
          <label for="confirmModal" class="btn btn-ghost">Cancel</label>
        </div>
      </div>
    </div>
  </label>
</label>
