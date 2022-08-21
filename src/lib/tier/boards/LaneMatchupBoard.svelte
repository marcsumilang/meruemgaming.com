<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import SanityImage from '$lib/SanityImage.svelte';
	import { heroDetails, heroMatchupBoard, selectHeroModal } from '$lib/stores/heroStores';
	import { alertError } from '$lib/helpers/toast';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import ItemsLists from '$lib/tier/lists/ItemsLists.svelte';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import MatchupStatsForm from '$lib/tier/matchup/MatchupStatsForm.svelte';
	import SelectMatchupLaneModal from '$lib/common/modal/SelectMatchupLaneModal.svelte';
	import HeroSkillsTabs from '$lib/section/hero/HeroSkillsTabs.svelte';
	import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';
	import SectionText from '$lib/common/SectionText.svelte';
	import FaPen from 'svelte-icons/fa/FaPen.svelte';
	const flipDurationMs = 300;
	function handleClick(item) {
		heroDetails.set(item);
		console.log(item);
	}
</script>

<p class="font-black text-2xl text-center">
	<label for={`selectMatchupLaneModal`} class="cursor-pointer modal-button">
		{$heroMatchupBoard.lane}
		<button class="w-6"
			><label class=" cursor-pointer" for={`selectMatchupLaneModal`}><FaPen /></label></button
		>
	</label>
</p>
<p class="font-black text-2xl text-center">
	{$heroMatchupBoard.left?.items.name ?? ''} VS {$heroMatchupBoard.right?.items.name ?? ''}
</p>
<div class="grid grid-cols-2 md:grid-cols-4 gap-2">
	<div>
		<p class="p-1 text-center">
			Left Side <button
				class="btn btn-info btn-outline btn-xs"
				on:click={() => {
					$heroMatchupBoard.left.items = '';
				}}>Clear</button
			>
		</p>
		<div class="grid justify-center pt-2">
			{#if $heroMatchupBoard.left.items}
				<div
					class="w-32 h-32 cursor-pointer"
					on:click={() => {
						handleClick($heroMatchupBoard.left.items);
					}}
				>
					<label for={`heroInfoModal`} class="cursor-pointer modal-button">
						<div class="grid w-32 indicator">
							<HeroGradeBadge
								heroGrade={getHeroGradeLetter($heroMatchupBoard.left.items.heroGrade)}
							/>
							<SanityImage
								image={$heroMatchupBoard.left.items.image}
								alt={$heroMatchupBoard.left.items.name + ' image'}
								maxHeight={128}
								maxWidth={128}
								customClass={`rounded-full w-32 ring ${getTiersRingColor(
									getHeroGradeLetter($heroMatchupBoard.left.items.heroGrade)
								)} ring-offset-base-100 ring-offset-2`}
							/>
							<p class="text-center font-bold pt-1">
								{$heroMatchupBoard.left.items.name}
							</p>
						</div>
					</label>
				</div>
			{:else}
				<label
					for={`selectHeroModal`}
					class="btn btn-circle btn-success btn-outline btn-md tooltip"
					data-tip="Select Hero"
					on:click={() => {
						selectHeroModal.set({
							boardType: 'heroMatchup',
							arrayGroup: 'left'
						});
					}}
				>
					<IoIosAdd />
				</label>
			{/if}
		</div>
	</div>
	<div>
		<p class="p-1 text-center">
			Right Side <button
				class="btn btn-info btn-outline btn-xs"
				on:click={() => {
					$heroMatchupBoard.right.items = '';
				}}>Clear</button
			>
		</p>
		<div class="grid justify-center pt-2">
			{#if $heroMatchupBoard.right.items}
				<div
					class="w-32 h-32 cursor-pointer"
					on:click={() => {
						handleClick($heroMatchupBoard.right.items);
					}}
				>
					<label for={`heroInfoModal`} class="cursor-pointer modal-button">
						<div class="grid w-32 indicator">
							<HeroGradeBadge
								heroGrade={getHeroGradeLetter($heroMatchupBoard.right.items.heroGrade)}
							/>
							<SanityImage
								image={$heroMatchupBoard.right.items.image}
								alt={$heroMatchupBoard.right.items.name + ' image'}
								maxHeight={128}
								maxWidth={128}
								customClass={`rounded-full w-32 ring ${getTiersRingColor(
									getHeroGradeLetter($heroMatchupBoard.right.items.heroGrade)
								)} ring-offset-base-100 ring-offset-2`}
							/>
							<p class="text-center font-bold pt-1">
								{$heroMatchupBoard.right.items.name}
							</p>
						</div>
					</label>
				</div>
			{:else}
				<label
					for={`selectHeroModal`}
					class="btn btn-circle btn-success btn-outline btn-md tooltip"
					data-tip="Select Hero"
					on:click={() => {
						selectHeroModal.set({
							boardType: 'heroMatchup',
							arrayGroup: 'right'
						});
					}}
				>
					<IoIosAdd />
				</label>
			{/if}
		</div>
	</div>

	<div class="md:order-first">
		<MatchupStatsForm heroPower={$heroMatchupBoard.left} arrayGroup="left" />
	</div>

	<div>
		<MatchupStatsForm heroPower={$heroMatchupBoard.right} arrayGroup="right" />
	</div>

	<div class="col-span-2">
		{#if $heroMatchupBoard.left.items.heroSkills}
			<SectionText id="hero-skills" title={`${$heroMatchupBoard.left.items.name} Skills`} />
			<HeroSkillsTabs skills={$heroMatchupBoard.left.items.heroSkills} />
		{/if}
		{#if $heroMatchupBoard.left.items.heroSkillsEnhanced && $heroMatchupBoard.left.items.heroSkillsEnhanced != ''}
			<SectionText
				id="hero-skills-enhanced"
				title={`${$heroMatchupBoard.left.items.name} Enhanced Skills`}
			/>

			<HeroSkillsTabs skills={$heroMatchupBoard.left.items.heroSkillsEnhanced} />
		{/if}
	</div>
	<div class="col-span-2">
		{#if $heroMatchupBoard.right.items.heroSkills}
			<SectionText id="hero-skills" title={`${$heroMatchupBoard.right.items.name} Skills`} />
			<HeroSkillsTabs skills={$heroMatchupBoard.right.items.heroSkills} />
		{/if}
		{#if $heroMatchupBoard.right.items.heroSkillsEnhanced && $heroMatchupBoard.right.items.heroSkillsEnhanced != ''}
			<SectionText
				id="hero-skills-enhanced"
				title={`${$heroMatchupBoard.right.items.name} Enhanced Skills`}
			/>

			<HeroSkillsTabs skills={$heroMatchupBoard.right.items.heroSkillsEnhanced} />
		{/if}
	</div>
</div>
<SelectMatchupLaneModal />
