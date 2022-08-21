import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_STUDIO_API_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true
  // token: import.meta.env.VITE_SANITY_STUDIO_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}
