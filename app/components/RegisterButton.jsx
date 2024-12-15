"use client";

import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Auth/login");
  };

  return (
    <div className="flex space-x-2 z-10 items-center justify-end border w-max h-max">
      <img
        src="/img/Account-Icon.png"
        alt="Login"
        style={{ width: "8%", height: "auto" }}
        className="cursor-pointer hover:opacity-80"
        onClick={handleLogin}
      />
    </div>
  );
}