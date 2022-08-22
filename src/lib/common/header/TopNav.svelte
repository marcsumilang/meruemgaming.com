<script>
	import { activeTheme } from '$lib/helpers/global';
	import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
	import ToggleTheme from '$lib/common/header/ToggleTheme.svelte';
	import SocialMediaButtons from '$lib/common/SocialMediaButtons.svelte';
	import { navigating, page } from '$app/stores';

	let hide = false;
	$: {
		if ($navigating) {
			hide = true;
		}
		if (!$navigating) {
			hide = false;
		}
	}
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
			slug: '/popular/daily-mlbb-top-5-heroes'
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

	console.log('');
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<nav
	class={`glass border-b-2 text-base-content ${
		$page.url.pathname == '/create' ? 'relative' : 'sticky'
	} top-0 left-0 right-0 w-full`}
	style="z-index: 51;"
>
	<div class="flex justify-between">
		<div class="grid content-center  p-1 ">
			<div class="">
				<a href="/" aria-label="Meruem Gaming Logo" class="absolute top-0">
					<img
						src="https://cdn.sanity.io/images/az4vt1in/production/2f78fbe3203a6c6ce82649f4f8456ff56c3762df-288x288.webp"
						alt="Meruem Gaming Logo"
						style="width: 75px; height: 75px;"
					/>
				</a>
			</div>
		</div>
		<ul class="flex  pt-2">
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/#youtube-videos"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Youtube Videos</a
				>
			</li>
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-lane-tiers"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Lane Tiers</a
				>
			</li>
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-hero-tiers"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Hero Tiers</a
				>
			</li>
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-hero-matchups"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Hero Counters</a
				>
			</li>

			<a
				href="https://mlbbhero.com/create"
				class="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-pink-500 hover:to-yellow-500 btn-sm ml-1 mr-3 mt-3 lg:mt-4 text-neutral"
				>Create Tier</a
			>
			<ToggleTheme />

			<div class="lg:hidden ">
				<div class="dropdown dropdown-end grid content-center pb-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-circle btn-ghost mt-1 cursor-pointer">
						<div class="w-10"><IoIosMenu /></div>
					</label>
					<div tabindex="0" class="dropdown-content card card-compact w-64 shadow bg-base-100">
						<div class="card-body">
							<ul tabindex="0" class="menu p-2 rounded-box max-h-96 overflow-auto">
								<li>
									<a href="/#youtube-videos" class="capitalize">Youtube Videos </a>
								</li>
								<li>
									<a href="/mlbb-lane-tiers" class="capitalize">Lane Tiers </a>
								</li>
								<li>
									<a href="/mlbb-hero-tiers" class="capitalize">Hero Tiers</a>
								</li>
								<li>
									<a href="/mlbb-hero-matchups" class="capitalize">Hero Counters</a>
								</li>
								{#each categories as category}
									<li>
										<a href={category.slug} class="capitalize">{category.title}</a>
									</li>
								{/each}
							</ul>
							<hr />
							<SocialMediaButtons />
							<hr />
							<p class="text-center">Meruem Gaming. Be Updated. Be Legendary.</p>
						</div>
					</div>
				</div>
			</div>
		</ul>
	</div>
</nav>
