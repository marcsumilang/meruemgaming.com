import { getHeroesBySlug, getHeroLinks } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';

// Fetch all valid posts & authors to display in the homepage
// prettier-ignore
export async function get({params:{slug}}) {
    // prettier-ignore
  const data = await client.fetch(/* groq */ `{
    "hero": ${getHeroesBySlug(slug)},
     "apiHeroLinks": ${getHeroLinks()},
  }
  `)

  if (data) {
    return {
      status: 200,
      body: {
        "hero": data.hero,
        "apiHeroLinks": data.apiHeroLinks,
      }
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
