import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2024-06-11", // use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_SANITY_PROJECT_TOKEN,
})

const imageBuilder = imageUrlBuilder(sanityClient)

export function sanityImageBuilder(source: string) {
  return imageBuilder.image(source)
}
