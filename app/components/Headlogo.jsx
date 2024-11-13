import Image from "next/image";
import logo from "/public/img/PartlyCloudy.png"

export default function Logoweb(){
      return(
        <>
        <div className="relative p-[15px] w-fit flex flex-row z-10">
            <Image src={logo} alt="logo" className="w-[60px] h-[60px] z-10"/>
            <h3 className="flex items-center m-[15px_0_0_15px] text-[24pt] font-bold z-10">Weather-Friendly</h3>
        </div>
        </>
      );
}