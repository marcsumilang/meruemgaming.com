<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/heroes/heroes.json');
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

	import { flip } from 'svelte/animate';

	import { heroes, heroLinks } from '$lib/stores/heroStores';
	import dayjs from 'dayjs';

	export let apiHeroes;

	heroes.set(apiHeroes);
	heroLinks.set(apiHeroes);
	let allHeroes = $heroes;
	$: selected = 'All';

	let year = dayjs().format('YYYY');
	let date = dayjs().format('MMM DD, YYYY');
</script>

<PageSeo
	pageName={`ML Hero lists :: MLBB Hero Guides - Mobile Legends ${year}`}
	pageDescription={`${date} ML hero guide, build, items, skills -  Be updated on mlbb hero guides and tutorials. Win more in mobile legends.`}
	url="/heroes"
/>

<IntroductionSection />

<section id="posts-section">
	<div class="grid grid-cols-12 overflow-hidden ">
		<div class="col-span-12 xl:col-span-8 p-2 lg:p-5">
			<div>
				<PageTitleText title="MLBB Hero lists" />
				<p>
					This hero list is sorted programmatically by hero grade. <br />
					Hero grades are determined by a combination of the hero's early power, mid power, late power,
					win rate, pick rate, and ban rate.
				</p>

				<p class="mt-10 mb-2 text-sm">
					Filter Heroes: {$heroes?.length}
				</p>

				<div class="grid grid-cols-1 lg:grid-cols-2 ">
					<div class="grid grid-cols-1 ">
						<HeroFilterRoles {allHeroes} {selected} />
					</div>
					<HeroSearch {allHeroes} />
				</div>
				<div class="flex flex-row flex-wrap  gap-5 lg:gap-10 mt-5 p-5">
					{#if $heroes}
						{#each $heroes as hero (hero.id)}
							<div animate:flip={{ duration: 300 }}>
								<ToolTipLink href={hero.slug.current} label={`${hero.name} Build`}>
									<div class="grid w-20 indicator">
										<HeroGradeBadge heroGrade={getHeroGradeLetter(hero.heroGrade)} />
										<SanityImage
											image={hero.image}
											alt={hero.name + ' image'}
											maxHeight={100}
											maxWidth={100}
											customClass={`rounded-full w-20 ring ${getTiersRingColor(
												getHeroGradeLetter(hero.heroGrade)
											)} ring-offset-base-100 ring-offset-2`}
										/>
										<p class="text-center mt-1">{hero.name}</p>
									</div>
								</ToolTipLink>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="col-span-12 xl:col-span-4">
			<div class="md:sticky top-20">
				<SideBar />
			</div>
		</div>
	</div>
</section>

<AllHeroesText />
