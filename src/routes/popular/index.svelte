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

	let roles = ['marksman', 'fighter', 'assassin', 'mage', 'tank', 'support'];

	let date = dayjs();
	let today = date.format('MMM DD, YYYY');
	let year = date.format('YYYY');
	$: selectedTop = 'Top';
	$: selectedRole = 'Role';
</script>

<PageSeo
	pageName={`Top heroes statistics per category - ${year}`}
	pageDescription={'Choose Hero Role and select Top heroes with highest win rates, pick rates and ban rates statistics that updates daily.'}
	url="/popular"
/>

<div class="grid grid-cols-12 overflow-hidden ">
	<div class="col-span-12 xl:col-span-8 p-2 lg:p-5">
		<PageTitleText title={`Top heroes statistics per category - ${year}`} />
		<p class="text-sm">
			This list is updated everyday with new statistics. Stats of Win Rates, Ban Rates, Pick Rates,
			Early Game Power, Mid Game Power and Late Game Power by role. This leaderboard contains just
			data from Rank mode. Statistics now caters higher Mythic points this season for more accurate
			stats.
		</p>

		<div class="p-3 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
			{#each roles as role}
				<a
					class="btn active:text-info visited:text-warning p-1"
					href={`/popular/top-1-${role}-heroes-2022`}>Top 1 {role} Heroes</a
				>
				<a
					class="btn active:text-info visited:text-warning p-1"
					href={`/popular/top-3-${role}-heroes-2022`}>Top 3 {role} Heroes</a
				>
				<a
					class="btn active:text-info visited:text-warning p-1"
					href={`/popular/top-5-${role}-heroes-2022`}>Top 5 {role} Heroes</a
				>
				<a
					class="btn active:text-info visited:text-warning p-1"
					href={`/popular/top-10-${role}-heroes-2022`}>Top 10 {role} Heroes</a
				>
			{/each}
		</div>

		<div class="p-3 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
			<a
				href="/popular/daily-mlbb-top-10-heroes#high-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Hero Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-pick-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Hero Pick Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-ban-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Hero Ban Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-marksman-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Marksman Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-fighter-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Fighter Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-fighter-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Fighter Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-assasins-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Assasins Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-mage-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Mage Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-tank-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Tank Win Rate</a
			>

			<a
				href="/popular/daily-mlbb-top-10-heroes#high-support-win-rate"
				class="btn active:text-info visited:text-warning p-1">Top 10 Support Win Rate</a
			>
		</div>
	</div>
	<div class="col-span-12 xl:col-span-4">
		<div class="md:sticky top-20">
			<SideBar />
		</div>
	</div>
</div>

<AllHeroesText />
