// File: components/SmsButton.tsx
'use client';

interface SmsButtonProps {
  postTitle: string;      // Tiêu đề bài viết
  globalField: string;    // Trường bổ sung
}

export default function SmsButton({ postTitle, globalField }: SmsButtonProps) {
  return (
    <button
      className="text-sm flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-4 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-normal"
      onClick={() => {
        const phoneNumber = "290"; 
        const message = encodeURIComponent(`${postTitle} ${globalField}`); 
        window.location.href = `sms:${phoneNumber}?body=${message}`; 
      }}
    >
      Đăng ký
    </button>
  );
}
