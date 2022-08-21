<script>
	import SaveTierModalForm from '$lib/common/modal/SaveTierModalForm.svelte';
	import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
	import FaCogs from 'svelte-icons/fa/FaCogs.svelte';
	import IoIosEye from 'svelte-icons/io/IoIosEye.svelte';
	import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
	import HorizontalList from '$lib/tier/boards/HorizontalList.svelte';
	import HeroFilterRoles from '$lib/section/hero/HeroFilterRoles.svelte';
	import HeroSearch from '$lib/section/hero/HeroSearch.svelte';
	import BoardSettingsModal from '$lib/common/modal/BoardSettingsModal.svelte';
	import {
		heroes,
		tierBoardId,
		getMyTiers,
		tierType,
		clearBoard,
		currentPatch,
		getExistingLaneTier,
		getExistingHeroTier
	} from '$lib/stores/heroStores';
	import { userSession, userProfile } from '$lib/stores/sessionStores';
	import Auth from '$lib/supabase/Auth.svelte';

	let allHeroes = $heroes;
	$: selected = 'All';
	$: showSticky = true;

	function onChangeBoardType() {
		console.log($userProfile);
		if ($userProfile?.email && $currentPatch?.name) {
			if ($tierType == 'laneTier') {
				getExistingLaneTier($userProfile, $currentPatch?.name);
			} else if ($tierType == 'heroTier') {
				getExistingHeroTier($userProfile, $currentPatch?.name);
			} else {
			}
		}
	}
</script>

<div class={`sticky top-0 left-0 right-0 z-50 bg-base-100`}>
	<a href={$currentPatch?.slug.current} class="badge badge-info link">{$currentPatch?.name} </a>
	<div class="grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 mb-2 pt-2">
		<div class="flex flex-row gap-2">
			<Auth />
			<div>
				{#if $userSession && $userSession?.user?.user_metadata?.avatar_url}
					<label for="saveTierListFormModal" class="btn btn-info btn-outline btn-sm">
						{$tierBoardId ? 'Update' : 'Save'} Tier
					</label>
					<label for="boardSettingsModal" class="btn btn-ghost btn-square btn-sm">
						<FaCogs />
					</label>
				{/if}
			</div>
		</div>
	</div>
</div>

<SaveTierModalForm />
<BoardSettingsModal />
