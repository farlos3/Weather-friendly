"use client";

import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Auth/login");
  };

  return (
    <div className="flex space-x-2 z-10 items-center flex justify-end border w-max h-max mr-[1rem]">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded h-10"
        onClick={handleLogin}
      />
    </div>
  );
}