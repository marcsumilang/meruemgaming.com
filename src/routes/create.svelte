<script context="module">
	export async function load({ fetch }) {
		try {
			const res = await fetch('/api/heroes-tiers.json');
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
	import SavedTiersModal from '$lib/common/modal/SavedTiersModal.svelte';
	import Loading from '$lib/common/spinner/Loading.svelte';
	import TierLaneBoard from '$lib/tier/boards/TierLaneBoard.svelte';
	import TierHeroBoard from '$lib/tier/boards/TierHeroBoard.svelte';
	import LaneMatchupBoard from '$lib/tier/boards/LaneMatchupBoard.svelte';
	import ItemInfoModal from '$lib/common/modal/ItemInfoModal.svelte';
	import SpellInfoModal from '$lib/common/modal/SpellInfoModal.svelte';
	import ProfileModal from '$lib/common/modal/ProfileModal.svelte';
	import ItemFilter from '$lib/tier/lists/ItemFilter.svelte';
	import Hotjar from '$lib/tier/create/Hotjar.svelte';
	import {
		heroes,
		tiersLaneBoard,
		tierType,
		allItems,
		itemsList,
		allSpells,
		currentPatch,
		existingHeroTierOnCurrentPatch,
		existingLaneTierOnCurrentPatch,
		getExistingLaneTier
	} from '$lib/stores/heroStores';
	import CreateStickyHeader from '$lib/tier/create/CreateStickyHeader.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import ExistingHeroTierOnCurentPatch from '$lib/common/warnings/ExistingHeroTierOnCurentPatch.svelte';
	import ExistingLaneTierOnCurentPatch from '$lib/common/warnings/ExistingLaneTierOnCurentPatch.svelte';
	import SelectHeroModal from '$lib/common/modal/SelectHeroModal.svelte';
	import PageSeo from '$lib/common/seo/PageSeo.svelte';
	import { onMount } from 'svelte';
	import { getProfile, userProfile } from '$lib/stores/sessionStores';
	import { supabase } from '$lib/supabase/supabaseClient';

	export let apiHeroes;
	export let apiItems;
	export let apiSpells;
	export let currentPatchNote;

	heroes.set(apiHeroes);
	allItems.set(apiItems);
	itemsList.set(apiItems);
	allSpells.set(apiSpells);
	currentPatch.set(currentPatchNote);

	onMount(() => {
		console.log('URL', $page.url);
		getProfile();
		if ($userProfile?.email && $currentPatch?.name) {
			if ($tierType == 'laneTier') {
				getExistingLaneTier($userProfile, $currentPatch?.name);
			} else if ($tierType == 'heroTier') {
				getExistingHeroTier($userProfile, $currentPatch?.name);
			} else {
			}
		}
		supabase.auth.onAuthStateChange((event, session) => {
			if (event == 'SIGNED_IN') {
				console.log('SIGNED_IN', session);
				getProfile();

				if ($userProfile?.email && $currentPatch?.name) {
					if ($tierType == 'laneTier') {
						getExistingLaneTier($userProfile, $currentPatch?.name);
					} else if ($tierType == 'heroTier') {
						getExistingHeroTier($userProfile, $currentPatch?.name);
					} else {
					}
				}
			}
		});
	});
</script>

<PageSeo
	pageName={`Create MLBB Hero Guides and tier lists for Mobile Legends`}
	pageDescription={`You can now create your own ML hero guides, hero comparisons, tier lists and hero builds. Share your MLBB knowledge.`}
	url="/create"
/>

{#if $page.url.origin != 'http://localhost:3000'}
	<Hotjar />
{/if}

<SvelteToast />

<CreateStickyHeader />

<Loading />
{#if $tierType == 'laneTier'}
	{#if $existingLaneTierOnCurrentPatch}
		<ExistingLaneTierOnCurentPatch />
	{/if}
	<div class="grid grid-cols-1">
		{#each $tiersLaneBoard as tier, key}
			<div class="flex flex-row">
				<div class={`${tier.color} text-black grid content-center text-center p-3 w-10`}>
					{tier.name}
				</div>
				<div class="grow">
					<TierLaneBoard columnItems={tier.roles} tierName={tier.name} tierKey={key} />
				</div>
			</div>
		{/each}
	</div>
{:else if $tierType == 'heroTier'}
	{#if $existingHeroTierOnCurrentPatch}
		<ExistingHeroTierOnCurentPatch />
	{/if}
	<TierHeroBoard />
{:else if $tierType == 'heroMatchup'}
	<LaneMatchupBoard />
{:else}
	<p>board</p>
{/if}

<HeroInfoModal />
<ItemInfoModal />
<SpellInfoModal />
<SavedTiersModal />
<SelectHeroModal />
<ProfileModal />
