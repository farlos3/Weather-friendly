import Image from "next/image";
import logo from "/public/img/PartlyCloudy.png"

export default function Logoweb(){
      return(
        <>
        <div className="relative pt-0 w-fit flex flex-row items-center z-10 py-8">
            <Image src={logo} alt="logo" className="w-[60px] h-[60px] z-10"/>
            <h3 className="flex items-center text-[24pt] font-bold z-10">Weather-Friendly</h3>
        </div>
        </>
      );
}