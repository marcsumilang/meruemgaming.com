import {getPatches} from '$lib/groq/heroesQueries'
import {client} from '$lib/sanityClient'
// prettier-ignore
export async function get() {
  const patches = await client.fetch(/* groq */ `{
    "patches": ${getPatches()},
  }
  `)


  if (patches) {
    return {
      status: 200,
      body: patches
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
