
// import { client } from "./(sanity)/lib/client";
// import React, { useState, useEffect } from "react";
// import { POSTS_QUERY } from "./(sanity)/lib/queries";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Banner from "./component/banner";
import DATA_MONTH from "./component/data_month";
import DATA_DAY from "./component/data_day";
import DATA_MORE from "./component/data_more";
import POSTS from "./component/posts";
// import Image from 'next/image';

// interface Category {
//   title: string;
// }
// interface Post {
//   sort(arg0: (a: number, b: number) => number): unknown;
//   _id: number;
//   slug: {
//     current: string;
//   };
//   title: string;
//   categories: Category[];
//   _createdAt: string;
//   mainImage: {
//     asset: {
//       url: string;
//     };
//   };
//   authorName: string;
// }
export default function Home() {
  // const [posts, setPosts] = useState<Post[] | null>(null);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const posts: Post[] = await client.fetch(POSTS_QUERY);

  //       if (!posts) {
  //         throw new Error("Failed to fetch posts");
  //       }
  //       setPosts(posts);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     } finally {
  //       console.log("Fetch posts process complete");
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  return (
    <div>
      <title>Đăng Ký 4G Viettel - Cách Đăng Ký Gói Cước 4G Nhanh Chóng</title>
      <meta name="description" content="Đăng Ký 4G Viettel - Cách Đăng Ký Gói Cước 4G Nhanh Chóng" />
      <Banner />
      <section className="mt-6 mb-6 px-3 md:px-0 mx-auto text-center">
        <p className="uppercase font-bold text-[20px] leading-[50px] max-md:max-w-full max-md:text-lg max-md:leading-[50px]">
          GÓI CƯỚC DATA 4G 5G VIETTEL
        </p>
        <p className=" text-[16px] leading-[32px] max-md:max-w-full max-md:text-[14px] max-md:leading-[24px]">
          Đăng ký gói cước data 4G 5G tốc độ cao dễ dàng cùng Viettel.media!
        </p>
        <p className=" text-[16px] leading-[32px] max-md:max-w-full max-md:text-[14px] max-md:leading-[24px]">
          Viettel Media là website phù hợp với giới trẻ, cung cấp thông tin đầy
          đủ và chính xác mọi dịch vụ, khuyến mại của Viettel.
        </p>
      </section>
      <DATA_MONTH />
      <DATA_DAY />
      <DATA_MORE />
      <POSTS />
    </div>
  );
}
