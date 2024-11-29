import { client } from '../../../sanity/lib/client'; // Đảm bảo đúng đường dẫn
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';

interface Post {
  title: string;
  mainImage:any;
  _createdAt:string;
  body: any;
  slug: {
    current: string;
  };
}

const fetchPost = async (slug: string): Promise<Post> => {
  const query = groq`*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  console.log(post,"POST");
  
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchPost(params.slug);

  return (
    <div className='max-content'>
      <h1 className="title-font text-lg font-medium text-gray-900 mb-3 md:h-[60px]">{post.title}</h1>
      <span className="mt-1 text-gray-500 text-sm">{new Date(post._createdAt).toLocaleDateString()}</span>
      <img className="lg:h-60 md:h-36 w-full object-cover object-center" src={post.mainImage?.asset?._ref} alt={post.mainImage?.alt} />
      {/* Render body bằng PortableText để xử lý rich text */}
      <div>
        <PortableText value={post.body} />
      </div>
    </div>
  );
};

export default PostPage;
