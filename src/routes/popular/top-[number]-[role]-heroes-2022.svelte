<script context="module">
	export async function load({ params, fetch }) {
		try {
			const res = await fetch(`/api/by-role-top-${params.number}-${params.role}-heroes.json`);
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
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import { page } from '$app/stores';
	import ArticlePortableText from '$lib/common/ArticlePortableText.svelte';
	import SanityImage from '$lib/SanityImage.svelte';
	import dayjs from 'dayjs';
	import SocialMediaShareButton from '$lib/common/SocialMediaShareButton.svelte';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';
	import { highWinHeroStatsFromML } from '$lib/stores/heroStores';
	import { topHeroesBanner } from '$lib/config/website';

	export let heroes;
	export let role;

	highWinHeroStatsFromML.set(heroes);
	let date = dayjs(heroes[0]._updatedAt).format('MMM DD, YYYY h:mm A');

	let title = `Mobile Legends Top ${$page.params.number} ${$page.params.role} Heroes for 2022 - Win Rates, Pick Rates, and Ban Rates - Latest Patch`;
</script>

<PageSeo
	pageName={`Top ${$page.params.number} ${$page.params.role} ${
		$page.params.number > 1 ? 'heroes' : 'hero'
	} in MLBB`}
	pageDescription={`Top ${$page.params.number} ${$page.params.role} heroes with highest win rates, pick rates and ban rates statistics that updates daily. This leaderboard contains data from in rank games.`}
	url={`/popular/top-${$page.params.number}-${$page.params.role}-heroes-2022`}
/>
<PageTitleText
	title={`Top ${$page.params.number} ${$page.params.role} ${
		$page.params.number > 1 ? 'heroes' : 'hero'
	} in MLBB`}
/>

<div class="prose">
	<ul>
		{#each heroes as hero, key}
			<li>
				<a href={`#top-${key + 1}`}>No. {key + 1} {$page.params.role} is {hero.name}</a>
			</li>
		{/each}
	</ul>
</div>

<div class="flex flex-row flex-wrap gap-3 my-5">
	{#each heroes as hero, key}
		<a href={`#top-${key + 1}`}>
			<div class="w-14 indicator">
				<HeroGradeBadge heroGrade={getHeroGradeLetter(hero.heroGrade)} />
				<SanityImage
					image={hero.image}
					alt={hero.name + ' image'}
					maxHeight={100}
					maxWidth={100}
					customClass={`rounded-full w-14 ring ${getTiersRingColor(
						getHeroGradeLetter(hero.heroGrade)
					)} ring-offset-base-100 ring-offset-2`}
				/>
			</div>
		</a>
	{/each}
</div>
<SocialMediaShareButton
	{title}
	url={`/popular/top-${$page.params.number}-${$page.params.role}-heroes-2022`}
	hashtags={`mlbbtop${$page.params.number},mlbbtop${$page.params.number}${$page.params.role},mlbbhero,mlbb,mobilelegends`}
	shareImage={topHeroesBanner}
/>

<p class="text-xs ">
	{`Date Updated: ${date}`}
</p>

<h2>
	<b>What is a {$page.params.role}?</b>
</h2>
<p>
	<ArticlePortableText text={role.description} />
</p>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 my-5">
	{#each heroes as hero, key}
		<div>
			<hr class="anchor" id={`top-${key + 1}`} />
			<h2>Top {key + 1} - {hero.name} Stats Overview</h2>
			<HeroCardInfo {hero} />
		</div>
	{/each}
</div>
