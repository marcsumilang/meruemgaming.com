<script>
	import { page } from '$app/stores';
	let categories = [
		{
			title: 'Leaderboard',
			slug: '/leaderboard'
		},
		{
			title: 'Hero vs Hero',
			slug: '/compare'
		},
		{
			title: 'Create Tier',
			slug: '/create'
		},
		{
			title: 'Hero Matchups',
			slug: '/mlbb-hero-matchups'
		},
		{
			title: 'Lane Tiers',
			slug: '/mlbb-lane-tiers-guide'
		},
		{
			title: 'Hero Tiers',
			slug: '/mlbb-hero-tiers-guide'
		},
		{
			title: 'Top 10 Marksman',
			slug: '/popular/top-10-marksman-heroes-2022'
		},
		{
			title: 'Top 10 fighter',
			slug: '/popular/top-10-fighter-heroes-2022'
		},
		{
			title: 'Top 10 assassin',
			slug: '/popular/top-10-assassin-heroes-2022'
		},
		{
			title: 'Top 10 mage',
			slug: '/popular/top-10-mage-heroes-2022'
		},
		{
			title: 'Top 10 tank',
			slug: '/popular/top-10-tank-heroes-2022'
		},
		{
			title: 'Top 10 support',
			slug: '/popular/top-10-support-heroes-2022'
		},
		{
			title: 'Top 10 Heroes per Category',
			slug: '/popular/daily-mlbb-top-10-heroes'
		},
		{
			title: 'Popular',
			slug: '/popular'
		},
		{
			title: 'Top 5 Heroes by Difficulty',
			slug: '/popular/hero-by-difficulty'
		},
		{
			title: 'Heroes',
			slug: '/'
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
				href={`https://mlbbhero.com${category.slug}`}>{category.title}</a
			>
		{/each}
	{/if}
</div>
