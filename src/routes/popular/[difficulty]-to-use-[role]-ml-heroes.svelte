<script context="module">
	export async function load({ params, fetch }) {
		try {
			const res = await fetch(`/api/${params.role}-${params.difficulty}.json`);
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
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import HeroCardInfo from '$lib/section/hero/HeroCardInfo.svelte';
	import { highWinHeroStatsFromML } from '$lib/stores/heroStores';

	export let heroes;
	export let role;

	highWinHeroStatsFromML.set(heroes);
	let date = dayjs(heroes[0]._updatedAt).format('MMM DD, YYYY h:mm A');
</script>

<PageSeo
	pageName={`${$page.params.difficulty} to use ${$page.params.role} ml heroes`}
	pageDescription={`${$page.params.difficulty} to use ${$page.params.role} heroes in mobile legends that you could use in your next game.`}
	url={`/popular/top-${$page.params.number}-${$page.params.role}-heroes-2022`}
/>
<PageTitleText title={`${$page.params.difficulty} to use ${$page.params.role} ML heroes`} />

<div class="prose">
	<p>On this list:</p>
	<ul>
		{#each heroes as hero, key}
			<li>
				<a href={`#hero-${hero.name}`}>{hero.name} - {$page.params.role}</a>
			</li>
		{/each}
	</ul>
</div>

<div class="flex flex-row flex-wrap gap-3 my-5">
	{#each heroes as hero, key}
		<a href={`#hero-${hero.name}`}>
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

<p class="text-xs ">
	{`Date Updated: ${date}`}
</p>
<p>
	There are 116 heroes in mobile legends. Let's take a look at the {$page.params.difficulty} ml heroes
	in this list.
</p>

<h2>
	<b>What is a {$page.params.role}?</b>
</h2>
<p>
	<ArticlePortableText text={role.description} />
</p>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 my-5">
	{#each heroes as hero, key}
		<div id={`hero-${hero.name}`}>
			<h2>
				{hero.name} - {#each hero.heroRoles as role, key}
					<span class="">
						{#if key == 0}
							{role.name}
						{:else}
							/ {role.name}
						{/if}
					</span>
				{/each}
			</h2>
			<HeroCardInfo {hero} />
		</div>
	{/each}
</div>
