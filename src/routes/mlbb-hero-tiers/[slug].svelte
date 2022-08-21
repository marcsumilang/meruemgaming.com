<script context="module">
	export async function load({ params, fetch }) {
		try {
			const res = await fetch(`/api/guide-by-slug-${params.slug}.json`);
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
	import HeroInfoModal from '$lib/common/modal/HeroInfoModal.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import PublishedHeroBoard from '$lib/tier/published/PublishedHeroBoard.svelte';
	import { publishedHeroTiers, heroLinks } from '$lib/stores/heroStores';
	import SideBar from '$lib/common/SideBar.svelte';
	import PostHeader from '$lib/tier/published/common/PostHeader.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';

	export let apiTiers;
	export let apiHeroLinks;
	$publishedHeroTiers = apiTiers;
	$heroLinks = apiHeroLinks;
</script>

{#if $publishedHeroTiers}
	<PageSeo
		pageName={`${$publishedHeroTiers.tier_name} Tier Guide by ${$publishedHeroTiers.created_by} `}
		pageDescription={`MLBB Hero Tiers. ${$publishedHeroTiers.tier_description}`}
		url="/"
	/>

	<section id="posts-section">
		<div class="grid grid-cols-12 overflow-hidden ">
			<div class="col-span-12 lg:col-span-8 lg:p-2">
				<div>
					<PageTitleText
						title={`${$publishedHeroTiers.tier_name} by ${$publishedHeroTiers.created_by} | Tier Guide`}
					/>
					<p>
						Be legendary and be updated from the mlbb meta.<br />
						To access ML1 details, click the hero avatar.
					</p>
					<div class="grid grid-cols-1 gap-5 mt-5">
						<div id={`${$publishedHeroTiers.tier_name}-by-${$publishedHeroTiers.created_by}`}>
							<hr class="border-2 border-neutral  my-10" />
							<div class="bg-neutral text-white p-3 rounded-lg">
								<PostHeader tierData={$publishedHeroTiers} />
								<div class="grid grid-cols-1">
									<PublishedHeroBoard tiersHeroBoard={$publishedHeroTiers.board} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-12 lg:col-span-4">
				<SideBar />
			</div>
		</div>
	</section>
{/if}

<AllHeroesText />
<HeroInfoModal />
