<script>
  import {Circle3} from 'svelte-loading-spinners'
  import {loading} from '$lib/stores/heroStores'
</script>

{#if $loading}
  <Circle3 size="100" unit="px" color="#FF3E00" duration="1s" />
{/if}
