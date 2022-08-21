<script>
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import {
		siteUrl,
		openGraph,
		robots,
		shareAuthors,
		facebook,
		additionalTags,
		siteName,
		twitterUsername,
		authors,
		siteBanner,
		twitterUrl,
		facebookUrl,
		instagramUrl,
		youtubeUrl,
		badgeLogoUrl
	} from '$lib/config/website.js';
	import dayjs from 'dayjs';
	export let hero1;
	export let hero2;
	export let shareImage = '';

	//max description is 160 characters
	//max title is 60

	let date = dayjs(hero1._updatedAt).format('MMM DD, YYYY');
	let year = dayjs(hero1._updatedAt).format('YYYY');
	let _createdAt = dayjs(hero1._createdAt).format('MMM DD, YYYY');
	let _updateAt = dayjs(hero1._createdAt).format('MMM DD, YYYY');
	let slug = `/compare/ml-hero-${hero1.name.toLowerCase()}-vs-${hero2.name.toLowerCase()}`;
	let name1 = hero1.name;
	let name2 = hero2.name;
	let eventTitle = `${name1} vs ${name2} guide comparison for ${year}`;
	let eventDescription = `${date} - Mobile legends hero guide for ${name1} vs ${name2} stats comparison. Which hero is better? Learn more here.`;
</script>

<MetaTags
	title={`${eventTitle}`}
	canonical={`${siteUrl}${slug}`}
	description={`${eventDescription}`}
	openGraph={{
		type: 'article',
		url: `${siteUrl}${slug}`,
		article: {
			publishedTime: _createdAt,
			modifiedTime: _updateAt,
			authors: authors
		},
		title: eventTitle,
		description: eventDescription,
		image: shareImage,
		images: [
			{
				'@type': 'ImageObject',
				url: shareImage ?? siteBanner
			}
		],
		site_name: siteName
	}}
	twitter={{
		handle: twitterUsername,
		site: '@mlbbhero.com',
		cardType: 'summary_large_image',
		title: eventTitle,
		description: eventDescription,
		image: shareImage ?? siteBanner,
		imageAlt: eventTitle
	}}
	{facebook}
	robotsProps={robots}
	additionalMetaTags={additionalTags}
/>

<JsonLd
	schema={{
		'@type': 'NewsArticle',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': 'https://google.com/article'
		},
		headline: eventTitle,
		image: [
			{
				'@type': 'ImageObject',
				url: shareImage
			}
		],
		datePublished: _createdAt,
		dateModified: _updateAt,
		author: shareAuthors,
		publisher: {
			'@type': 'Organization',
			name: siteName,
			logo: {
				'@type': 'ImageObject',
				url: badgeLogoUrl
			}
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
	<title>{eventTitle}</title>
</svelte:head>
