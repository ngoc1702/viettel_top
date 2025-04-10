import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Price from "@public/assets/img/cuoc.svg";
import Clock from "@public/assets/img/clock.svg";
import Traffic from "@public/assets/img/data.svg";
import SMS from "@public/assets/img/sms (1).svg";
import SmsButton from "@/app/component/button";
import PACKAGE_SIMILAR from "@/app/component/package_similar";
import type { Metadata } from "next";

interface Post {
  title: string;
  traffic: string;
  price: string;
  time: string;
  timeTraffic: string;
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
  categories: { title: string }[];
  sub_categories: { title: string }[];
  gallery: {
    asset: { url: string; _id: string };
    caption?: string;
  }[];
}

interface PageProps {
  params: {
    slug: string;
  };
}
const fetchPost = async (slug: string): Promise<Post | null> => {
  const query = `
    *[_type == "package" && slug.current == $slug][0]{
      title,
      traffic,
      price,
      time,
      timeTraffic,
      mainImage {
        asset-> {
          url
        },
        alt
      },
      categories[]-> { title },
      sub_categories[]-> { title },
      gallery[] {
        asset-> {
          _id,
          url
        },
        caption
      },
      _createdAt,
      body,
      slug,
      "globalField": *[_type == "global"][0].globalField
    }
  `;
  return await client.fetch(query, { slug });
};

// This enables SSR and metadata injection
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  return {
    title: post?.title || "Gói cước",
    description:
      post?.body?.[0]?.children?.[0]?.text || "Thông tin chi tiết gói cước",
  };
}

export default async function Page({ params }: PageProps) {
  const post = await fetchPost(params.slug);
  if (!post) return <div>Không tìm thấy gói cước</div>;

  return (
    <>
      <div className="max-content px-3">
        <div className="relative">
          <div className="max-content md:px-0 py-12 m:py-20 mt-20 relative">
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
                      {post.traffic}
                      {post?.timeTraffic && (
                        <span className="text-gray-900 text-base md:text-base font-bold mt-1">
                          / {post.timeTraffic}
                        </span>
                      )}
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
                      {post.title} {post.globalField}
                      <span className="text-base text-[#CE2127]"> gửi 290</span>
                    </span>
                  </button>
                </a>
              </div>
            </div>
            <div className="block md:hidden ">
              <div className="z-10 fixed bottom-0 left-0 w-full bg-white px-4 pt-4 pb-5 flex justify-between items-center shadow-top">
                <span className="text-xl font-semibold">
                  {post.price}
                  <span className="text-sm font-normal">/{post.time}</span>
                </span>
                <SmsButton
                  postTitle={post.title}
                  globalField={post.globalField}
                />
              </div>
            </div>
          </div>

          <img
            className="lg:h-[70vh] md:h-36 w-full object-cover object-center "
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage?.alt}
          />
          {/* PortableText Rendering */}
          <div className="mb-8 max-content mt-6">
            <PortableText
              value={post.body}
              // components={PortableTextComponents}
            />
          </div>
        </div>
      </div>
      <PACKAGE_SIMILAR slug={params.slug} />
    </>
  );
}
