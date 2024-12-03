"use client"
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Price from "@public/assets/img/cuoc.svg";
import Clock from "@public/assets/img/clock.svg";
import Traffic from "@public/assets/img/data.svg";
import SMS from "@public/assets/img/sms (1).svg";

interface Post {
  title: string;
  traffic:string;
  price:string;
  time:string;
  mainImage: any;
  _createdAt: string;
  body: any;
  slug: {
    current: string;
  };
}

const fetchPost = async (slug: string): Promise<Post> => {
  const query = groq`*[_type == "package" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
 console.log(post,"AAAAAAAA");
 
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

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params; 
  const post = await fetchPost(slug);

  return (
    <div className="max-content px-5 md:px-0 py-12 m:py-20">
      <h1 className="text-4xl font-bold title-font text-gray-900 mb-3">
        {post.title}
      </h1>
      {/* <span className="mt-1 text-gray-500 text-base">
         {new Date(post?._createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
      </span> */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
  
    <div className="h-full bg-gray-100 p-6 rounded-xl">
      <a className="inline-flex items-center">
        <Image alt="testimonial" src={Price} className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center" />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-600 ">Cước phí</span>
          <span className="text-gray-900 text-3xl font-bold mt-1">{post?.price}</span>
        </span>
      </a>
    </div>
    <div className="h-full bg-gray-100 p-6 rounded-xl">
      <a className="inline-flex items-center">
        <Image alt="testimonial" src={Clock} className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center" />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-600 ">Thời hạn sử dụng</span>
          <span className="text-gray-900 text-3xl font-bold mt-1">{post?.time}</span>
        </span>
      </a>
    </div>
    <div className="h-full bg-gray-100 p-6 rounded-xl">
      <a className="inline-flex items-center">
        <Image alt="testimonial" src={Traffic} className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center" />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-600 ">Dung lượng tốc độ cao</span>
          <span className="text-gray-900 text-3xl font-bold mt-1">{post?.traffic}/ngày</span>
        </span>
      </a>
    </div>
    <div className="h-full bg-gray-100 p-6 rounded-xl">
      <a className="inline-flex items-center">
        <Image alt="testimonial" src={SMS} className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center" />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-600 ">Cú pháp đăng ký  SMS</span>
          <span className="text-gray-900 text-3xl font-bold mt-1">{post?.title} <span className="text-base text-[#CE2127]">gửi 290</span></span> 
        </span>
      </a>
    </div>

</div>

      <img
        className="lg:h-[70vh] md:h-36 w-full object-cover object-center mt-8"
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
