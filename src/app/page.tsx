import { client } from "./(sanity)/lib/client"
import { POSTS_QUERY } from "./(sanity)/lib/queries"
import Link from "next/link";


export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY)
  console.log(posts,"POOOOOOO");
  console.log(JSON.stringify(posts.slug, null,"FFFFFFFFFFFFFF"));


  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="grid grid-cols-3 -m-4">
      {posts.map((post:any) => (
        
        <li key={post._id}>
      <div className="p-4 ">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-60 md:h-36 w-full object-cover object-center" src={post.mainImage?.asset?.url} alt="blog" />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {post.categories?.map((cat:any) => cat.title).join(', ') || 'No categories'}
               </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3 md:h-[60px]">
            <a href={`/posts/${post?.slug.current}`}>{post?.title}</a> 
            </h1>
            <span className="mt-1 text-gray-500 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
            <p className="leading-relaxed mb-3">
              {/* Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat. */}
              {post.authorName || 'No author'} 
              </p>
            <div className="flex items-center flex-wrap ">
              <a href={`/posts/${post?.slug.current}`} className="text-[#CE2127] inline-flex items-center md:mb-2 lg:mb-0">
              <span >Learn More </span>
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx={12} cy={12} r={3} />
                </svg>1.2K
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>6
              </span>
            </div>
          </div>
        </div>
      </div>
    

        </li>
      ))}
    </div>
  </div>
  
</section>
  )
}