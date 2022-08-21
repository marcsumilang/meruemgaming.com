<script>
	import { Pinterest, Facebook, Twitter } from 'svelte-share-buttons-component';
	import { siteUrl } from '$lib/config/website';

	export let title;
	export let url;
	export let shareImage;
	export let hashtags;
</script>

<p class="text-sm">Share this on</p>
<Facebook class="share-button" quote={title} url={`${siteUrl}${url}`} />
<Twitter
	class="share-button"
	text={title}
	url={`${siteUrl}${url}`}
	hashtags={hashtags ??
		'MobileLegendsBangBang,MobileLegends,MLBB,MobileLegendsOne,MPL,MLTOURNAMENTS'}
	via="ml_zero_one"
/>
{#if shareImage}
	<Pinterest class="share-button" url={`${siteUrl}${url}`} media={shareImage} description={title} />
{/if}
