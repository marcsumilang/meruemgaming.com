<script>
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import {
		siteUrl,
		robots,
		shareAuthors,
		description,
		title,
		facebook,
		additionalTags,
		siteName,
		twitterUsername,
		siteTitle,
		badgeLogoUrl,
		siteBanner,
		twitterUrl,
		facebookUrl,
		instagramUrl,
		youtubeUrl
	} from '$lib/config/website.js';
	export let pageName;
	export let url = '';
	export let pageDescription;
</script>

<MetaTags
	title={`${pageName}`}
	titleTemplate="%s | Meruem Gaming"
	canonical={siteUrl + url}
	description={`${pageDescription}`}
	openGraph={{
		type: 'website',
		url: `${siteUrl + url}`,
		title: pageName,
		description: pageDescription,
		image: siteBanner,
		images: [
			{
				'@type': 'ImageObject',
				url: siteBanner
			}
		],
		site_name: siteName
	}}
	twitter={{
		handle: twitterUsername,
		site: '@mlbbhero.com',
		cardType: 'summary_large_image',
		title: pageName,
		description: pageDescription,
		image: siteBanner,
		imageAlt: pageName
	}}
	{facebook}
	robotsProps={robots}
	additionalMetaTags={additionalTags}
/>

<JsonLd
	schema={{
		'@type': 'WebPage',
		name: pageName,
		image: siteBanner,
		description: pageDescription,
		publisher: {
			'@type': 'ProfilePage',
			name: "Meruem Gaming's Website"
		}
	}}
/>

<JsonLd
	schema={{
		'@context': 'http://schema.org',
		'@type': 'Organization',
		url: `${siteUrl}`,
		name: `${siteName}`,
		logo: {
			'@type': 'ImageObject',
			url: badgeLogoUrl
		},
		sameAs: [twitterUrl, facebookUrl, instagramUrl, youtubeUrl]
	}}
/>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>
