<script>
	import CategoryWidget from '$lib/widgets/CategoryWidget.svelte';
	import SocialMediaButtons from '$lib/common/SocialMediaButtons.svelte';
	import SearchInput from '$lib/common/header/SearchInput.svelte';
	import GoogleDisplayAds from '$lib/ads/GoogleDisplayAds.svelte';
	import { page } from '$app/stores';
	import { pageViews } from '$lib/stores/navigationStores';
</script>

<SearchInput />
<div id="banners" class="mt-10">
	<center style="width: 250px">
		<SocialMediaButtons />
		{#if $page.url.origin != 'http://localhost:3000'}
			{#if $pageViews > 1}
				<GoogleDisplayAds />
			{/if}
		{/if}

		<img
			src="https://cdn.sanity.io/images/az4vt1in/production/50dd1d023614710b2fba1913613cb33bfb981a70-512x512.webp"
			alt="Meruem Gaming Banner"
			class="mb-2"
		/>
		<div id="container-cd10caf8af72b01915e90c04e946339d" />
	</center>
</div>
