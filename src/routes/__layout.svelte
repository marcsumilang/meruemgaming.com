<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '$lib/styles/app.css';
	import TopNav from '$lib/common/header/TopNav.svelte';
	import Footer from '$lib/Footer.svelte';

	import NProgress from 'nprogress';
	import { navigating, page } from '$app/stores';
	import { ScrollProgressBar } from 'svelte-scroll-progress-bar';
	import SearchInput from '$lib/common/header/SearchInput.svelte';
	import { getProfile, userSession } from '$lib/stores/sessionStores';
	import { activeTheme } from '$lib/helpers/global';
	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
	import { supabase } from '$lib/supabase/supabaseClient';
	import ProfileModal from '$lib/common/modal/ProfileModal.svelte';
	import SuggestedPages from '$lib/widgets/SuggestedPages.svelte';
	import IntroductionSection from '$lib/section/landing/IntroductionSection.svelte';
	import { pageViews } from '$lib/stores/navigationStores';
	import GoogleGridBasedAds from '$lib/ads/GoogleGridBasedAds.svelte';
	import DataUnblockScript from '$lib/ads/DataUnblockScript.svelte';
	import { onMount } from 'svelte';
	import AllAds from '$lib/ads/AllAds.svelte';

	// NProgress css
	import 'nprogress/nprogress.css';

	NProgress.configure({
		minimum: 0.16
	});

	onMount(() => {
		console.log('URL', $page.url);
		activeTheme.set(localStorage.getItem('activeTheme') || 'winter');
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
			page_views++;
			console.log(page_views);
		}
		$pageViews = page_views;
	}
	$: page_views = 0;
</script>

{#if $page.url.origin != 'http://localhost:3000'}
	{#if page_views > 1}
		<AllAds />
	{/if}
	<DataUnblockScript />
	<GoogleAnalytics
		properties={['G-FQ61TBJF2N']}
		configurations={{ 'G-FQ61TBJF2N': { send_page_view: true } }}
	/>
{/if}
<div data-theme={$activeTheme} class="text-base-content bg-base-100 w-full">
	<ScrollProgressBar color="#F9AD14" height="4px" />
	<TopNav />
	<SvelteToast />
	<div class="w-full p-2">
		<SuggestedPages />
	</div>

	<main style="" class="m-0 p-0">
		<div class="px-2 lg:px-4 ">
			<slot />
		</div>

		<IntroductionSection />
	</main>
	{#if $page.url.origin != 'http://localhost:3000'}
		{#if page_views > 1}
			<GoogleGridBasedAds />
		{/if}
	{/if}
	<Footer />
</div>
