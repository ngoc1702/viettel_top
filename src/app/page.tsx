import { client } from "./(sanity)/lib/client"
import { POSTS_QUERY } from "./(sanity)/lib/queries"


export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <ul>
      {posts.map((post:any) => (
        <li key={post._id}>
          <a href={`/posts/${post?.slug.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
}