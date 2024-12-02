// "use client";
// import { client } from "./(sanity)/lib/client";
import React, { useState, useEffect } from "react";
// import { POSTS_QUERY } from "./(sanity)/lib/queries";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { client } from "../(sanity)/lib/client";
import { POSTS_QUERY2 } from "../(sanity)/lib/queries";
import Image from "next/image";
import tv360 from "@public/assets/img/tv360.svg";
import mybox from "@public/assets/img/mybox.svg";


export default async function Package_Data() {
    const packages = await client.fetch(POSTS_QUERY2);
    console.log(packages, "PACKAGEEEEEE");
  

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

                {/* {packages.map((package:any) => (
                <div key={package._id}>
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
                // onClick={handleOpenPopup}
                className="flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-6  focus:outline-none hover:bg-[#AA0000] rounded font-semibold"
              >
                Đăng ký
              </button>
            </div>
          </div>
          </div>
          ))} */}
        </div>
      </section>
    </div>
    </div>
  )
}
