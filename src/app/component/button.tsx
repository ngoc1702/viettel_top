'use client';

interface SmsButtonProps {
  postTitle: string; // Tiêu đề bài viết
  globalField: string | object; // This could be a string or object
}

export default function SmsButton({ postTitle, globalField }: SmsButtonProps) {
  // If globalField is an object, ensure to extract the string property or stringify it
  const globalFieldString = typeof globalField === 'object'
    ? JSON.stringify(globalField) // If it's an object, stringify it
    : globalField; // If it's already a string, use it directly

  // Logging values to the console
  console.log('Tiêu đề bài viết:', postTitle);
  console.log('Trường toàn cục:', globalFieldString); // Logging the stringified version of globalField

  return (
    <button
      className="text-sm flex gap-1 items-center mt-auto text-white bg-[#CE2127] border-0 py-2 px-4 focus:outline-none hover:bg-[#AA0000] rounded-[25px] font-normal"
      onClick={() => {
        const phoneNumber = "290";
        const message = encodeURIComponent(`${postTitle} ${globalFieldString}`); // Encoding both postTitle and globalField
        console.log('Encoded message:', message); // Log the encoded message
        window.location.href = `sms:${phoneNumber}?body=${message}`;
      }}
    >
      Đăng ký
    </button>
  );
}
