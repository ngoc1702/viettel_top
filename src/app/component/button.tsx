// File: components/SmsButton.tsx
'use client';

interface SmsButtonProps {
  postTitle: string;    
  globalField: string;  // Added globalField as a prop
}

export default function SmsButton({ postTitle, globalField }: SmsButtonProps) {
  const handleClick = () => {
    const phoneNumber = "290";  // The phone number to send the message to
    const message = encodeURIComponent(`${postTitle} ${globalField}`);  // Include both postTitle and globalField in the message
    window.location.href = `sms:${phoneNumber}?body=${message}`;  // Opens the SMS app with the message
  };

  return (
    <button
      className="text-sm flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-4 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-semibold"
      onClick={handleClick}  
    >
      Đăng ký
    </button>
  );
}