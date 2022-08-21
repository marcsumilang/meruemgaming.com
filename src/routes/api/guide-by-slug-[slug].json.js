import { getHeroLinks } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';
import { supabase } from '$lib/supabase/supabaseClient';
// prettier-ignore
export async function get({params:{slug}}) {
    const {data, error} = await supabase.from('tiers').select()
    .match({published: true, slug: slug, email: "mailmeruem@gmail.com"})
   .single()

    const heroes = await client.fetch(/* groq */ `{
    "apiHeroLinks": ${getHeroLinks()},
      }
    `)

  if (data) {
    return {
      status: 200,
      body: {
        "apiTiers": data,
        "apiHeroLinks": heroes.apiHeroLinks,
      }
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
