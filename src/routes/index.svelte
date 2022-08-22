<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/heroes.json');
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
	import SanityImage from '$lib/SanityImage.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import HeroFilterRoles from '$lib/section/hero/HeroFilterRoles.svelte';
	import HeroSearch from '$lib/section/hero/HeroSearch.svelte';
	import ToolTipLink from '$lib/common/ToolTipLink.svelte';
	import { getTiersRingColor } from '$lib/helpers/colors';
	import { getHeroGradeLetter } from '$lib/helpers/heroHelpers';
	import HeroGradeBadge from '$lib/common/HeroGradeBadge.svelte';
	import SideBar from '$lib/common/SideBar.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';
	import IntroductionSection from '$lib/section/landing/IntroductionSection.svelte';
	import YoutubeEmbed from '$lib/common/YoutubeEmbed.svelte';
	import SectionText from '$lib/common/SectionText.svelte';
	import dayjs from 'dayjs';

	import { flip } from 'svelte/animate';

	import { heroLinks } from '$lib/stores/heroStores';

	export let apiHeroes;
	export let youtubes;

	heroLinks.set(apiHeroes);
</script>

<PageSeo
	pageName={`Mereum Gaming - Mobile legends Content Creator`}
	pageDescription={`Meruem Gaming is a full time Mobile Legends Content Creator for Mobile Legends One Networks.`}
	url="/"
/>

<div
	class="hero min-h-96"
	style="background-image: url(https://cdn.sanity.io/images/az4vt1in/production/ee9264fb507ccd3ddec1b8a7ac2d9b52233f3919-2048x1152.webp); background-size: cover;"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center ">
		<div class="max-w-md">
			<div class="hero  bg-base-200">
				<div class="hero-content flex-col lg:flex-row-reverse">
					<img
						src="https://cdn.sanity.io/images/az4vt1in/production/04492b1019433d9b5255c2cc1ee372c9df6749d7-595x352.png"
						class="max-w-sm rounded-lg shadow-2xl"
						alt="Meruem Gaming Logo"
					/>
					<div>
						<h1 class="text-5xl font-bold">Meruem Gaming</h1>
						<p class="py-6">Mobile legends Content Creator</p>
						<!-- <button class="btn btn-primary">Get Started</button> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if youtubes.length > 0}
	<SectionText id="youtube-videos" title={`Youtube Tutorials and Gameplay`} />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		{#each youtubes as heroes, key}
			{#each heroes.youtubeGuides.gallery as youtube, key}
				<div>
					<hr class="anchor" id={`youtube-embed-${key + 1}`} />
					<YoutubeEmbed {youtube} />
				</div>
			{/each}
		{/each}
	</div>
{/if}

<AllHeroesText />
