<script>
	import {
		itemDetails,
		heroMatchupBoard,
		selectHeroModal,
		allItems
	} from '$lib/stores/heroStores.js';
	import SanityImage from '$lib/SanityImage.svelte';
	import ItemFilter from '$lib/tier/lists/ItemFilter.svelte';
	import { alertError } from '$lib/helpers/toast';
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`selectItemsModal`} class="modal-toggle" />
<label for={`selectItemsModal`} class="modal cursor-pointer ">
	<label class="modal-box relative w-11/12 max-w-5xl min-h-fit" for="">
		<label for={`selectItemsModal`} class="btn btn-sm btn-circle absolute right-2 top-2 glass"
			>✕</label
		>
		<h3>Select Items</h3>
		<ItemFilter />
		<div class="flex flex-row flex-wrap gap-2">
			{#each $allItems as item}
				<div class="grid gap-2">
					<label
						for="itemInfoModal"
						class="w-12 h-12 cursor-pointer"
						on:click={() => {
							itemDetails.set(item);
						}}
					>
						<SanityImage
							image={item.image}
							alt={`image of mlbb item ${item.name}`}
							maxWidth={50}
							maxHeight={50}
							customClass={`rounded-full ring ${
								($heroMatchupBoard.left.builds.includes(item) &&
									$selectHeroModal.arrayGroup == 'left') ||
								($heroMatchupBoard.right.builds.includes(item) &&
									$selectHeroModal.arrayGroup == 'right')
									? 'ring-green-400'
									: 'ring-blue-400'
							}`}
						/>
					</label>

					<button
						class="btn btn-xs btn-info"
						on:click={() => {
							if ($selectHeroModal.boardType == 'heroMatchup') {
								if ($selectHeroModal.arrayGroup == 'left') {
									var _left = $heroMatchupBoard.left.builds;
									if (item.category.name == 'Movement') {
										var filtered = $heroMatchupBoard.left.builds.filter(function (value) {
											return value.category.name == 'Movement';
										});
										if (filtered.length > 0) {
											alertError('One Boots per build only.');
											return '';
										}
									}
									if (_left.length < 8) {
										_left.push(item);
										$heroMatchupBoard.left.builds = _left;
									}
								} else {
									var _right = $heroMatchupBoard.right.builds;
									if (item.category.name == 'Movement') {
										var filtered = $heroMatchupBoard.right.builds.filter(function (value) {
											return value.category.name == 'Movement';
										});
										if (filtered.length > 0) {
											alertError('One Boots per build only.');
											return '';
										}
									}
									if (_right.length < 8) {
										_right.push(item);
										$heroMatchupBoard.right.builds = _right;
									}
								}
							}
						}}
					>
						Add
					</button>
				</div>
			{/each}
		</div>
	</label>
</label>
