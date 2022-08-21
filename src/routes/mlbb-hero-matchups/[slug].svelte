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
	import ItemInfoModal from '$lib/common/modal/ItemInfoModal.svelte';
	import SpellInfoModal from '$lib/common/modal/SpellInfoModal.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import PageTitleText from '$lib/common/PageTitleText.svelte';
	import PublishedHeroMatchup from '$lib/tier/published/PublishedHeroMatchup.svelte';
	import { publishedHeroMatchUps, heroLinks } from '$lib/stores/heroStores';
	import SideBar from '$lib/common/SideBar.svelte';
	import PostHeader from '$lib/tier/published/common/PostHeader.svelte';
	import AllHeroesText from '$lib/section/hero/AllHeroesText.svelte';
	import HeroSkillsTabs from '$lib/section/hero/HeroSkillsTabs.svelte';
	import SectionText from '$lib/common/SectionText.svelte';

	export let apiTiers;
	export let apiHeroLinks;
	$publishedHeroMatchUps = apiTiers;
	$heroLinks = apiHeroLinks;
</script>

{#if $publishedHeroMatchUps}
	<PageSeo
		pageName={`${$publishedHeroMatchUps.board.left.items.name} VS ${$publishedHeroMatchUps.board.right.items.name} Guide by ${$publishedHeroMatchUps.created_by}`}
		pageDescription={`MLBB Hero Matchup and Counters. ${$publishedHeroMatchUps.tier_description}`}
		url="/"
	/>

	<section id="posts-section">
		<div class="grid grid-cols-12 overflow-hidden ">
			<div class="col-span-12 lg:col-span-8 lg:p-2">
				<div>
					<PageTitleText
						title={`${$publishedHeroMatchUps.board.left.items.name} VS ${$publishedHeroMatchUps.board.right.items.name} Guide`}
					/>
					<p class="text-sm">Guide Author: {$publishedHeroMatchUps.created_by}</p>
					<p>
						This guide is from the opinion of the creator. You could create you own too. <a
							href="/create"
							class="link">Create Guide</a
						>
					</p>
					<div class="grid grid-cols-1 gap-5 mt-5">
						<div id={`${$publishedHeroMatchUps.tier_name}-by-${$publishedHeroMatchUps.created_by}`}>
							<hr class="border-2 border-neutral  my-10" />
							<div class="p-3 rounded-lg">
								<PostHeader tierData={$publishedHeroMatchUps} />
								<div class="grid grid-cols-1">
									<PublishedHeroMatchup heroMatchupBoard={$publishedHeroMatchUps.board} />
								</div>
								<div class="">
									{#if $publishedHeroMatchUps.board.left.items.heroSkills}
										<SectionText
											id="hero-skills"
											title={`${$publishedHeroMatchUps.board.left.items.name} Skills`}
										/>
										<HeroSkillsTabs skills={$publishedHeroMatchUps.board.left.items.heroSkills} />
									{/if}
									{#if $publishedHeroMatchUps.board.left.items.heroSkillsEnhanced && $publishedHeroMatchUps.board.left.items.heroSkillsEnhanced != ''}
										<SectionText
											id="hero-skills-enhanced"
											title={`${$publishedHeroMatchUps.board.left.items.name} Enhanced Skills`}
										/>

										<HeroSkillsTabs
											skills={$publishedHeroMatchUps.board.left.items.heroSkillsEnhanced}
										/>
									{/if}
								</div>

								<div class="">
									{#if $publishedHeroMatchUps.board.right.items.heroSkills}
										<SectionText
											id="hero-skills"
											title={`${$publishedHeroMatchUps.board.right.items.name} Skills`}
										/>
										<HeroSkillsTabs skills={$publishedHeroMatchUps.board.right.items.heroSkills} />
									{/if}
									{#if $publishedHeroMatchUps.board.right.items.heroSkillsEnhanced && $publishedHeroMatchUps.board.right.items.heroSkillsEnhanced != ''}
										<SectionText
											id="hero-skills-enhanced"
											title={`${$publishedHeroMatchUps.board.right.items.name} Enhanced Skills`}
										/>

										<HeroSkillsTabs
											skills={$publishedHeroMatchUps.board.right.items.heroSkillsEnhanced}
										/>
									{/if}
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
<ItemInfoModal />
<SpellInfoModal />
