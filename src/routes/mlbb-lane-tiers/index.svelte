<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/lane-tiers-guide.json');
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
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import PublishedLaneBoard from '$lib/tier/published/PublishedLaneBoard.svelte';
	import {
		publishedLaneTiers,
		pagination,
		getPublishedLaneTiers,
		heroLinks
	} from '$lib/stores/heroStores';
	import SideBar from '$lib/common/SideBar.svelte';
	import PostHeader from '$lib/tier/published/common/PostHeader.svelte';
	import PostFooter from '$lib/tier/published/common/PostFooter.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';

	export let apiTiers;
	export let apiHeroLinks;
	$publishedLaneTiers = apiTiers;
	$heroLinks = apiHeroLinks;
</script>

<PageSeo
	pageName={'MLBB Lane Tier lists'}
	pageDescription={'Keep up the meta on Mobile Legends tier lists of Heroes, meta, stats, and tips.'}
	url="/"
/>

<section id="posts-section">
	<div class="grid grid-cols-12">
		<div class="col-span-12 lg:col-span-8 lg:p-2">
			<div>
				<PageTitleText title="MLBB Lane Tier Lists" />
				<p>
					Be legendary and be updated from the mlbb meta.<br />
					To access ML1 details, click the hero avatar.
				</p>
				<div class="grid grid-cols-1 gap-5 mt-5">
					{#if $publishedLaneTiers}
						{#each $publishedLaneTiers as tierData (tierData.id)}
							<div id={`${tierData.tier_name}-by-${tierData.created_by}`}>
								<hr class="border-2 border-neutral  my-10" />
								<div class="bg-neutral text-white p-3 rounded-lg">
									<PostHeader {tierData} />
									<div class="grid grid-cols-1">
										{#each tierData.board as tier}
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
								getPublishedLaneTiers($publishedLaneTiers, $pagination.start, $pagination.end);
							}}>Load More Tiers</button
						>
					</center>
				</div>
			</div>
		</div>
		<div class="col-span-12 lg:col-span-4">
			<div class="md:sticky top-32">
				<div id="contents" class="bg-neutral text-white p-2 rounded-lg">
					<p class="text-lg font-bold">Loaded Contents</p>
					<ul>
						{#each $publishedLaneTiers as tierData (tierData.id)}
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
