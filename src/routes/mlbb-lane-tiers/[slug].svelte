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
	import PublishedLaneBoard from '$lib/tier/published/PublishedLaneBoard.svelte';
	import { publishedLaneTiers, heroLinks } from '$lib/stores/heroStores';
	import SideBar from '$lib/common/SideBar.svelte';
	import PostHeader from '$lib/tier/published/common/PostHeader.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';

	export let apiTiers;
	export let apiHeroLinks;
	$publishedLaneTiers = apiTiers;
	$heroLinks = apiHeroLinks;
</script>

{#if $publishedLaneTiers}
	<PageSeo
		pageName={`${$publishedLaneTiers.tier_name} Guide by ${$publishedLaneTiers.created_by}`}
		pageDescription={`MLBB Hero Matchup and Counters. ${$publishedLaneTiers.tier_description}`}
		url="/"
	/>

	<section id="posts-section">
		<div class="grid grid-cols-12 overflow-hidden ">
			<div class="col-span-12 lg:col-span-8 lg:p-2">
				<div>
					<PageTitleText
						title={`${$publishedLaneTiers.tier_name} Guide by ${$publishedLaneTiers.created_by}`}
					/>
					<p>
						Be legendary and be updated from the mlbb meta.<br />
						To access ML1 details, click the hero avatar.
					</p>
					<div class="grid grid-cols-1 gap-5 mt-5">
						<div id={`${$publishedLaneTiers.tier_name}-by-${$publishedLaneTiers.created_by}`}>
							<hr class="border-2 border-neutral  my-10" />
							<div class="bg-neutral text-white p-3 rounded-lg">
								<PostHeader tierData={$publishedLaneTiers} />
								<div class="grid grid-cols-1">
									{#each $publishedLaneTiers.board as tier}
										<div class="flex flex-row">
											<div
												class={`${tier.color} text-black grid content-center text-center p-3 w-10`}
											>
												{tier.name}
											</div>
											<div class="grow">
												<PublishedLaneBoard columnItems={tier.roles} />
											</div>
										</div>
									{/each}
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
