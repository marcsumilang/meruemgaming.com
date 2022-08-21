<script>
	import {
		userSession,
		signInWithGoogle,
		signInWithFacebook,
		signout,
		saveProfile,
		userProfile,
		updateProfile
	} from '$lib/stores/sessionStores';
	import { page } from '$app/stores';
	import FaRegSave from 'svelte-icons/fa/FaRegSave.svelte';
	import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte';
	import IoIosLogOut from 'svelte-icons/io/IoIosLogOut.svelte';
	import IoLogoFacebook from 'svelte-icons/io/IoLogoFacebook.svelte';
	import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';
</script>

<input type="checkbox" id={`profileModal`} class="modal-toggle" />
<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={`profileModal`} class="modal cursor-pointer">
	<label class="modal-box relative min-h-fit w-80 " for="">
		<label for="profileModal" class="btn btn-sm btn-circle absolute right-2 top-2 glass">✕</label>

		<div class="card card-compact bg-neutral text-white  p-2 shadow">
			<div class="card-body">
				<div class="grid grid-cols-1 gap-2">
					{#if $userSession}
						{#if $userSession?.user?.user_metadata?.avatar_url}
							<h3>Profile</h3>
							<div class="grid">
								<p class="mb-1 text-sm capitalize">{$userSession.user?.user_metadata.full_name}</p>
								<div class="grid grid-cols-1 gap-2 text-base-content">
									<slot />
									<div class="form-control w-full">
										<label class="label  p-0">
											<span class="label-text text-white">IGN: </span>
										</label>
										<input
											type="text"
											placeholder="IGN"
											bind:value={$userProfile.ign}
											class="input input-bordered input-xs w-full"
										/>
									</div>
									<div class="form-control w-full">
										<label class="label  p-0">
											<span class="label-text text-white">ID: </span>
										</label>
										<input
											type="text"
											placeholder="ID"
											bind:value={$userProfile.gameId}
											class="input input-bordered input-xs w-full"
										/>
									</div>
									<div class="form-control w-full p-0">
										<label class="label p-0">
											<span class="label-text text-white">Server: </span>
										</label>
										<input
											type="text"
											placeholder="Server"
											bind:value={$userProfile.server}
											class="input input-bordered input-xs w-full"
										/>
									</div>

									<button
										on:click={() => {
											if ($userProfile && $userProfile.email) {
												updateProfile(
													$userProfile,
													$userProfile.name,
													$userProfile.email,
													$userProfile.image
												);
											} else {
												saveProfile(
													$userProfile,
													$userSession.user?.user_metadata.name,
													$userSession.user?.user_metadata.email,
													$userProfile.image
												);
											}
										}}
										class="btn btn-info btn-sm gap-2"
									>
										Save <span class="w-6"><FaRegSave /></span>
									</button>
									<button
										class="btn btn-error btn-sm gap-2"
										on:click={() => {
											signout();
										}}
									>
										Logout <span class="w-6"><IoIosLogOut /></span>
									</button>
								</div>
							</div>
						{/if}
					{:else}
						<p class="text-center">Login With</p>
						<div class="grid grid-cols-2 content-center justify-center gap-2">
							<button
								class="btn btn-sm gap-2 btn-success"
								on:click={() => {
									signInWithGoogle($page.url.href);
								}}
							>
								<span class="w-6"><IoLogoGoogle /></span>
							</button>
							<button
								class="btn btn-sm gap-2 btn-info"
								on:click={() => {
									signInWithFacebook($page.url.href);
								}}
							>
								<span class="w-6"><IoLogoFacebook /></span>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</label>
</label>
