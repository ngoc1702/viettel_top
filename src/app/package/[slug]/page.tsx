"use client";
import { client } from "../../../sanity/lib/client";
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
import Head from "next/head";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
  },
   gallery[] {
      asset-> {
        _id,
        url
      },
      caption
    },
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
interface Image {
  asset: {
    url: string;
    _id: string;
  };
  caption?: string;
}

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
  gallery: Image[];
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const handleOpenPopup = (post: Post) => {
    setSelectedPost(post);
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { slug } = params;

        // Fetch specific post
        const post = await fetchPost(slug);
        console.log("selectedPost:", post);
        setSelectedPost(post);

        if (!post || !post.categories || !post.sub_categories) {
          console.warn(
            "selectedPost hoặc categories hoặc sub_categories không hợp lệ"
          );
          setPosts([]);
          return;
        }

        // Fetch all posts
        const fetchedPosts = await client.fetch<Post[]>(POSTS_QUERY2);
        console.log("Tất cả bài viết từ API:", fetchedPosts);

        if (!fetchedPosts) {
          throw new Error("Failed to fetch posts");
        }

        // Filter posts that share any categories.title and sub_categories.title with selectedPost
        // Exclude the selected post from the filtered list
        const filteredPosts = fetchedPosts.filter(
          (fetchedPost) =>
            // Kiểm tra categories.title
            fetchedPost.categories?.some((fetchedCategory) =>
              post.categories.some(
                (selectedCategory) =>
                  selectedCategory.title === fetchedCategory.title
              )
            ) &&
            // Kiểm tra sub_categories.title
            fetchedPost.sub_categories?.some((fetchedSubCategory) =>
              post.sub_categories.some(
                (selectedSubCategory) =>
                  selectedSubCategory.title === fetchedSubCategory.title
              )
            ) &&
            // Loại trừ bài viết đã chọn
            fetchedPost.slug.current !== post.slug.current
        );

        console.log(
          "Danh sách các bài đăng cùng categories và sub_categories (không bao gồm bài đã chọn):",
          filteredPosts
        );

        setPosts(filteredPosts);
      } catch (err: unknown) {
        // Cast `err` to `any` or `Error` to access its properties
        if (err instanceof Error) {
          console.error("Lỗi khi fetch data:", err.message);
        } else {
          console.error("Lỗi khi fetch data:", err);
        }
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
            GÓI CƯỚC{" "}
            <span className="text-[#CE2127]"> {selectedPost.title}</span>
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
          <div className="block md:hidden z-9">
            <div className="fixed bottom-0 left-0 w-full bg-white px-4 pt-4 pb-5 flex justify-between items-center shadow-top">
              <span className="text-xl font-semibold">
                {selectedPost.price}
                <span className="text-sm font-normal">
                  /{selectedPost.time}
                </span>
              </span>
              <SmsButton
                postTitle={selectedPost.title}
                globalField={selectedPost.globalField}
              />
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
          <PortableText
            value={selectedPost.body}
            components={PortableTextComponents}
          />
        </div>

        {/* Display Similar Posts */}
        <div className="max-content pb-16">
          <h1 className="uppercase md:px-0 font-bold text-[36px] leading-[80px] max-md:max-w-full max-md:text-2xl max-md:leading-[36px]">
            <span className=" text-[#141718]">Gói Cước Tương Tự</span>
          </h1>

          <div className="hidden md:grid xl:grid-cols-4 md:grid-cols-2 -m-4 z-1 mt-2">
            {posts
              .sort((a, b) => {
                // Sắp xếp theo _createdAt (giả sử _createdAt là trường ngày tạo của bài viết)
                return (
                  new Date(b._createdAt).getTime() -
                  new Date(a._createdAt).getTime()
                ); // Sắp xếp giảm dần
              })
              .slice(0, 4)
              .map((post) => (
                <div key={post.slug.current}>
                  <div className="p-4 w-full">
                    <div className="min-h-[370px] justify-between items-center p-6 rounded-[40px] flex flex-col relative bg-white light-pink-shadow my-2 mx-[2px]">
                      <div className="bg-[#CE2127] text-white px-3 py-1 text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b-[15px]">
                        {post.title}
                      </div>

                      <h1 className="mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                        <span className="text-[#CE2127]">{post?.traffic}</span>
                        <span className="text-lg ml-1 font-semibold text-gray-900">
                          /NGÀY
                        </span>
                      </h1>

                      {post?.gallery?.length > 0 && (
                        <>
                          <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                            MIỄN PHÍ
                          </h2>

                          <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                            {post.gallery.map((image: Image) => (
                              <div key={image.asset._id}>
                                <Image
                                  src={image.asset.url}
                                  alt={image.caption || "Gallery Image"}
                                  width={30}
                                  height={30}
                                  style={{ objectFit: "cover" }}
                                />
                                {image.caption && <p>{image.caption}</p>}
                              </div>
                            ))}
                          </span>
                        </>
                      )}

                      <h2 className="mt-4 font-bold text-gray-900 leading-none flex items-end pb-4 mb-4">
                        <span className="text-3xl text-gray-900">
                          {post?.price}
                        </span>
                        <span className="text-base ml-1 font-semibold text-gray-900 uppercase">
                          /{post?.time}
                        </span>
                      </h2>

                      <div className="flex gap-[22px]">
                        <button
                          onClick={() => handleOpenPopup(post)}
                          className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold"
                        >
                          Đăng ký
                        </button>
                        <a href={`/package/${post?.slug.current}`}>
                          <button className="min-w-[100px] flex justify-center items-center gap-1 text-center text-[#CE2127] bg-[#FFFFFF] border-[#CE2127] border-[1px] py-2 focus:outline-none hover:bg-gray-100 rounded-[25px] font-semibold">
                            Chi tiết
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="block md:hidden overflow-x-hidden z-0">
            <Swiper
              spaceBetween={8}
              slidesPerView={2.2}
              autoplay={{ delay: 100 }}
              freeMode={true}
              className="mySwiper"
            >
              {posts
                .sort((a, b) => {
                  // Sort by _createdAt (descending)
                  return (
                    new Date(b._createdAt).getTime() -
                    new Date(a._createdAt).getTime()
                  );
                })
                .slice(0, 4) // Only show 4 latest posts
                .map((post) => (
                  <SwiperSlide
                    key={post.slug.current}
                    className="flex justify-center items-center"
                  >
                    <div className="w-full">
                      <div className="min-h-[265px] justify-between items-center h-full p-4 rounded-[40px] flex flex-col relative bg-white light-pink-shadow my-2 mx-[2px]">
                        {/* Post Title */}
                        <a href={`/package/${post?.slug.current}`}>
                          <span className="bg-[#CE2127] text-white px-3 py-1 text-sm font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b-[15px]">
                            {post?.title}
                          </span>
                        </a>
                        {/* Traffic and Free info */}
                        <h1 className="mt-6 text-lg font-bold text-gray-900 leading-none flex items-end pb-2 mb-2 border-b border-gray-200">
                          <span className="text-[#CE2127] mb-1">
                            {post?.traffic}
                          </span>
                          <span className="text-base ml-1 font-semibold text-gray-900">
                            /NGÀY
                          </span>
                        </h1>
                        {post?.gallery?.length > 0 && (
                          <>
                            <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                              MIỄN PHÍ
                            </h2>
                            <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                              {post.gallery.map((image) => (
                                <div key={image.asset._id}>
                                  <Image
                                    src={image.asset.url}
                                    alt={image.caption || "Gallery Image"}
                                    width={30}
                                    height={30}
                                    style={{ objectFit: "cover" }}
                                  />
                                  {image.caption && <p>{image.caption}</p>}
                                </div>
                              ))}
                            </span>
                          </>
                        )}
                        {/* Price and Time */}
                        <h2 className="mt-2 font-bold text-gray-900 leading-none flex items-end pb-1 mb-2 border-b border-gray-200">
                          <span className="text-lg text-gray-900">
                            {post?.price}
                          </span>
                          <span className="text-sm ml-1 mb-1 font-semibold text-gray-900">
                            /{post?.time}
                          </span>
                        </h2>
                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          {/* Register Button */}
                          <button
                            className="text-sm flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-4 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold"
                            onClick={() => {
                              const phoneNumber = "290";
                              const message = encodeURIComponent(
                                `${post.title} ${post.globalField}`
                              );
                              window.location.href = `sms:${phoneNumber}?body=${message}`;
                            }}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
