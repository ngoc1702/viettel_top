"use client"
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { PortableTextComponentProps, PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Price from "@public/assets/img/cuoc.svg";
import Clock from "@public/assets/img/clock.svg";
import Traffic from "@public/assets/img/data.svg";
import SMS from "@public/assets/img/sms (1).svg";
import SmsButton from "@/app/component/button";
import Head from "next/head";
import { useState, useEffect } from "react";

const POSTS_QUERY2 = `*[_type == "package"]{
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
  }
}`;

interface Category {
  title: string;
}

interface Sub_Category {
  title: string;
}

type ImageValue = {
  _type: string;
  asset: { _ref: string; _type: string };
  alt?: string;
  caption?: string;
};

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
  globalField: string;
  categories: Category[];
  sub_categories: Sub_Category[];
}

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
  
  const post = await client.fetch<Post>(query, { slug });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

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

export default function Page({ params }: { params: { slug: string } }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { slug } = params;
        
        // Fetch specific post
        const post = await fetchPost(slug);
        setSelectedPost(post);
        
        // Fetch all posts for similar ones
        const fetchedPosts = await client.fetch<Post[]>(POSTS_QUERY2);
        
        if (!fetchedPosts) {
          throw new Error("Failed to fetch posts");
        }
        
        // Filter posts that have matching sub_categories with the selectedPost
        const filteredPosts = fetchedPosts.filter(post =>
          post.sub_categories.some(subCategory =>
            selectedPost?.sub_categories.some(selectedSub => selectedSub.title === subCategory.title)
          )
        );
        
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-content px-5">
      <div className="relative">
        <Head>
          <title>{`GÓI CƯỚC ${selectedPost.title}`}</title>
        </Head>

        <div className="max-content md:px-0 py-12 m:py-20 mt-20 relative">
          <h1 className="text-4xl font-bold title-font text-gray-900 mb-3">
            GÓI CƯỚC <span className="text-[#CE2127]"> {selectedPost.title}</span>
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
                    {selectedPost.price}
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
                    {selectedPost.time}
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
                    {selectedPost.traffic}/ngày
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
                <button className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-600">
                    Cú pháp đăng ký SMS
                  </span>
                  <span className="text-gray-900 text-xl md:text-3xl font-bold mt-1">
                    {selectedPost.title} {selectedPost.globalField}
                    <span className="text-base text-[#CE2127]"> gửi 290</span>
                  </span>
                </button>
              </a>
            </div>
          </div>
          <div className="block md:hidden">
            <div className="fixed bottom-0 left-0 w-full bg-white px-4 pt-4 pb-5 flex justify-between items-center shadow-top">
              <span className="text-xl font-semibold">
                {selectedPost.price}<span className="text-sm font-normal">/{selectedPost.time}</span>
              </span>
              <SmsButton postTitle={selectedPost.title} globalField={selectedPost.globalField} />
            </div>
          </div>
        </div>

        <img
          className="lg:h-[70vh] md:h-36 w-full object-cover object-center "
          src={urlFor(selectedPost.mainImage).url()}
          alt={selectedPost.mainImage?.alt}
        />
        {/* PortableText Rendering */}
        <div className="mb-12 max-content mt-6">
          <PortableText value={selectedPost.body} components={PortableTextComponents} />
        </div>

        {/* Display Similar Posts */}
        <div className="max-content">
          <h1 className="uppercase md:px-0 font-bold text-[36px] leading-[80px] max-md:max-w-full max-md:text-2xl max-md:leading-[36px]">
            <span className=" text-[#141718]">Gói Cước Tương Tự</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {posts.map((post) => (
              <div key={post.slug.current} className="group h-full border p-6 rounded-md">
                <h3 className="text-xl font-semibold mb-4">
                  <a href={`/posts/${post.slug.current}`}>{post.title}</a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
