import Background from "@public/assets/img/bg.png";
import Image from "next/image";
import MESH_WIFI from "../component/meshwifi";
export default function Page() {
    return (
        <>
        <div className="relative w-full h-[400px] rounded-full overflow-hidden">
  <Image
    src={Background}
    alt="bg"
    fill
    className="object-cover object-center z-0"
    priority
  />
  <div className=" absolute top-50% left-1/2 right-1/2 z-10 text-white p-4">
    <h1 className="text-3xl font-bold text-white ">Đăng ký Internet cho
    ngôi nhà của bạn</h1>
  </div>
  
</div>
<MESH_WIFI/>

        </>
    );
}