import Image from "next/image";
import logo from "/public/img/PartlyCloudy.png"

export default function Logoweb(){
      return(
        <>
        <div className="relative pt-0 w-fit flex flex-row items-center z-10 h-max ">
            <Image src={logo} alt="logo" className="flex justify-center w-[5rem] h-auto z-10"/>
            <h3 className="flex items-center text-[2rem] font-bold z-10 ">Weather-Friendly</h3>
        </div>
        </>
      );
}