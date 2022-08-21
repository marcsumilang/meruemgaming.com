export const author = 'Meruem Gaming';
export const siteLanguage = 'en';
export const youtubeAccount = 'https://www.youtube.com/channel/UCxxSyFY7deBlS6pMTXlOzEQ';
export const facebookAccount = 'https://www.facebook.com/mlbbheropage';
export const twitterAccount = 'https://twitter.com/mlbbhero1';
export const instagramAccount = 'https://www.instagram.com/mobilelegends.one/';
export const tiktokAccount = 'https://www.tiktok.com/@mlbbhero.com';
export const siteTitle = 'Meruem Gaming Guide';
export const siteUrl = 'https://meruemgaming.com';
export const siteName = 'Meruem Gaming Guides';
export const twitterUsername = 'mlbbhero1';
export const tagline = 'Be Updated. Be Legendary.';
export const twitterUrl = 'https://twitter.com/mlbbhero1';
export const facebookUrl = 'https://www.facebook.com/mlbbhero.com';
export const youtubeUrl = 'https://www.youtube.com/channel/UCxxSyFY7deBlS6pMTXlOzEQ';
export const instagramUrl = 'https://www.instagram.com/mlbbhero.com/';
export const topHeroesBanner =
	'https://cdn.sanity.io/images/az4vt1in/production/fea55cb7d3ce3843ae604845389e55126a81e6bf-1920x1080.webp';
export const siteBanner =
	'https://cdn.sanity.io/images/az4vt1in/production/bd8e45b32cadfd4a46ce7eb978ff5f8b905a2d90-1280x720.png';
export const badgeLogoUrl =
	'https://cdn.sanity.io/images/az4vt1in/production/2f78fbe3203a6c6ce82649f4f8456ff56c3762df-288x288.webp';

export const authors = [
	'https://mobilelegends.one/authors/meruem',
	'https://mobilelegends.one/authors/mlbbhero1'
];
export const shareAuthors = 'Meruem Gaming';

export let title = 'Meruem Gaming Guide and Statistics';
export let description = 'Meruem Gaming Guide, tier list, tutorials and hero statistics.';

export const openGraph = {
	url: 'https://meruemgaming.com',
	title: title,
	description: description,
	images: [
		{
			url: siteBanner,
			alt: 'Meruem Gaming Banner'
		},
		{
			url: badgeLogoUrl,
			alt: 'Meruem Gaming Logo Badge'
		}
	],
	site_name: siteName
};

export const additionalTags = [
	{
		property: 'dc:creator',
		content: 'Meruem Gaming'
	},
	{
		name: 'mlbb-hero-guide',
		content: 'Svelte-Meta-Tags'
	},
	{
		httpEquiv: 'x-ua-compatible',
		content: 'IE=edge; chrome=1'
	},
	{
		rel: 'icon',
		href: 'https://meruemgaming.com/favicon.ico'
	},
	{
		rel: 'apple-touch-icon',
		href: 'https://meruemgaming.com/icon-192x192.png',
		sizes: '192x192'
	},
	{
		rel: 'manifest',
		href: '/manifest.json'
	}
];

export const twitter = {
	handle: '@mlbbhero1',
	site: siteName,
	cardType: 'summary_large_image',
	title: title,
	description: description,
	image: badgeLogoUrl,
	imageAlt: 'Twitter image alt'
};

export const facebook = {
	appId: '1055095178429405'
};

export const robots = {
	index: true,
	follow: true,
	maxSnippet: -1,
	maxImagePreview: 'large',
	maxVideoPreview: -1,
	notranslate: false,
	noimageindex: false
};
