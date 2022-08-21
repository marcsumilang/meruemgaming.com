<script>
	import SanityImage from '$lib/SanityImage.svelte';
	import ToolTipLink from '$lib/common/ToolTipLink.svelte';
	import SortTableHead from '$lib/common/SortTableHead.svelte';
	import { getPowerRadialColor } from '$lib/helpers/colors';
	import { viewStyle } from '$lib/stores/heroStores';
	export let title;
	export let data;
	export let dataPrev = [];
	export let enableSort = true;
	export let category = 'win';
	$: tableList = data;

	// Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = { col: 'shift_date', ascending: false };

	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		// Modifier to sorting function for ascending or descending
		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		tableList = tableList.sort(sort);
	};

	let getPowerColor = (power) => {
		if (power >= 50) {
			return 'progress-success';
		} else if (power >= 30) {
			return 'progress-warning';
		} else if (power >= 10) {
			return 'progress-info';
		} else {
			return 'progress-error';
		}
	};

	function getRowColor(index) {
		if (index == 0) {
			return 'bg-gradient-to-r from-orange-200 to-orange-500 text-black';
		} else if (index == 1) {
			return 'bg-gradient-to-r from-yellow-200 to-yellow-500 text-black';
		} else if (index == 2) {
			return 'bg-gradient-to-r from-blue-200 to-blue-500 text-black';
		} else {
			return 'bg-gradient-to-r from-gray-200 to-gray-500 text-black';
		}
	}
	function getPrevWin(_name, filter, lastRate) {
		console.log('dataPrev', dataPrev);
		if (filter == 'win') {
			const res = dataPrev.find(({ name }) => name == _name);
			console.log('res', res);
			if (res) {
				let newValue = lastRate - res.win;
				if (newValue > 0) {
					return `<span class='text-green-600'>+${newValue.toFixed(2)}% &#8593</span>`;
				} else if (newValue == 0) {
					return ``;
				} else if (newValue < 0) {
					return `<span class='text-red-400'>${newValue.toFixed(2)}% &#8595</span>`;
				}
			} else {
				return `<span class='text-blue-500'>New</span>`;
			}
		} else if (filter == 'use') {
			const res = dataPrev.find(({ name }) => name == _name);
			console.log('res', res);

			if (res) {
				let newValue = lastRate - res.use;
				if (newValue > 0) {
					return `<span class='text-green-600'>+${newValue.toFixed(2)}% &#8593</span>`;
				} else if (newValue == 0) {
					return `<span class='text-neutral'>${newValue.toFixed(2)}%</span>`;
				} else if (newValue < 0) {
					return `<span class='text-red-400'>${newValue.toFixed(2)}% &#8595</span>`;
				}
			} else {
				return `<span class='text-blue-500'>New</span>`;
			}
		} else if (filter == 'ban') {
			const res = dataPrev.find(({ name }) => name == _name);
			console.log('res', res);

			if (res) {
				let newValue = lastRate - res.ban;
				if (newValue > 0) {
					return `<span class='text-green-600'>+${newValue.toFixed(2)}% &#8593</span>`;
				} else if (newValue == 0) {
					return `<span class='text-neutral'>${newValue.toFixed(2)}%</span>`;
				} else if (newValue < 0) {
					return `<span class='text-red-400'>${newValue.toFixed(2)}% &#8595</span>`;
				}
			} else {
				return `<span class='text-blue-500'>New</span>`;
			}
		}
	}
</script>

<div>
	{#if tableList}
		{#if $viewStyle == 'table'}
			<div class="overflow-x-auto">
				<table class="table table-compact w-full">
					<thead class="">
						<tr class="">
							<th colspan="4" align="center" class="bg-neutral text-warning">
								{title}
							</th>
						</tr>
						<tr>
							{#if enableSort}
								<th align="center">Hero</th>
								<SortTableHead id="name" title="Name" {sort} {sortBy} />
								{#if category == 'win'}
									<SortTableHead id="win" title="Win Rate" {sort} {sortBy} />
								{:else if category == 'pick'}
									<SortTableHead id="use" title="Pick Rate" {sort} {sortBy} />
								{:else if category == 'ban'}
									<SortTableHead id="ban" title="Ban Rate" {sort} {sortBy} />
								{/if}
								<th align="center">Rank</th>
							{:else}
								<th align="center">Hero</th>
								<th>Name</th>
								{#if category == 'win'}
									<th>Win Rate</th>
								{:else if category == 'pick'}
									<th>Pick Rate</th>
								{:else if category == 'ban'}
									<th>Ban Rate</th>
								{/if}
								<th align="center">Rank</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#if tableList}
							{#each tableList as hero, key}
								<tr>
									<th align="center">
										<ToolTipLink
											href={`/heroes/mlbb-guide-best-${hero.name.toLowerCase()}-build-2022`}
											label={`${hero.name} Build`}
											customClass="tooltip-right"
										>
											<img
												src={`https:${hero.avatar}`}
												alt={hero.name + ' image'}
												height={100}
												width={100}
												class={`rounded-full w-10 ring ring-yellow-400 ring-offset-base-100 ring-offset-2`}
											/>
										</ToolTipLink>
									</th>
									<td>{hero.name}</td>
									{#if category == 'win'}
										<td>
											<p>
												{hero.win}%
												{@html getPrevWin(hero.name, 'win', hero.win)}
											</p>
											<progress
												class={`progress ${getPowerColor(hero.win)}`}
												value={hero.win}
												max="100"
											/>
										</td>
									{:else if category == 'pick'}
										<td>
											<p>
												{parseFloat(parseFloat(hero.use) * 10).toFixed(2)}%
												{@html getPrevWin(hero.name, 'use', hero.use)}
											</p>
											<progress
												class={`progress ${getPowerColor(
													parseFloat(parseFloat(hero.use) * 10).toFixed(2)
												)}`}
												value={parseFloat(parseFloat(hero.use) * 10).toFixed(2)}
												max="70"
											/>
										</td>
									{:else if category == 'ban'}
										<td>
											<p>
												{hero.ban}%
												{@html getPrevWin(hero.name, 'ban', hero.ban)}
											</p>
											<progress
												class={`progress ${getPowerColor(hero.ban)}`}
												value={hero.ban}
												max="100"
											/>
										</td>
									{/if}

									<th align="center"
										><span class={`indicator-item badge ${getRowColor(key)}`}>
											{#if sortBy.ascending}
												{tableList.length - key}
											{:else}
												{key + 1}
											{/if}
										</span></th
									>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		{:else if $viewStyle == 'card'}
			<div class="overflow-x-auto">
				<table class="table table-compact w-full">
					<thead class="stick top-0">
						<tr>
							<th colspan="4" align="center" class="bg-neutral text-warning">{title}</th>
						</tr>
						<tr>
							{#if enableSort}
								<SortTableHead id="name" title="Hero" {sort} {sortBy} />
								<SortTableHead id="win" title="Win Rate" {sort} {sortBy} />
								<SortTableHead id="use" title="Pick Rate" {sort} {sortBy} />
								<SortTableHead id="ban" title="Ban Rate" {sort} {sortBy} />
							{:else}
								<th>Hero</th>
								<th>Win Rate</th>
								<th>Pick Rate</th>
								<th>Ban Rate</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#if tableList}
							{#each tableList as hero, key}
								<tr>
									<th>
										<div
											class="flex flex-row flex-wrap md:gap-2 justify-center md:justify-start content-center pt-1"
										>
											<div class="indicator">
												<span class={`indicator-item badge ${getRowColor(key)}`}>
													{#if sortBy.ascending}
														{tableList.length - key}
													{:else}
														{key + 1}
													{/if}
												</span>
												<ToolTipLink
													href={`/heroes/mlbb-guide-best-${hero.name.toLowerCase()}-build-2022`}
													label={`${hero.name} Build`}
												>
													<img
														src={`https:${hero.avatar}`}
														alt={hero.name + ' image'}
														height={100}
														width={100}
														class={`rounded-full w-10 ring ring-yellow-400 ring-offset-base-100 ring-offset-2`}
													/>
												</ToolTipLink>
											</div>
										</div>
										<p class="text-center md:text-left m-0 p-0">{hero.name}</p>
									</th>
									<td>
										<div
											class={`radial-progress ${getPowerRadialColor(hero.win)}`}
											style={`--value:${hero.win};`}
										>
											{hero.win}%
											{@html getPrevWin(hero.name, 'win', hero.win)}
										</div>
									</td>
									<td>
										<div
											class={`radial-progress ${getPowerRadialColor(
												parseFloat(hero.use * 10).toFixed(2)
											)}`}
											style={`--value:${parseFloat(hero.use * 10).toFixed(2)};`}
										>
											{parseFloat(parseFloat(hero.use) * 10).toFixed(2)}%
											{@html getPrevWin(hero.name, 'use', hero.use)}
										</div>
									</td>
									<td>
										<div
											class={`radial-progress ${getPowerRadialColor(hero.ban)}`}
											style={`--value:${hero.ban};`}
										>
											{hero.ban}%
											{@html getPrevWin(hero.name, 'ban', hero.ban)}
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		{/if}
	{/if}
</div>
