<script>
	import { heroDetails } from '$lib/stores/heroStores.js';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`heroInfoModal`} class="modal-toggle" />
<label for={``} class="modal cursor-pointer ">
	<label class="modal-box relative bg-transparent p-0" for="">
		<label for="heroInfoModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label>
		{#if $heroDetails}
			<HeroCardInfo hero={$heroDetails} />
		{/if}
	</label>
</label>
