import { siteUrl } from '$lib/config/website';
import { getHeroLinks } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';

export async function get() {
	const data = await client.fetch(/* groq */ `{
    "heroes": ${getHeroLinks()},
  }
  `);
	const pages = [`heroes`];
	const body = sitemap(data, pages);

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	return {
		headers,
		body
	};
}

const sitemap = (data, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${siteUrl}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  `
		)
		.join('')}
 ${
		data.heroes &&
		data.heroes
			.map(
				(value) => `<url>
                  <loc>${siteUrl}${value.slug.current}</loc>
                  <changefreq>daily</changefreq>
                  <priority>1.0</priority>
                </url>
                `
			)
			.join('')
 }


</urlset>`;
