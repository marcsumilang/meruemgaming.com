<script>
	import {
		heroMatchupBoard,
		selectHeroModal,
		spellDetails,
		itemDetails
	} from '$lib/stores/heroStores';
	import SelectSpellModal from '$lib/common/modal/SelectSpellModal.svelte';
	import SelectItemsModal from '$lib/common/modal/SelectItemsModal.svelte';
	import SanityImage from '$lib/SanityImage.svelte';
	import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';
	export let heroPower;
	export let arrayGroup;
	const getColor = (power) => {
		if (power >= 8) {
			return 'range-primary';
		} else if (power >= 6) {
			return 'range-secondary';
		} else if (power >= 3) {
			return 'range-accent';
		} else {
			return '';
		}
	};

	$: builds = arrayGroup == 'left' ? $heroMatchupBoard.left.builds : $heroMatchupBoard.right.builds;
</script>

<span>Early Power</span>
<div class="flex flex-row gap-2 p-3">
	<input
		type="range"
		min="1"
		max="10"
		bind:value={heroPower.early}
		class={`range ${getColor(heroPower.early)}`}
	/>
	<span>{heroPower.early}</span>
</div>
<span>Mid Power</span>
<div class="flex flex-row gap-2 p-3">
	<input
		type="range"
		min="1"
		max="10"
		bind:value={heroPower.mid}
		class={`range ${getColor(heroPower.mid)}`}
	/>
	<span>{heroPower.mid}</span>
</div>
<span>Late Power</span>
<div class="flex flex-row gap-2 p-3">
	<input
		type="range"
		min="1"
		max="10"
		bind:value={heroPower.late}
		class={`range ${getColor(heroPower.late)}`}
	/>
	<span>{heroPower.late}</span>
</div>

<div class="flex flex-row flex-wrap gap-2">
	<div class="grid gap-2">
		{#if heroPower.spell}
			<button
				class="btn btn-xs btn-outline btn-info"
				on:click={() => {
					if (heroPower.name == 'left') {
						$heroMatchupBoard.left.spell = '';
					} else {
						$heroMatchupBoard.right.spell = '';
					}
				}}>clear</button
			>
			<label
				for="spellInfoModal"
				class="cursor-pointer"
				on:click={() => {
					spellDetails.set(heroPower.spell);
				}}
			>
				<SanityImage
					image={heroPower.spell.image}
					alt={`image of mlbb spell ${heroPower.spell.name}`}
					maxWidth={50}
					customClass="rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
				/>
			</label>
		{:else}
			<label
				for={`selectSpellModal${heroPower.name}`}
				class="btn btn-circle btn-success btn-outline btn-md tooltip"
				data-tip="Spell"
			>
				<IoIosAdd />
			</label>
		{/if}
	</div>
</div>

<div class="mt-5">
	<div class="flex flex-row flex-wrap gap-2">
		<label
			for={`selectItemsModal`}
			class="btn btn-circle btn-success btn-outline btn-md tooltip"
			data-tip="Select Items"
			on:click={() => {
				$selectHeroModal.arrayGroup = arrayGroup;
			}}
		>
			<IoIosAdd />
		</label>
		{#each builds as item}
			<div class="grid gap-2">
				<center>
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
								arrayGroup == 'left' ? 'ring-green-400' : 'ring-blue-400'
							}`}
						/>
					</label>
				</center>

				<button
					class="btn btn-xs btn-info"
					on:click={() => {
						if ($selectHeroModal.boardType == 'heroMatchup') {
							if (arrayGroup == 'left') {
								var filtered = $heroMatchupBoard.left.builds.filter(function (value, index, arr) {
									return value.name != item.name;
								});
								$heroMatchupBoard.left.builds = filtered;
							} else {
								var filtered = $heroMatchupBoard.right.builds.filter(function (value, index, arr) {
									return value.name != item.name;
								});
								$heroMatchupBoard.right.builds = filtered;
							}
						}
					}}
				>
					Remove
				</button>
			</div>
		{/each}
	</div>
</div>

<SelectItemsModal />
<SelectSpellModal {heroPower} />
