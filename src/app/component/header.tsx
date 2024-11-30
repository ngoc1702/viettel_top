import React from "react";
import Link from 'next/link'
import Image from "next/image";
import logo from "@public/assets/img/logo.png";

export default function Header() {
  return (
    <div className="  box-shadow-basic text-gray-600 body-font">
      <div className="container max-content mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
          <Image src={logo} alt="Logo" width={170} />
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg font-medium justify-center">
          <Link href="/" className="mr-12 hover:text-gray-900 cursor-pointer">Trang chủ</Link>
          <Link href="/news" className="mr-5 hover:text-gray-900 cursor-pointer">Tin tức</Link>
        </nav>
        <button className=" inline-flex items-center bg-[#CE2127] text-white border-0 py-3 px-6 focus:outline-none hover:bg-[#AA0000] rounded text-base mt-4 md:mt-0">
          Nhận Tư Vấn
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
