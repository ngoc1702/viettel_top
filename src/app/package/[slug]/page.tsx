"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

const POSTS_QUERY2 = `*[_type == "package"]{
  _id,
  title,
  slug,
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
    "globalField": *[_type == "global"][0].globalField
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
  timeTraffic :string;
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
      timeTraffic,
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

export default function Page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Await params to resolve and get 'id' and 'slug'
        const resolvedParams = await params;
        const { slug } = resolvedParams;

        // Fetch specific post
        const post = await fetchPost(slug);
        setSelectedPost(post);

        if (!post || !post.categories || !post.sub_categories) {
          setPosts([]);
          return;
        }

        // Fetch all posts
        const fetchedPosts = await client.fetch<Post[]>(POSTS_QUERY2);

        // Filter posts based on categories and sub-categories
        const filteredPosts = fetchedPosts.filter(
          (fetchedPost) =>
            fetchedPost.categories?.some((fetchedCategory) =>
              post.categories.some(
                (selectedCategory) =>
                  selectedCategory.title === fetchedCategory.title
              )
            ) &&
            fetchedPost.sub_categories?.some((fetchedSubCategory) =>
              post.sub_categories.some(
                (selectedSubCategory) =>
                  selectedSubCategory.title === fetchedSubCategory.title
              )
            ) &&
            fetchedPost.slug.current !== post.slug.current
        );

        setPosts(filteredPosts);
      } catch (err) {
        console.error("Lỗi khi fetch data:", err);
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
  
  

  const handleOpenPopup = (post: Post) => {
    setSelectedPost(post);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    // setSelectedPost(null); // Uncomment if you want to reset selectedPost
  };

  return (
    <div className="max-content px-3">
      <div className="relative">
        <title>{`Gói cước ${selectedPost.title}`}</title>

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
                    {selectedPost.traffic} 
                    {selectedPost?.timeTraffic && (
                    <span className="text-gray-900 text-base md:text-base font-bold mt-1">/ {selectedPost.timeTraffic}</span>
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
                    {selectedPost.title} {selectedPost.globalField}
                    <span className="text-base text-[#CE2127]"> gửi 290</span>
                  </span>
                </button>
              </a>
            </div>
          </div>
          <div className="block md:hidden ">
            <div className="z-10 fixed bottom-0 left-0 w-full bg-white px-4 pt-4 pb-5 flex justify-between items-center shadow-top">
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
        <div className="mb-8 max-content mt-6">
          <PortableText
            value={selectedPost.body}
            components={PortableTextComponents}
          />
        </div>

        <div className="mb-10 max-content ">
          <button
            onClick={() => handleOpenPopup(selectedPost!)} // Sử dụng selectedPost để mở popup
            className="hidden md:flex  gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-3 px-12 focus:outline-none hover:bg-[#AA0000] rounded-[5px] font-semibold"
          >
            Đăng ký
          </button>

          <button
                            className="text-sm flex md:hidden gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-3 px-12 focus:outline-none hover:bg-[#AA0000] rounded-[5px] font-semibold"
                            onClick={() => {
                              const phoneNumber = "290";
                              const message = encodeURIComponent(
                                `${selectedPost.title} ${selectedPost.globalField}`
                              );
                              window.location.href = `sms:${phoneNumber}?body=${message}`;
                            }}
                          >
                            Đăng ký
                          </button>
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
                        {post?.timeTraffic && (
                                          <span className="text-lg ml-1 font-semibold text-gray-900">
                                            / {post.timeTraffic}
                                          </span>
                                        )}
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

          <div className="block md:hidden overflow-x-hidden mt-4 z-0">
            <Swiper
              spaceBetween={8}
              slidesPerView={2.2}
              autoplay={{ delay: 100 }}
              freeMode= {true}
              modules={[FreeMode]}
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
                    style={{ width: "100%" }}
                    key={post.slug.current}
                    className="flex justify-center items-center w-[100%]"
                  >
                    <div className="w-full">
                      <div className=" min-w-[170px] min-h-[275px] justify-between items-center h-full p-4 rounded-[40px] flex flex-col relative bg-white light-pink-shadow my-2 mx-[2px]">
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
                          {post?.timeTraffic && (
                                                <span className="text-base ml-1 font-semibold text-gray-900">
                                                  / {post?.timeTraffic}
                                                </span>
                                                )}
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

          {isPopupVisible && selectedPost && (
            <div className="fixed inset-0 z-50 px-5 flex items-center justify-center bg-black bg-opacity-50">
              <div className="absolute inset-0 "></div>
              <div className="relative z-10 bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Thông báo
                </h2>
                <span className="mb-4">
                  Để đăng ký gói cước, vui lòng soạn tin nhắn trên điện thoại
                  theo cú pháp
                  <span className="text-[#CE2127]">
                    {" "}
                    {selectedPost?.title} {selectedPost?.globalField}
                  </span>{" "}
                  gửi <span className="text-[#CE2127]">290</span>. Để xem các
                  thuê bao áp dụng gói cước trên, vui lòng kiểm tra tại link
                  dưới.
                </span>
                <div className="flex justify-center gap-6 mt-6 text-center items-center">
                  <button
                    onClick={handleClosePopup}
                    className="min-w-[120px] flex justify-center items-center gap-1 text-center text-[#CE2127] bg-[#FFFFFF] border-[#CE2127] border-[1px] py-2 focus:outline-none hover:bg-gray-100 rounded-[25px] font-semibold"
                  >
                    Đóng
                  </button>
                  <a href="https://viettel.vn/lan-toa/goi-cuoc?kh=VANLTH_HNI_HKD">
                    <button className="min-w-[120px] flex justify-center items-center gap-1 text-white bg-[#CE2127] border-0 py-[8.5px] px-6 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold">
                      Kiểm tra ngay
                    </button>
                  </a>
                </div>

                <button
                  onClick={handleClosePopup}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                  <FontAwesomeIcon icon={faXmark} width={12} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
