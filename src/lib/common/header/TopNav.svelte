<script>
	import { activeTheme } from '$lib/helpers/global';
	import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
	import ToggleTheme from '$lib/common/header/ToggleTheme.svelte';
	import SocialMediaButtons from '$lib/common/SocialMediaButtons.svelte';
	import { navigating, page } from '$app/stores';

	let hide = false;
	$: {
		if ($navigating) {
			hide = true;
		}
		if (!$navigating) {
			hide = false;
		}
	}
	console.log('');
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<nav
	class={`glass border-b-2 text-base-content ${
		$page.url.pathname == '/create' ? 'relative' : 'sticky'
	} top-0 left-0 right-0 w-full`}
	style="z-index: 51;"
>
	<div class="flex justify-between">
		<div class="grid content-center  p-1 ">
			<div class="">
				<a href="/" aria-label="Meruem Gaming Logo" class="absolute top-0">
					<img
						src="https://cdn.sanity.io/images/az4vt1in/production/2f78fbe3203a6c6ce82649f4f8456ff56c3762df-288x288.webp"
						alt="Meruem Gaming Logo"
						style="width: 100px; height: 100px;"
					/>
				</a>
			</div>
		</div>
		<ul class="flex  pt-2">
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-lane-tiers"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Lane Tiers</a
				>
			</li>
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-hero-tiers"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Hero Tiers</a
				>
			</li>
			<li class="hover:bg-warning hover:text-white  hidden lg:block">
				<a
					href="/mlbb-hero-matchups"
					class="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Hero Counters</a
				>
			</li>

			<a
				href="/create"
				class="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-pink-500 hover:to-yellow-500 btn-sm ml-1 mr-3 mt-3 lg:mt-4 text-neutral"
				>Create Tier</a
			>
			<ToggleTheme />

			<div class="lg:hidden ">
				<div class="dropdown dropdown-end grid content-center pb-2">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-circle btn-ghost mt-1 cursor-pointer">
						<div class="w-10"><IoIosMenu /></div>
					</label>
					<div tabindex="0" class="dropdown-content card card-compact w-64 shadow bg-base-100">
						<div class="card-body">
							<ul tabindex="0" class="menu p-2 rounded-box">
								<li>
									<a href="/mlbb-lane-tiers" class="capitalize">Lane Tiers </a>
								</li>
								<li>
									<a href="/mlbb-hero-tiers" class="capitalize">Hero Tiers</a>
								</li>
								<li>
									<a href="/mlbb-hero-matchups" class="capitalize">Hero Counters</a>
								</li>
							</ul>
							<hr />
							<SocialMediaButtons />
							<hr />
							<p class="text-center">Mereum Gaming. Be Updated. Be Legendary.</p>
						</div>
					</div>
				</div>
			</div>
		</ul>
	</div>
</nav>
