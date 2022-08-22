<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/all-text-heroes.json');
			const data = await res.json();
			return {
				props: data
			};
		} catch (err) {
			//console.log('500:', err)
		}
	}
</script>

<script>
	import { heroes, heroLinks } from '$lib/stores/heroStores';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import SideBar from '$lib/common/SideBar.svelte';
	export let apiHeroes;
	import dayjs from 'dayjs';
	$heroes = apiHeroes;
	$heroLinks = apiHeroes;

	let date = dayjs();
	let today = date.format('MMM DD, YYYY hh:mm A');
	let year = date.format('YYYY');
	let difficulties = ['easiest', 'average', 'difficult', 'hardest'];
</script>

<PageSeo
	pageName={`List of Top 5 Heroes by Difficulty ${year}`}
	pageDescription={'All List of Top 5 Heroes by Difficulty Category with highest current win rates in the hero leaderboard.'}
	url="/popular/hero-by-difficulty"
/>

<div class="grid grid-cols-12 overflow-hidden ">
	<div class="col-span-12 xl:col-span-8 p-2 lg:p-5">
		<PageTitleText title={`List of Top 5 Heroes by Difficulty ${year}`} />
		<p class="text-xs ">
			{`Date Updated: ${today}`}
		</p>
		<p class="text-sm">
			All List of Top 5 Heroes by Difficulty Category with highest current win rates in the hero
			leaderboard.
		</p>

		<div class="p-3 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
			{#each difficulties as difficulty}
				<a class="btn active:text-info p-1" href={`/popular/top-5-${difficulty}-ml-heroes-to-use`}
					>Top 5 {difficulty} ML Heroes
				</a>
			{/each}
		</div>
	</div>
	<div class="col-span-12 xl:col-span-4">
		<div class="md:sticky top-20">
			<SideBar />
		</div>
	</div>
</div>

<AllHeroesText />
