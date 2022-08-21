import {getHeroesForTiers, getItems, getSpells, getCurrentPatch} from '$lib/groq/heroesQueries'
import {client} from '$lib/sanityClient'

// Fetch all valid posts & authors to display in the homepage
// prettier-ignore
export async function get() {
  const data = await client.fetch(/* groq */ `{
    "apiHeroes": ${getHeroesForTiers()},
    "apiItems": ${getItems()},
    "apiSpells": ${getSpells()},
    "currentPatchNote": ${getCurrentPatch()},
  }
`)

  if (data) {
    return {
      status: 200,
      body: data
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
