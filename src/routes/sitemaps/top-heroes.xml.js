import { siteUrl } from '$lib/config/website';

export async function get() {
	let urls = [];

	let roles = ['marksman', 'fighter', 'assassin', 'mage', 'tank', 'support'];

	roles.forEach((role) => {
		urls.push(`/popular/ml-hero-top-1-${role}-2022`);
		urls.push(`/popular/ml-hero-top-2-${role}-2022`);
		urls.push(`/popular/ml-hero-top-3-${role}-2022`);
		urls.push(`/popular/ml-hero-top-4-${role}-2022`);
		urls.push(`/popular/ml-hero-top-5-${role}-2022`);
		urls.push(`/popular/ml-hero-top-6-${role}-2022`);
		urls.push(`/popular/ml-hero-top-7-${role}-2022`);
		urls.push(`/popular/ml-hero-top-8-${role}-2022`);
		urls.push(`/popular/ml-hero-top-9-${role}-2022`);
		urls.push(`/popular/ml-hero-top-10-${role}-2022`);
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
