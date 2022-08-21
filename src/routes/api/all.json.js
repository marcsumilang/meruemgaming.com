import {supabase} from '$lib/supabase/supabaseClient'
import {getTournamentsByStatus, getTournamentsByFeatured} from '$lib/queries'
import {client} from '$lib/sanityClient'
// Fetch all valid posts & authors to display in the homepage
// prettier-ignore
export async function get() {
    const {data, error} = await supabase.from('tiers').select().eq('published', true)
    .order('id', {ascending: false}).range(0, 5).limit(5)


  const tournament = await client.fetch(/* groq */ `{
    "featuredTournaments": ${getTournamentsByFeatured()},
  }
  `)

  if (data) {
    return {
      status: 200,
      body: {
        "apiTiers": data,
        "featuredTournaments": tournament.featuredTournaments,
      }
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
