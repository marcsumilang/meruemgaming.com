<script>
	import { allItems, selectedFilterItem, itemsList, loading } from '$lib/stores/heroStores';
	import IoMdRefresh from 'svelte-icons/io/IoMdRefresh.svelte';
	import Loading from '$lib/common/spinner/Loading.svelte';
	import { onMount } from 'svelte';

	let itemByCategory = {
		attack: [],
		magic: [],
		defense: [],
		movement: [],
		jungle: [],
		roam: []
	};
	onMount(() => {
		$itemsList.map((item) => {
			if (item.category.name == 'Attack') {
				itemByCategory.attack.push(item);
			} else if (item.category.name == 'Magic') {
				itemByCategory.magic.push(item);
			} else if (item.category.name == 'Defense') {
				itemByCategory.defense.push(item);
			} else if (item.category.name == 'Movement') {
				itemByCategory.movement.push(item);
			} else if (item.category.name == 'Jungle') {
				itemByCategory.jungle.push(item);
			} else {
				itemByCategory.roam.push(item);
			}
		});
		console.log(itemByCategory);
	});
	const filterRole = async () => {
		if ($selectedFilterItem == 'All') {
			$allItems = $itemsList;
		} else if ($selectedFilterItem == 'Attack') {
			$allItems = itemByCategory.attack;
		} else if ($selectedFilterItem == 'Magic') {
			$allItems = itemByCategory.magic;
		} else if ($selectedFilterItem == 'Defense') {
			$allItems = itemByCategory.defense;
		} else if ($selectedFilterItem == 'Jungle') {
			$allItems = itemByCategory.jungle;
		} else if ($selectedFilterItem == 'Movement') {
			$allItems = itemByCategory.movement;
		} else if ($selectedFilterItem == 'Jungle') {
			$allItems = itemByCategory.jungle;
		} else {
			$allItems = itemByCategory.roam;
		}
	};
</script>

<Loading />

<div class="hidden md:flex flex-row flex-wrap gap-1">
	<div class="flex flex-row gap-2">
		<button
			class="btn  btn-xs tooltip mt-2"
			data-tip="Refresh Items"
			on:click={() => {
				$allItems = $itemsList;
			}}
		>
			<IoMdRefresh />
		</button>

		<div class="mt-2">Items: {$allItems.length}</div>
	</div>

	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'All'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">All</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Attack'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Attack</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Magic'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Magic</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Defense'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Defense</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Jungle'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Jungle</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Movement'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Movement</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={$selectedFilterItem}
				value={'Roam'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Roam</span>
		</label>
	</div>
</div>

<div class="md:hidden flex flex-row flex-wrap gap-1">
	<p class="text-xs">Filter by:</p>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'All';
			filterRole();
		}}
	>
		All
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Attack';
			filterRole();
		}}
	>
		Attack
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Defense';
			filterRole();
		}}
	>
		Defense
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Magic';
			filterRole();
		}}
	>
		Magic
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Movement';
			filterRole();
		}}
	>
		Movement
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Jungle';
			filterRole();
		}}
	>
		Jungle
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			$selectedFilterItem = 'Roam';
			filterRole();
		}}
	>
		Roam
	</button>
</div>
