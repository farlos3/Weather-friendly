import Image from "next/image";
import logo from "/public/img/PartlyCloudy.png"

export default function Logoweb(){
      return(
        <>
        <div className="p-[15px] w-fit flex flex-row">
            <Image src={logo} alt="logo" className="w-[60px] h-[60px]"/>
            <h3 className="flex items-center m-[15px_0_0_15px] text-[24pt] font-bold">Weather-Friendly</h3>
        </div>
        </>
      );
}