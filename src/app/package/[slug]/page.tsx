import { client } from "../../../sanity/lib/client";
// import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import {
  PortableTextComponentProps,
  PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Price from "@public/assets/img/cuoc.svg";
import Clock from "@public/assets/img/clock.svg";
import Traffic from "@public/assets/img/data.svg";
import SMS from "@public/assets/img/sms (1).svg";
import SmsButton from "@/app/component/button";

// Define the Post interface
interface Post {
  title: string;
  traffic: string;
  price: string;
  time: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  _createdAt: string;
  body: PortableTextBlock[];
  slug: {
    current: string;
  };
  globalField: string
}

// Define the ImageValue type
type ImageValue = {
  _type: string;
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
};

// Server-side data fetching function
const fetchPost = async (slug: string): Promise<Post> => {
  const query = `
    *[_type == "package" && slug.current == $slug][0]{
      _id, 
      title, 
      slug, 
      traffic, 
      price, 
      time,
      mainImage {
        asset-> {
          url
        },
        alt
      },
      categories[]-> {
        title
      },
      sub_categories[]-> {
        title
      },
      gallery[] {
        asset-> {
          _id,
          url
        },
        caption
      },
      _createdAt,
      body,
      "globalField": *[_type == "global"][0].globalField
    }
  `;
  
  const post = await client.fetch(query, { slug });
  if (!post) {
    throw new Error("Post not found");
  }
  console.log('Post Data:', post);
  return post;
};



// Define PortableTextComponents for rendering PortableText
const PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => (
      <div className="my-6">
        <Image
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
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-4">{children}</p>
    ),
  },
};

// Refactored Page Component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Resolving the promise to get the slug
  const post = await fetchPost(slug); // Fetch the post based on slug

  return (
    <div className="relative">
    <div className="max-content px-5 md:px-0 py-12 m:py-20 mt-20 relative">
      <h1 className="text-4xl font-bold title-font text-gray-900 mb-3">
        GÓI CƯỚC <span className="text-[#CE2127]"> {post.title}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-4">
        {/* Displaying info blocks */}
        <div className="h-full bg-white p-4 md:p-6 rounded-xl">
          <a className="inline-flex items-center">
            <Image
              alt="testimonial"
              src={Price}
              className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center"
            />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-gray-600">
                Cước phí
              </span>
              <span className="text-gray-900 text-xl md:text-3xl font-bold mt-1">
                {post.price}
              </span>
            </span>
          </a>
        </div>
        <div className="h-full bg-white p-4 md:p-6 rounded-xl">
          <a className="inline-flex items-center">
            <Image
              alt="testimonial"
              src={Clock}
              className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center"
            />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-gray-600">
                Thời hạn sử dụng
              </span>
              <span className="text-gray-900 text-xl md:text-3xl font-bold mt-1">
                {post.time}
              </span>
            </span>
          </a>
        </div>
        <div className="h-full bg-white p-4 md:p-6 rounded-xl">
          <a className="inline-flex items-center">
            <Image
              alt="testimonial"
              src={Traffic}
              className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center"
            />
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-gray-600">
                Dung lượng tốc độ cao
              </span>
              <span className="text-gray-900 text-xl md:text-3xl font-bold mt-1">
                {post.traffic}/ngày
              </span>
            </span>
          </a>
        </div>
        <div className="h-full bg-white p-4 md:p-6 rounded-xl">
          <a className="inline-flex items-center">
            <Image
              alt="testimonial"
              src={SMS}
              className="w-14 h-14 rounded-full flex-shrink-0 object-cover object-center"
            />
            <button
              // onClick={() => {
              //   const message = encodeURIComponent(post.title);
              //   window.location.href = `sms:+84987654321?body=${message}`;
              // }}
              className="flex-grow flex flex-col pl-4"
            >
              <span className="title-font font-medium text-gray-600">
                Cú pháp đăng ký SMS
              </span>
              <span className="text-gray-900 text-xl md:text-3xl font-bold mt-1">
                {post.title} {post.globalField}
                <span className="text-base text-[#CE2127]"> gửi 290</span>
              </span>
            </button>
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
    <div className="block md:hidden">
  <div className="fixed bottom-0 left-0 w-full bg-white px-4 pt-4 pb-5 flex justify-between items-center shadow-top">
   <span className="text-xl font-semibold">{post.price}<span className="text-sm font-normal">/{post.time}</span></span>
   
      <SmsButton postTitle={post.title} globalField={post.globalField} />
  </div>
</div>

   </div>
  );
}