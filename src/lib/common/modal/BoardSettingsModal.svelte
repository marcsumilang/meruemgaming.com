<script>
	import {
		currentPatch,
		tierType,
		getMyTiers,
		clearBoard,
		getExistingHeroTier,
		getExistingLaneTier
	} from '$lib/stores/heroStores.js';
	import { userSession, userProfile } from '$lib/stores/sessionStores';

	function onChangeBoardType() {
		console.log($userProfile);
		if ($userProfile?.email && $currentPatch?.name) {
			if ($tierType == 'laneTier') {
				getExistingLaneTier($userProfile, $currentPatch?.name);
			} else if ($tierType == 'heroTier') {
				getExistingHeroTier($userProfile, $currentPatch?.name);
			} else {
			}
		}
	}
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`boardSettingsModal`} class="modal-toggle" />
<label for={`boardSettingsModal`} class="modal cursor-pointer ">
	<label class="modal-box relative" for="">
		<label for={`boardSettingsModal`} class="btn btn-sm btn-circle absolute right-2 top-2 glass"
			>✕</label
		>
		<p class="font-bold">Change Tier Board</p>
		<button
			class={`btn ${
				$tierType != 'laneTier' ? 'btn-outline' : 'btn-primary'
			} btn-info btn-block mt-1`}
			on:click={() => {
				clearBoard();
				tierType.set('laneTier');
				onChangeBoardType();
			}}
		>
			Lane Tier
		</button>
		<button
			class={`btn ${
				$tierType != 'heroTier' ? 'btn-outline' : 'btn-primary'
			} btn-info btn-block mt-1`}
			on:click={() => {
				clearBoard();
				tierType.set('heroTier');
				onChangeBoardType();
			}}
		>
			Hero Tier
		</button>
		<button
			class={`btn ${
				$tierType != 'heroMatchup' ? 'btn-outline' : 'btn-primary'
			} btn-info btn-block mt-1`}
			on:click={() => {
				clearBoard();
				tierType.set('heroMatchup');
			}}
		>
			Hero Matchup
		</button>
		{#if $userSession}
			<hr />
			<label
				for="savedTiersModal"
				class="btn btn-info my-1"
				on:click={() => getMyTiers($userSession)}>My Tiers Lists</label
			>
		{/if}
		<hr />
		<button
			class="btn btn-error btn-outline btn-block my-1"
			on:click={() => {
				clearBoard();
			}}>Reset Board</button
		>
	</label>
</label>
