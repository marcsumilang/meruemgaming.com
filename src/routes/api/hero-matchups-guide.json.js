import { getHeroLinks } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';
import { supabase } from '$lib/supabase/supabaseClient';
// prettier-ignore
export async function get() {
    const {data, error} = await supabase.from('tiers').select()
    .match({published: true, tier_type: 'heroMatchup', email: "mailmeruem@gmail.com"})
    .order('id', {ascending: false}).range(0, 5).limit(5)


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
