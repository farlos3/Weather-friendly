import Image from "next/image";
import Facebook from "/public/img/Social Icons.png";
import Discord from "/public/img/Discord.png";
export default function Footer() {
  return (
    <footer>
      <div className=" flex bg-[#FFF0E3] text-center p-3 w-full h-max items-center justify-around ">
        <p>ติดต่อเราได้ที่</p>
        <div className="flex w-[0.2rem] h-[2rem] bg-black"></div>
        <div className="flex gap-x-4 items-center">
          <Image
            src={Facebook}
            alt="facebook"
            className="w-[2rem] h-[2rem] "
          />
          <a href="https://www.google.co.th/?hl=th">Weather Friendly</a>
        </div>
        <div className="flex gap-x-4 items-center">
          <Image
            src={Discord}
            alt="discord"
            className="w-[2rem] h-[2rem]"
          />
          <a href="https://www.google.co.th/?hl=th">Weather Friendly Commu</a>
        </div>
        <div className="w-[0.2rem] h-[2rem] bg-black"></div>
        <p>
          <a href="https://www.google.co.th/?hl=th">ความเป็นส่วนตัว</a>
        </p>
        <p>
          <a href="https://www.google.co.th/?hl=th">ข้อกำหนดการใช้งาน</a>
        </p>
      </div>
    </footer>
  );
}
