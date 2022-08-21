<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/hero-matchups-guide.json');
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
	import Loading from '$lib/common/spinner/Loading.svelte';
	import HeroInfoModal from '$lib/common/modal/HeroInfoModal.svelte';
	import ItemInfoModal from '$lib/common/modal/ItemInfoModal.svelte';
	import SpellInfoModal from '$lib/common/modal/SpellInfoModal.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import PublishedHeroMatchup from '$lib/tier/published/PublishedHeroMatchup.svelte';
	import {
		publishedHeroMatchUps,
		pagination,
		getPublishedHeroMatchUps,
		heroLinks
	} from '$lib/stores/heroStores';
	import SideBar from '$lib/common/SideBar.svelte';
	import PostHeader from '$lib/tier/published/common/PostHeader.svelte';
	import PostFooter from '$lib/tier/published/common/PostFooter.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';

	export let apiTiers;
	export let apiHeroLinks;
	publishedHeroMatchUps.set(apiTiers);
	heroLinks.set(apiHeroLinks);
</script>

<PageSeo
	pageName={'MLBB Hero Matchups'}
	pageDescription={'Keep up the meta on Mobile Legends hero matchups and counters.'}
	url="/"
/>

<section id="posts-section">
	<div class="grid grid-cols-12">
		<div class="col-span-12 lg:col-span-8 lg:p-2">
			<div>
				<PageTitleText title="MLBB Hero Matchups" />
				<p>
					Be legendary and be updated from the mlbb meta.<br />
					Click the image to view more details.
				</p>
				<div class="grid grid-cols-1 gap-5 mt-5">
					{#if $publishedHeroMatchUps}
						{#each $publishedHeroMatchUps as tierData (tierData.id)}
							<div id={`${tierData.tier_name}-by-${tierData.created_by}`}>
								<hr class="border-2 border-neutral  my-10" />
								<div class="bg-neutral text-white p-3 rounded-lg">
									<PostHeader {tierData} />

									<div class="grid grid-cols-1">
										<PublishedHeroMatchup heroMatchupBoard={tierData.board} />
									</div>
									<PostFooter {tierData} />
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<div class="mt-10">
					<center>
						<Loading /> <br />
						<button
							class="btn btn-info"
							on:click={() => {
								$pagination.start = $pagination.start + 5;
								$pagination.end = $pagination.end + 5;
								getPublishedHeroMatchUps(
									$publishedHeroMatchUps,
									$pagination.start,
									$pagination.end
								);
							}}>Load More Tiers</button
						>
					</center>
				</div>
			</div>
		</div>
		<div class="col-span-12 lg:col-span-4">
			<div class="md:sticky top-32">
				<div class="bg-neutral text-white p-2 rounded-lg">
					<p class="text-lg font-bold">Loaded Contents</p>
					<ul>
						{#each $publishedHeroMatchUps as tierData (tierData.id)}
							<li>
								<a
									href={`#${tierData.tier_name}-by-${tierData.created_by}`}
									class="link flex flex-row gap-1 content-center active:text-info visited:text-warning"
								>
									<div class="avatar">
										<div class="w-6 rounded-full">
											<img src={tierData.created_by_image} alt={tierData.created_by} />
										</div>
									</div>
									{tierData.tier_name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
				<SideBar />
			</div>
		</div>
	</div>
</section>

<AllHeroesText />

<HeroInfoModal />
<ItemInfoModal />
<SpellInfoModal />
