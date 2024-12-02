"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import tv360 from "@public/assets/img/tv360.svg";
import mybox from "@public/assets/img/mybox.svg";

export default function DATA_MOTNTH() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  return (
    <div className="max-content px-5 md:px-0 py-16 md:py-20">
      <h1 className="uppercase  md:px-0 font-bold text-[45px] leading-[80px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
        <span className=" text-[#141718]">Gói Cước</span>
        <span className=" text-[#CE2127]"> Data 4G 5G</span>
        <span className=" text-[#141718]"> Viettel tháng</span>
      </h1>
      <div className="hidden md:block gap-4 mt-10 w-full">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="grid xl:grid-cols-4 md:grid-cols-2 -m-4 ">
            <div className="p-4 w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  ADG
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button
                  onClick={handleOpenPopup}
                  className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold"
                >
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="p-4 w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="p-4 w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="p-4  w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Swiper chỉ xuất hiện trên mobile (max-width: 768px) */}
      <div className="block md:hidden mt-8">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.5}
          // loop={true}
          autoplay={{ delay: 2500 }}
          className="mySwiper"
        >
          <SwiperSlide className="flex justify-center items-center ">
            <div className=" w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center ">
            <div className=" w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center ">
            <div className=" w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                  Đăng ký
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center ">
            <div className="w-full">
              <div className=" items-center  h-full p-6 rounded-lg border-2 border-[#CE2127] flex flex-col relative overflow-hidden">
                <span className="bg-[#CE2127] text-white px-3 py-1  text-2xl font-bold tracking-tight absolute right-[50%] translate-x-1/2 top-0 rounded-b">
                  5G135
                </span>
                <h1 className=" mt-10 text-4xl font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-[#CE2127]">4GB</span>
                  <span className="text-lg ml-1 font-semibold text-gray-900">
                    /NGÀY
                  </span>
                </h1>
                <h2 className="text-base tracking-widest title-font mb-1 font-medium">
                  MIỄN PHÍ
                </h2>
                <span className="mt-2 flex gap-2 bg-white border-[1px] border-solid border-gray-200 text-white px-4 py-2 text-2xl font-bold tracking-tight rounded-full">
                  <Image src={tv360} alt="tv360" width={30} />
                  <Image src={mybox} alt="mybox" width={30} />
                </span>
                <h2 className=" mt-4  font-bold text-gray-900 leading-none flex items-end pb-4 mb-4 border-b border-gray-200">
                  <span className="text-3xl text-gray-900">135.000đ</span>
                  <span className="text-base ml-1 font-semibold text-gray-900">
                    /THÁNG
                  </span>
                </h2>
                <button
                  onClick={() => {
                    window.location.href =
                      "sms:+84123456789?body=Nội dung tin nhắn";
                  }}
                  className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 px-5 flex items-center justify-center bg-black bg-opacity-50">
          {/* Overlay */}
          <div className="absolute inset-0 "></div>
          {/* Popup Content */}
          <div className="relative z-10 bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Thông báo</h2>
            <span className="mb-4">
              Để đăng ký gói cước, vui lòng soạn tin nhắn trên điện thoại theo
              cú pháp
              <span className="text-[#CE2127]"> ADG</span> gửi{" "}
              <span className="text-[#CE2127]">290</span>. Để xem các thuê bao
              áp dụng gói cước trên, vui lòng kiểm tra tại link dưới.
            </span>

            <div className="flex justify-center gap-6 mt-6 text-center items-center">
              <button
                onClick={handleClosePopup}
                className="min-w-[120px] flex justify-center items-center gap-1 text-center text-[#CE2127] bg-[#FFFFFF] border-[#CE2127] border-[1px] py-2 focus:outline-none hover:bg-gray-100 rounded font-semibold"
              >
                Đóng
              </button>
              <button className="min-w-[120px] flex justify-center items-center gap-1 text-white bg-[#CE2127] border-0 py-[8.5px] px-6 focus:outline-none hover:bg-[#AA0000] rounded font-semibold">
                Kiểm tra ngay
              </button>
            </div>

            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500  hover:text-black"
            >
              <FontAwesomeIcon icon={faXmark} width={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
