'use client'
import React,  { createContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import banner1 from "@public/assets/img/Banner1.jpg";
import banner2 from "@public/assets/img/Banner2.webp";

export default function Banner() {
  return (
    <div className="slider-container mt-[1px]">
    <Swiper
      spaceBetween={50} 
      slidesPerView={1} 
      loop={true} // loop the slides
      autoplay={{
        delay: 3000, // 3 seconds delay
        disableOnInteraction: false, // Continue autoplay after interaction
      }}
    >
      <SwiperSlide>
        <Image src={banner1} alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={banner2} alt="Slide 1" />
      </SwiperSlide>
    </Swiper>
  </div>
  )
}
