<script>
	import { page } from '$app/stores';
	let categories = [
		{
			title: 'Top 5 Easiest Heroes',
			slug: '/popular/top-5-easiest-ml-heroes-to-use'
		},
		{
			title: 'Top 5 Difficult Heroes',
			slug: '/popular/top-5-difficult-ml-heroes-to-use'
		},
		{
			title: 'Top 5 Hardest Heroes',
			slug: '/popular/top-5-hardest-ml-heroes-to-use'
		},
		{
			title: 'Leaderboard',
			slug: '/leaderboard'
		},
		{
			title: 'MLBB Hero List',
			slug: '/heroes'
		},
		{
			title: 'Hero Matchups',
			slug: '/mlbb-hero-matchups'
		},
		{
			title: 'Lane Tiers',
			slug: '/mlbb-lane-tiers'
		},
		{
			title: 'Hero Tiers',
			slug: '/mlbb-hero-tiers'
		},
		{
			title: 'Top 5 Marksman',
			slug: '/popular/top-5-marksman-heroes-2022'
		},
		{
			title: 'Top 5 fighter',
			slug: '/popular/top-5-fighter-heroes-2022'
		},
		{
			title: 'Top 5 assassin',
			slug: '/popular/top-5-assassin-heroes-2022'
		},
		{
			title: 'Top 5 mage',
			slug: '/popular/top-5-mage-heroes-2022'
		},
		{
			title: 'Top 5 tank',
			slug: '/popular/top-5-tank-heroes-2022'
		},
		{
			title: 'Top 5 support',
			slug: '/popular/top-5-support-heroes-2022'
		},
		{
			title: 'Top 5 Heroes per Category',
			slug: '/popular/daily-mlbb-top-10-heroes'
		},
		{
			title: 'Popular',
			slug: '/popular'
		},
		{
			title: 'Hero vs Hero',
			slug: 'https://mlbbhero.com/compare'
		},
		{
			title: 'Create Tier',
			slug: 'https://mlbbhero.com/create'
		}
		// {
		//   title: 'Guide Contest',
		//   slug: '/mlbb-guide-contest'
		// },
		// {
		//   title: 'Hero Tier Poll',
		//   slug: '/mlbb-hero-tier-poll'
		// },
		// {
		//   title: 'Draft Pick Poll',
		//   slug: '/mlbb-draft-pick-poll'
		// },
		// {
		//   title: 'MLBB Request Updates Poll',
		//   slug: '/mlbb-request-updates-poll'
		// },
		// {
		//   title: 'Game Rotations',
		//   slug: '/mlbb-rotations-guide'
		// },
		// {
		//   title: 'ML1 Guides',
		//   slug: '/ml1/guides'
		// }
	];
</script>

<div class="flex flex-row overflow-x-auto p-2">
	{#if categories?.length > 0}
		{#each categories as category}
			<a
				class={`btn btn-outline btn-sm mr-1 cursor-pointer capitalize ${
					$page.url.pathname == category.slug ? 'btn-warning' : ''
				}`}
				href={`${category.slug}`}>{category.title}</a
			>
		{/each}
	{/if}
</div>
