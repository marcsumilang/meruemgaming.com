<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import SanityImage from '$lib/SanityImage.svelte';
	import { heroDetails } from '$lib/stores/heroStores';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import { selectHeroModal, tiersLaneBoard } from '$lib/stores/heroStores';
	export let columnItems;
	export let tierName;
	export let tierKey;
	const flipDurationMs = 300;
</script>

<section class="board">
	<div class="grid grid-cols-1 md:grid-cols-5">
		{#each columnItems as column, key (column.id)}
			<div class="col-span-1 w-full p-1 border-2" animate:flip={{ duration: flipDurationMs }}>
				<div class="grid">
					<p class=" text-center h-3 mb-2">
						{column.name}
						<label
							for={`selectHeroModal`}
							on:click={() => {
								selectHeroModal.set({
									boardType: 'laneTier',
									arrayGroup: 'left',
									tier: tierName,
									lane: column.name,
									tierKey: tierKey,
									laneKey: key
								});
							}}
							class="btn btn-circle btn-xs cursor-pointer modal-button"
						>
							+
						</label>
					</p>
					<div class="column-content flex flex-row flex-wrap overflow-auto gap-3 p-3 min-h-box">
						{#each column.items as item, key2 (item.id)}
							{#if item?.image}
								<div>
									<div
										class="w-10 h-10 cursor-pointer"
										on:click={() => {
											heroDetails.set(item);
										}}
									>
										<div class="grid">
											<label for={`heroInfoModal`} class="cursor-pointer modal-button">
												<div class="grid w-10 indicator">
													<HeroGradeBadge heroGrade={getHeroGradeLetter(item.heroGrade)} />
													<SanityImage
														image={item.image}
														alt={item.name + ' image'}
														maxHeight={100}
														maxWidth={100}
														customClass={`rounded-full w-10 ring ${getTiersRingColor(
															getHeroGradeLetter(item.heroGrade)
														)} ring-offset-base-100 ring-offset-2`}
													/>
												</div>
											</label>
										</div>
									</div>
									<center>
										<button
											class="btn-xs btn-outline btn-error"
											on:click={() => {
												console.log('Tier', tierKey);
												console.log('Role', key);
												if ($tiersLaneBoard[tierKey].roles[key].items.includes(item)) {
													let remainingArr = $tiersLaneBoard[tierKey].roles[key].items.filter(
														(data) => data.name != item.name
													);
													$tiersLaneBoard[tierKey].roles[key].items = remainingArr;
												}
											}}
										>
											x
										</button>
									</center>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.min-h-box {
		min-height: 100px;
	}
	.board {
		min-height: 100px;
	}
	.column-content {
		height: 100%;
	}
</style>
