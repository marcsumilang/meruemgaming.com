<script>
	import { heroes2, loading } from '$lib/stores/heroStores';
	import IoMdRefresh from 'svelte-icons/io/IoMdRefresh.svelte';
	import Loading from '$lib/common/spinner/Loading.svelte';
	import { onMount } from 'svelte';

	export let allHeroes;
	export let selected;

	let heroesByRole = {
		tanks: [],
		fighters: [],
		assasins: [],
		mages: [],
		marksmans: [],
		supports: []
	};
	onMount(() => {
		allHeroes.map((hero) => {
			hero.heroRoles.map((role) => {
				if (role.name == 'Tank') {
					heroesByRole.tanks.push(hero);
				} else if (role.name == 'Fighter') {
					heroesByRole.fighters.push(hero);
				} else if (role.name == 'Assassin') {
					heroesByRole.assasins.push(hero);
				} else if (role.name == 'Mage') {
					heroesByRole.mages.push(hero);
				} else if (role.name == 'Marksman') {
					heroesByRole.marksmans.push(hero);
				} else {
					heroesByRole.supports.push(hero);
				}
			});
		});
		console.log(heroesByRole);
	});
	const filterRole = async () => {
		if (selected == 'All') {
			$heroes2 = allHeroes;
		} else if (selected == 'Tank') {
			$heroes2 = heroesByRole.tanks;
		} else if (selected == 'Fighter') {
			$heroes2 = heroesByRole.fighters;
		} else if (selected == 'Assassin') {
			$heroes2 = heroesByRole.assasins;
		} else if (selected == 'Mage') {
			$heroes2 = heroesByRole.mages;
		} else if (selected == 'Marksman') {
			$heroes2 = heroesByRole.marksmans;
		} else {
			$heroes2 = heroesByRole.supports;
		}
	};
</script>

<Loading />

<div class="hidden md:flex flex-row flex-wrap gap-1">
	<div class="flex flex-row gap-2">
		<button
			class="btn  btn-xs tooltip mt-2"
			data-tip="Refresh Heroes"
			on:click={() => {
				$heroes2 = allHeroes;
			}}
		>
			<IoMdRefresh />
		</button>
	</div>

	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
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
				bind:group={selected}
				value={'Tank'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Tank</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
				value={'Fighter'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Fighter</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
				value={'Assassin'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Assassin</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
				value={'Mage'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Mage</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
				value={'Marksman'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Marksman</span>
		</label>
	</div>
	<div class="form-control">
		<label class="cursor-pointer label">
			<input
				type="radio"
				bind:group={selected}
				value={'Support'}
				class="radio "
				on:change={(e) => filterRole()}
			/>
			<span class="label-text ml-1">Support</span>
		</label>
	</div>
</div>

<div class="md:hidden flex flex-row flex-wrap gap-1">
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'All';
			filterRole();
		}}
	>
		All
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'Tank';
			filterRole();
		}}
	>
		Tank
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'Fighter';
			filterRole();
		}}
	>
		Fighter
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'Mage';
			filterRole();
		}}
	>
		Mage
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'Marksman';
			filterRole();
		}}
	>
		Marksman
	</button>
	<button
		class="btn btn-xs btn-info btn-outline"
		on:click={() => {
			selected = 'Support';
			filterRole();
		}}
	>
		Support
	</button>
</div>
