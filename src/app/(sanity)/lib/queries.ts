import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, 
  "authorName": author->name,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    categories[]-> {
      title
    },
    publishedAt,
    body
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage,slug
  "authorName": author->name,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    categories[]-> {
      title
    },
    publishedAt,
    body
}`)