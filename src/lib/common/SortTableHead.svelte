<script>
  import IoMdArrowDropup from 'svelte-icons/io/IoMdArrowDropup.svelte'
  import IoMdArrowDropdown from 'svelte-icons/io/IoMdArrowDropdown.svelte'
  export let title
  export let sortBy
  export let sort = (id) => {}
  export let id
</script>

<th on:click={() => sort(id)}>
  <span class="cursor-pointer">
    {title}
  </span>

  <button
    class={`icon-md  tooltip tooltip-bottom ${sortBy.col == id ? '' : 'hidden'}`}
    data-tip={sortBy.ascending ? 'Ascending' : 'descending'}
    style="width: 30px;"
  >
    {#if sortBy.ascending}
      <IoMdArrowDropup />
    {:else}
      <IoMdArrowDropdown />
    {/if}
  </button>
</th>
