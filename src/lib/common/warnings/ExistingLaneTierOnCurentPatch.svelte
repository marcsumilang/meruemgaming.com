<script>
  import IoIosCloseCircleOutline from 'svelte-icons/io/IoIosCloseCircleOutline.svelte'
  $: show = true
</script>

{#if show}
  <div class="alert alert-info shadow-lg my-2">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current flex-shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span
        >Note: The system only allow 1 <strong>Lane Tier Guide</strong> per Patch Note. You can only
        update your existing guide.</span
      >
    </div>
    <div class="flex-none">
      <button
        class="btn btn-circle btn-ghost"
        on:click={() => {
          show = false
        }}
      >
        <IoIosCloseCircleOutline />
      </button>
    </div>
  </div>
{/if}
