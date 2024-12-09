"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { client } from "../(sanity)/lib/client";
import { POSTS_QUERY2 } from "../(sanity)/lib/queries";
import Image from "next/image";
import tv360 from "@public/assets/img/tv360.svg";
import mybox from "@public/assets/img/mybox.svg";

export default function DATA_MORE() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null); // State for selected post

  const handleOpenPopup = (post: any) => {
    setSelectedPost(post); // Set the selected post
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedPost(null); // Reset selected post when closing the popup
  };

  const [isContentVisible, setIsContentVisible] = useState(true);

  // Hàm xử lý khi bấm nút
  const toggleContent = () => {
    setIsContentVisible((prev) => !prev);
  };

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await client.fetch(POSTS_QUERY2);

        if (!posts) {
          throw new Error("Failed to fetch posts");
        }
        setPosts(posts);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const subCategoryTitles = [
    ...new Set(
      posts.flatMap((post: any) =>
        post.sub_categories?.map((sub_category: any) => sub_category.title)
      )
    ),
  ];
  return (
    <div className="max-content px-5 md:px-0 py-16 md:py-20 z-1">
      <div className="flex justify-between items-center">
        <h1 className="uppercase md:px-0 font-bold text-[45px] leading-[80px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
          <span className=" text-[#141718]">Gói Cước</span>
          <span className=" text-[#CE2127]"> Data 4G 5G</span>
          <span className=" text-[#141718]"> Viettel Khác</span>
        </h1>
        <button
          onClick={toggleContent}
          className="md:w-12 md:h-12   md:bg-gray-200  rounded-full items-center"
        >
          {isContentVisible ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </button>
      </div>
      {isContentVisible && (
        <div className="content  hidden md:block gap-4  w-full ">
          <section className="text-gray-600 body-font overflow-hidden">
            <div>
              {subCategoryTitles.map((title) => {
                const filteredPosts = posts.filter(
                  (post) =>
                    post.categories?.some(
                      (category: any) => category.title === "Khác"
                    ) &&
                    post.sub_categories?.some(
                      (sub_category: any) => sub_category.title === title
                    )
                );

                return (
                  <div className="mt-6" key={title}>
                   
                    {/* Tên sub_category.title */}
                    {filteredPosts.map((post: any) => (
                      <div>
                         <h3 className="uppercase font-semibold text-neutral-500 md:px-0 text-[32px] leading-[80px] max-md:max-w-full max-md:text-[24px] max-md:leading-[50px]">
                      Gói cước {title}
                    </h3>
                      <div className="grid xl:grid-cols-4 md:grid-cols-2 -m-4 z-1">
                        <div key={post._id}>
                          <div className="p-4 w-full ">
                            <div className="items-center h-full p-6 rounded-[40px] flex flex-col relative bg-white light-pink-shadow my-2 mx-[2px]">
                              <span className="bg-[#CE2127] text-white px-3 py-1 text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b-[15px]">
                                {post.title}
                              </span>
                              <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                                <span className="text-[#CE2127]">
                                  {post?.traffic}
                                </span>
                                <span className="text-lg ml-1 font-semibold text-gray-900">
                                  /NGÀY
                                </span>
                              </h1>
                              <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                                MIỄN PHÍ
                              </h2>

                              <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                                {post?.gallery?.map((image: any) => (
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

                              {/* <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                            <Image src={tv360} alt="tv360" width={30} />
                            <Image src={mybox} alt="mybox" width={30} />
                          </span> */}
                              <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                                <span className="text-3xl text-gray-900">
                                  {post?.price}
                                </span>
                                <span className="text-base ml-1 font-semibold text-gray-900 uppercase">
                                  /{post?.time}
                                </span>
                              </h2>
                              <div className="flex gap-6">
                                <button
                                  onClick={() => handleOpenPopup(post)}
                                  className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold"
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
                      </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
      {/* Swiper mobile */}
      {isContentVisible && (
        <div className="content block md:hidden mt-8">
          {subCategoryTitles.map((title) => {
            const filteredPosts = posts.filter(
              (post) =>
                post.categories?.some(
                  (category: any) => category.title === "Khác"
                ) &&
                post.sub_categories?.some(
                  (sub_category: any) => sub_category.title === title
                )
            );
            return (
              <div className="mt-6" key={title}>
                {/* Tên sub_category.title */}

                {filteredPosts.map((post: any) => (
                  <div>
                    <h3 className="uppercase font-semibold text-neutral-500 md:px-0 text-[32px] leading-[80px] max-md:max-w-full max-md:text-[24px] max-md:leading-[50px]">
                    Gói cước {title}
                  </h3>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    // loop={true}
                    autoplay={{ delay: 2500 }}
                    className="mySwiper"
                  >
                    <SwiperSlide className="flex justify-center items-center ">
                      <div>
                      
                        <div className=" w-full">
                          <div className="items-center h-full p-4 rounded-[40px] flex flex-col relative bg-white light-pink-shadow my-2 mx-[2px]">
                            <span className="bg-[#CE2127] text-white px-3 py-1 text-sm font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b-[15px]">
                              {post?.title}
                            </span>
                            <h1 className=" mt-6  text-lg font-bold text-gray-900 leading-none flex items-end pb-2 mb-2 border-b border-gray-200">
                              <span className="text-[#CE2127] mb-1">
                                {post?.traffic}
                              </span>
                              <span className="text-base ml-1 font-semibold text-gray-900">
                                /NGÀY
                              </span>
                            </h1>
                            <h2 className="text-sm tracking-widest title-font  font-medium">
                              MIỄN PHÍ
                            </h2>
                            <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                              {post?.gallery?.map((image: any) => (
                                <div
                                  key={image.asset._id}
                                  className="gallery-item"
                                >
                                  <Image
                                    className="gallery-image"
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

                            <h2 className=" mt-2  font-bold text-gray-900 leading-none flex items-end pb-1 mb-2 border-b border-gray-200">
                              <span className="text-lg text-gray-900">
                                {post?.price}
                              </span>
                              <span className="text-sm ml-1 mb-1 font-semibold text-gray-900">
                                /{post?.time}
                              </span>
                            </h2>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => handleOpenPopup(post)}
                                className="text-sm flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-4  focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold"
                              >
                                Đăng ký
                              </button>
                              {/* <a href={`/package/${post?.slug.current}`}>
                            <button className="min-w-[100px] flex justify-center items-center gap-1 text-center text-[#CE2127] bg-[#FFFFFF] border-[#CE2127] border-[1px] py-2 focus:outline-none hover:bg-gray-100 rounded font-semibold">
                              Chi tiết
                            </button>
                          </a> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
      {/* Popup */}
      {isPopupVisible && selectedPost && (
        <div className="fixed inset-0 z-50 px-5 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute inset-0 "></div>
          <div className="relative z-10 bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Thông báo</h2>
            <span className="mb-4">
              Để đăng ký gói cước, vui lòng soạn tin nhắn trên điện thoại theo
              cú pháp
              <span className="text-[#CE2127]"> {selectedPost?.title}</span> gửi{" "}
              <span className="text-[#CE2127]">290</span>. Để xem các thuê bao
              áp dụng gói cước trên, vui lòng kiểm tra tại link dưới.
            </span>
            <div className="flex justify-center gap-6 mt-6 text-center items-center">
              <button
                onClick={handleClosePopup}
                className="min-w-[120px] flex justify-center items-center gap-1 text-center text-[#CE2127] bg-[#FFFFFF] border-[#CE2127] border-[1px] py-2 focus:outline-none hover:bg-gray-100 rounded-[25px] font-semibold"
              >
                Đóng
              </button>
              <a href="https://viettel.vn/lan-toa/goi-cuoc?kh=HNI1_TTHKM_VTP_00038_DB">
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
  );
}
