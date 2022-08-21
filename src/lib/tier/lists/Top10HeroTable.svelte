<script>
	import SanityImage from '$lib/SanityImage.svelte';
	import ToolTipLink from '$lib/common/ToolTipLink.svelte';
	import SortTableHead from '$lib/common/SortTableHead.svelte';
	import { getPowerRadialColor } from '$lib/helpers/colors';
	export let title;
	export let data;
	export let enableSort = false;
	$: tableList = data;

	// Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = { col: 'shift_date', ascending: true };

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

	function getRowColor(index) {
		if (index == 0) {
			return 'bg-gradient-to-r from-orange-200 to-orange-500 text-black';
		} else if (index == 1) {
			return 'bg-gradient-to-r from-yellow-200 to-yellow-500 text-black';
		} else if (index == 2) {
			return 'bg-gradient-to-r from-blue-200 to-blue-500 text-black';
		}
	}
</script>

{#if tableList}
	<div class="overflow-x-auto">
		<table class="table table-compact w-full">
			<thead class="stick top-0">
				<tr>
					<th colspan="4" align="center" class="bg-neutral text-warning">{title}</th>
				</tr>
				<tr>
					{#if enableSort}
						<SortTableHead id="name" title="Hero" {sort} {sortBy} />
						<SortTableHead id="winRate" title="Win Rate" {sort} {sortBy} />
						<SortTableHead id="pickRate" title="Pick Rate" {sort} {sortBy} />
						<SortTableHead id="banRate" title="Ban Rate" {sort} {sortBy} />
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
										<span class={`indicator-item badge ${getRowColor(key)}`}> {key + 1}</span>
										<ToolTipLink
											href={hero.slug.current}
											label={`${hero.name} Build`}
											customClass="tooltip-right"
										>
											<SanityImage
												image={hero.image}
												alt={hero.name + ' image'}
												maxHeight={100}
												maxWidth={100}
												customClass={`rounded-full w-10 ring ring-yellow-400 ring-offset-base-100 ring-offset-2`}
											/>
										</ToolTipLink>
									</div>
								</div>
								<p class="text-center md:text-left m-0 p-0">{hero.name}</p>
							</th>
							<td>
								<div
									class={`radial-progress ${getPowerRadialColor(hero.winRate)}`}
									style={`--value:${hero.winRate};`}
								>
									{hero.winRate}%
								</div>
							</td>
							<td>
								<div
									class={`radial-progress ${getPowerRadialColor(
										parseFloat(hero.pickRate * 10).toFixed(2)
									)}`}
									style={`--value:${parseFloat(hero.pickRate * 10).toFixed(2)};`}
								>
									{parseFloat(parseFloat(hero.pickRate) * 10).toFixed(2)}%
								</div>
							</td>
							<td>
								<div
									class={`radial-progress ${getPowerRadialColor(hero.banRate)}`}
									style={`--value:${hero.banRate};`}
								>
									{hero.banRate}%
								</div>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
{/if}
