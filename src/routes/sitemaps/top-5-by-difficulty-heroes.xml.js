import { siteUrl } from '$lib/config/website';

export async function get() {
	let urls = [];

	let difficulties = [
		'easy',
		'easiest',
		'beginners',
		'newbies',
		'novices',
		'newcomers',
		'starters',
		'normal',
		'medium',
		'common',
		'average',
		'epic',
		'explored',
		'hard',
		'difficult',
		'hardest',
		'insane',
		'pro',
		'mythical'
	];

	difficulties.forEach((difficulty) => {
		urls.push(`/popular/top-5-${difficulty}-ml-heroes-to-use`);
	});

	const body = sitemap(urls);

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	return {
		headers,
		body
	};
}

const sitemap = (urls) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
 ${
		urls &&
		urls
			.map(
				(value) => `<url>
                  <loc>${siteUrl}${value}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.9</priority>
                </url>
                `
			)
			.join('')
 }


</urlset>`;
