import Image from "next/image";
import Facebook from "/public/img/Social Icons.png";
import Discord from "/public/img/Discord.png"
export default function Footer() {
  return (
    <footer>
      <div className="bg-[#FFF0E3] text-center p-[10px] fixed bottom-0 w-full flex flex-row justify-center items-center gap-[90px]">
        <p>ติดต่อเราได้ที่</p>
        <div className="w-[2px] h-[20px] bg-black"></div>
        <div className="flex items-center">
          <Image src={Facebook} alt="facebook" className="w-[30px] h-[30px] mr-[10px]" />
          <a href="https://www.google.co.th/?hl=th">Weather Friendly</a>
        </div>
        <div className="flex items-center">
          <Image src={Discord} alt="discord" className="w-[30px] h-[30px] mr-[10px]" />
          <a href="https://www.google.co.th/?hl=th">Weather Friendly Commu</a>
        </div>
        <div className="w-[2px] h-[20px] bg-black"></div>
        <p><a href="https://www.google.co.th/?hl=th">ความเป็นส่วนตัว</a></p>
        <p><a href="https://www.google.co.th/?hl=th">ข้อกำหนดการใช้งาน</a></p>


      </div>
    </footer>

  );
}
