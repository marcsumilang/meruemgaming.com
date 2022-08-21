<script>
	import { heroMatchupBoard } from '$lib/stores/heroStores.js';

	let roles = ['Jungle', 'Roam', 'Mid Lane', 'Exp Lane', 'Gole Lane'];
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`selectMatchupLaneModal`} class="modal-toggle" />
<label for={`selectMatchupLaneModal`} class="modal cursor-pointer ">
	<label class="modal-box relative" for="">
		<label for={`selectMatchupLaneModal`} class="btn btn-sm btn-circle absolute right-2 top-2 glass"
			>✕</label
		>
		<p class="font-bold">Lane</p>
		{#each roles as role}
			<button
				class={`btn ${
					$heroMatchupBoard.lane != role ? 'btn-outline' : 'btn-primary'
				} btn-info btn-block mt-1`}
				on:click={() => {
					$heroMatchupBoard.lane = role;
				}}
			>
				{role}
			</button>
		{/each}
	</label>
</label>
