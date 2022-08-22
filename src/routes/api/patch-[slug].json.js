import {getPatchNote} from '$lib/groq/heroesQueries'
import {client} from '$lib/sanityClient'
// prettier-ignore
export async function get({params:{slug}}) {
  const patchNote = await client.fetch(/* groq */ `{
    "patchNote": ${getPatchNote(slug)},
  }
  `)


  if (patchNote) {
    return {
      status: 200,
      body: patchNote
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
