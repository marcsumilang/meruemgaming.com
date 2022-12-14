<script>
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { urlFor } from '$lib/sanityClient';
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
	export let hero;
	export let faqs = [];
	export let shareImage = '';

	//max description is 160 characters
	//max title is 60

	let date = dayjs(hero._updatedAt).format('MMM DD, YYYY');
	let year = dayjs(hero._updatedAt).format('YYYY');
	$: _createdAt = dayjs(hero._createdAt).format('MMM DD, YYYY hh:mm A');
	$: _updateAt = dayjs(hero._createdAt).format('MMM DD, YYYY hh:mm A');
	$: name = hero.name;
	$: eventTitle = `[S25-RON] ${name} build ${year} - Mobile Legends: Bang Bang`;
	$: eventDescription = `Full details of ${name} build, item setup, skills, skill combo and spells on Mobile Legends Season 25 Rise if Necrokeep - Build for supremacy.`;
</script>

<MetaTags
	title={`${eventTitle}`}
	canonical={`${siteUrl}/${name}-build`}
	description={`${eventDescription}`}
	openGraph={{
		type: 'article',
		url: `${siteUrl}/${name}-build`,
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

<JsonLd
	output="body"
	schema={{
		'@type': 'FAQPage',
		mainEntity: faqs
	}}
/>

{#if hero?.youtubeGuides?.gallery?.length > 0}
	{#each hero.youtubeGuides.gallery as youtube, key}
		<JsonLd
			output="body"
			schema={{
				'@type': 'VideoObject',
				name: youtube.title,
				description: youtube.description,
				thumbnailUrl: [
					urlFor(youtube.banner).width(1200).height(500).format('png').auto('format').fit('fillmax')
				],
				uploadDate: youtube.uploadDate,
				contentUrl: youtube.url,
				embedUrl: youtube.url
			}}
		/>
	{/each}
{/if}

<svelte:head>
	<title>{eventTitle}</title>
</svelte:head>
