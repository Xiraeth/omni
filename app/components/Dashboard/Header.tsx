import { useNavbar } from "@/hooks/useNavbar";
import OpenNavbarButton from "../OpenNavbarButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { formatTimeWithSeconds } from "@/app/common/functions/formatTime";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isNavbarOpen = useNavbar();

  const [currentTime, setCurrentTime] = useState<string>("");
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  });

  useEffect(() => {
    setCurrentTime(formatTimeWithSeconds(new Date()));

    const timer = setInterval(() => {
      setCurrentTime(formatTimeWithSeconds(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full px-24 sm:pl-40 sm:pr-8 h-20 border-b-[1px] border-b-black mx-auto justify-center sm:justify-between items-center">
      {!isNavbarOpen ? <OpenNavbarButton /> : null}
      <p className="text-dark dark:text-light text-xl lg:text-3xl font-bold select-none hidden md:block">
        {formattedDate}
      </p>
      <p className="text-dark dark:text-light text-xl lg:text-3xl font-lato select-none">
        Welcome back, {user?.username}
      </p>
      <p className="transition-all h-12 items-center justify-center duration-200 text-xl lg:text-3xl py-2 sm:flex hidden w-32 lg:w-40 text-center bg-slate-200 text-purple-600 dark:bg-slate-800 rounded-md dark:text-green-500 font-montserrat select-none">
        {currentTime}
      </p>
    </div>
  );
};

export default Header;
