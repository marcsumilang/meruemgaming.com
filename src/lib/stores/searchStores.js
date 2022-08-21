import {writable} from 'svelte/store'
import NProgress from 'nprogress'
import {client} from '$lib/sanityClient'
import {getHeroesByKeyword} from '$lib/groq/searchQueries'
import {goto} from '$app/navigation'

export const searchResults = writable(null)

export async function getAvailablePages(searchKeyword) {
  try {
    NProgress.start()
    const data = await client.fetch(/* groq */ `{
    "heroes": ${getHeroesByKeyword(searchKeyword)},
  }`)

    searchResults.set(data)

    //console.log('searchResults', searchResults)
    //console.log('data', data)
    NProgress.done()
    goto('/search')
  } catch (error) {
    //console.log('error', error)
    NProgress.done()
  }
}
