<script>
	export let levels;
	let parsedLevels = '';
	if (typeof levels == 'string') {
		parsedLevels = JSON.parse(levels);
	}
</script>

{#if parsedLevels && parsedLevels.length > 0}
	<table class="text-neutral table-compact mt-5 w-full">
		<thead>
			<tr>
				{#each parsedLevels[0] as skill_info, key}
					{#if key == 0}
						<th> Skill </th>
					{:else}
						<th>
							LVL{key}
						</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each parsedLevels as skill_info}
				<tr>
					{#each skill_info as lvl, key}
						<td>
							{lvl}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
