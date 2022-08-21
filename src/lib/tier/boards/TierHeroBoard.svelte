<script>
	import { flip } from 'svelte/animate';
	import SanityImage from '$lib/SanityImage.svelte';
	import { heroDetails, tiersHeroBoard, selectHeroModal } from '$lib/stores/heroStores';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	const flipDurationMs = 300;
	function handleClick(item) {
		heroDetails.set(item);
		console.log(item);
	}
</script>

<p class="text-sm">
	Hero Grades ( <HeroGradeBadge heroGrade={'s+'} />
	<HeroGradeBadge heroGrade={'s'} />
	<HeroGradeBadge heroGrade={'a+'} />
	<HeroGradeBadge heroGrade={'a'} />
	<HeroGradeBadge heroGrade={'b+'} />
	<HeroGradeBadge heroGrade={'b'} />)
</p>
<hr class="my-2" />
<div class="grid grid-cols-1">
	{#each $tiersHeroBoard as tier, key}
		<div class="flex flex-row">
			<div class={`${tier.color} text-black grid content-center text-center p-3 w-10`}>
				{tier.name}
				<label
					for={`selectHeroModal`}
					on:click={() => {
						selectHeroModal.set({
							boardType: 'heroTier',
							arrayGroup: 'left',
							tier: tier.name,
							tierKey: key
						});
					}}
					class="btn btn-circle btn-xs cursor-pointer modal-button"
				>
					+
				</label>
			</div>
			<div class="grow">
				<div class="board border-2 p-2 flex flex-row flex-wrap gap-4">
					{#each tier.items as item (item.id)}
						<div animate:flip={{ duration: flipDurationMs }}>
							<div
								class="w-10 h-10 cursor-pointer"
								on:click={() => {
									handleClick(item);
								}}
							>
								<label for={`heroInfoModal`} class="cursor-pointer modal-button">
									<div class="grid w-10 indicator">
										<HeroGradeBadge
											heroGrade={getHeroGradeLetter(item.heroGrade)}
											showInfo={false}
										/>
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
							<center>
								<button
									class="btn-xs btn-outline btn-error"
									on:click={() => {
										if ($tiersHeroBoard[key].items.includes(item)) {
											let remainingArr = $tiersHeroBoard[key].items.filter(
												(data) => data.name != item.name
											);
											$tiersHeroBoard[key].items = remainingArr;
										}
									}}
								>
									x
								</button>
							</center>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.board {
		min-height: 150px;
	}
</style>
