<script>
  import {getAvailablePages} from '$lib/stores/searchStores'
</script>

<div class="flex flex-row justify-center mt-3">
  <input
    type="text"
    on:keyup={(e) => {
      //console.log('e.key', e.key)
      if (e.key == 'Enter') {
        //console.log('search', e.target.value)
        getAvailablePages(e.target.value)
      }
    }}
    placeholder="Search Hero, Guides, Tier, Patch, Items, Spells"
    class="input input-bordered w-full max-w-7xl text-base-content"
  />

  <button class="btn" style="" aria-label="Search Button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
      />
    </svg>
  </button>
</div>
