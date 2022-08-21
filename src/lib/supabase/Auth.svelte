<script>
	import { userSession } from '$lib/stores/sessionStores';
	$: clicked = false;
</script>

<div class="">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	{#if $userSession && $userSession?.user?.user_metadata?.avatar_url}
		<label for="profileModal" class="cursor-pointer tooltip tooltip-bottom" data-tip="Profile">
			<div class="avatar">
				<div class="w-12 mask mask-hexagon">
					<img
						src={$userSession.user?.user_metadata.avatar_url}
						alt={$userSession.user?.user_metadata.full_name}
					/>
				</div>
			</div>
		</label>
	{:else}
		<label for="profileModal" class="btn btn-sm btn-warning">Login to Save This Guide</label>
	{/if}
</div>
