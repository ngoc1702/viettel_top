import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface Post {
  title: string;
  mainImage: any;
  _createdAt: string;
  body: any;
  slug: {
    current: string;
  };
}

const fetchPost = async (slug: string): Promise<Post> => {
  const query = groq`*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });

  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

const PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="my-6">
        <img
          src={urlFor(value).url()}
          alt={value.alt || "Image"}
          className="w-full h-auto object-cover"
        />
        {value.caption && (
          <p className="text-sm text-gray-500 mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
};

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchPost(params.slug);

  return (
    <div className="max-content py-20">
      <h1 className="text-2xl font-bold title-font text-gray-900 mb-3">
        {post.title}
      </h1>
      <span className="mt-1 text-gray-500 text-base">
        {new Date(post._createdAt).toLocaleDateString()}
      </span>
      <img
        className="lg:h-[50vh] md:h-36 w-full object-cover object-center mt-6"
        src={urlFor(post.mainImage).url()}
        alt={post.mainImage?.alt}
      />
      <div className="mt-6">
        <PortableText value={post.body} components={PortableTextComponents} />
      </div>
    </div>
  );
};

export default PostPage;
