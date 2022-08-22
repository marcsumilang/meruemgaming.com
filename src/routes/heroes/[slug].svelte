<script context="module">
	export async function load({ params, fetch }) {
		try {
			const url = `/heroes/${params.slug}.json`;
			const res = await fetch(url);
			const data = await res.json();

			if (data) {
				return {
					props: data
				};
			}
		} catch (err) {
			return {
				status: 500,
				error: new Error(`Could not load url`)
			};
		}
	}
</script>

<script>
	import HeroDetails from '$lib/section/hero/HeroDetails.svelte';
	import BackToTop from '$lib/common/BackToTop.svelte';
	import HeroSEO from '$lib/common/seo/HeroSEO.svelte';
	import { heroLinks } from '$lib/stores/heroStores';
	import { urlFor } from '$lib/sanityClient';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	export let hero;
	export let apiHeroLinks;
	$heroLinks = apiHeroLinks;
	let shareImage = hero.banner?.asset
		? urlFor(hero.banner?.asset).width(500).format('webp').auto('format').fit('fillmax').url()
		: urlFor(hero.image?.asset).width(500).format('webp').auto('format').fit('fillmax').url();

	let faqs = [];

	const heroGrade = getHeroGradeLetter(hero.heroGrade);

	faqs.push({
		'@type': 'Question',
		name: `What is the best build for ${hero.name}?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>One of the best build for ${hero.name} this latest patch: </p>
			<h2>${hero.build1Description ?? 'use this to scale hero power'}</h2>
			<ol>
				<li>${hero.build1[0].name} - ${hero.build1[0].category?.name}</li>
				<li>${hero.build1[1].name} - ${hero.build1[1].category?.name}</li>
				<li>${hero.build1[2].name} - ${hero.build1[2].category?.name}</li>
				<li>${hero.build1[3].name} - ${hero.build1[3].category?.name}</li>
				<li>${hero.build1[4].name} - ${hero.build1[4].category?.name}</li>
				<li>${hero.build1[5].name} - ${hero.build1[5].category?.name}</li>
			</ol>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Who can counter ${hero.name}?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>${hero.name} can be countered or may struggle against these heroes. </p>
			<h2>Toughest Matchups</h2>
			<ol>
				<li>${hero.heroWeakness[0].name}</li>
				<li>${hero.heroWeakness[1].name}</li>
				<li>${hero.heroWeakness[2].name}</li>
			</ol>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Is ${hero.name} a good hero?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>${
				hero.name
			} is currently a tier <strong>${heroGrade.toLocaleUpperCase()}</strong> hero according to our most recent tier list. </p>
			<h2>${hero.name} Lastest Stats</h2>
			<p>Win Rate: <strong>${hero.winRate}%</strong></p>			
			<p>Pick Rate: <strong>${parseFloat(hero.pickRate * 10).toFixed(2)}%</strong></p>			
			<p>Ban Rate: <strong>${hero.banRate}%</strong></p>			
			<a href="https://mlbbhero.com/leaderboard">Win Rate Leaderboard - ${hero.name} current rank </a>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Is ${hero.name} a late game hero?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>${hero.name}'s late game power scored <strong>${hero.latePower}/10</strong>.</p>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Is ${hero.name} good in early game?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>${hero.name}'s early game power scored <strong>${hero.earlyPower}/10</strong>.</p>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Is ${hero.name} hard to use?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p><strong>(${hero.heroLearningCurve.toUpperCase()})</strong> Mechanical Skill required to fully utilize ${
				hero.name
			}'s skills.</p>
		  `
		}
	});
	faqs.push({
		'@type': 'Question',
		name: `Did ${hero.name} get Nerfed or Buffed?`,
		acceptedAnswer: {
			'@type': 'Answer',
			text: `<p>${hero.name} ${
				hero.patchNote
					? `did received a <strong>${hero.patchNote.heroAdjustments[0].adjustment}</strong> adjustments this <strong>(${hero.patchNote.name})</strong>`
					: `did not received any adjustments this latest patch.`
			}</p>
		  `
		}
	});
	console.log(faqs);
</script>

{#if hero}
	<HeroSEO {hero} {shareImage} {faqs} />
	<HeroDetails {hero} {shareImage} />
{/if}

<AllHeroesText />
