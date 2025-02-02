"use client";

import { useUser } from "./context/UserContext";
import { changeUrlParams } from "./common/functions/changeParams";
import { useEffect, useState } from "react";
import OpenNavbarButton from "./components/OpenNavbarButton";
import { useNavbar } from "../hooks/useNavbar";
import { formatTimeWithSeconds } from "./common/functions/formatTime";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CustomLoader from "./components/CustomLoader";

// the dashboard page if user is logged in, otherwise the landing/home page
export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const isNavbarOpen = useNavbar();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (!user) {
      changeUrlParams({ params: "isNavbarOpen", value: null });
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : !user ? (
        <div className="italic select-none flex flex-col items-center justify-center h-screen w-fit gap-4 lg:gap-8 transition-all duration-200 mx-auto text-text-dark dark:text-text-light relative z-10">
          <p className="text-3xl lg:text-6xl font-bold font-montserrat drop-shadow-lg shadow-black text-center">
            Omni
          </p>
          <p className="text-base lg:text-xl font-montserrat px-8 drop-shadow-lg shadow-black text-center">
            An (under construction) app for many things
          </p>
          <div className="flex justify-center gap-6 lg:gap-12 w-full">
            <Button
              variant="outline"
              onClick={() => {
                setIsLoading(true);
                router.push("/login");
                setIsLoading(false);
              }}
              className="text-sm lg:text-base px-4 py-1"
            >
              Log in
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsLoading(true);
                router.push("/signup");
                setIsLoading(false);
              }}
              className="text-sm lg:text-base px-4 py-1"
            >
              Sign up
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full px-24 sm:pl-40 sm:pr-8 h-20 border-b-[1px] border-b-black mx-auto justify-center sm:justify-between items-center">
          {!isNavbarOpen ? <OpenNavbarButton /> : null}
          <p className="text-dark dark:text-light text-xl lg:text-3xl font-bold select-none hidden md:block">
            {formattedDate}
          </p>
          <p className="text-dark dark:text-light text-xl lg:text-3xl font-lato select-none">
            Welcome back, {user.username}
          </p>
          <p className="transition-all h-12 items-center justify-center duration-200 text-xl lg:text-3xl py-2 sm:flex hidden w-32 lg:w-40 text-center bg-slate-200 text-purple-600 dark:bg-slate-800 rounded-md dark:text-green-500 font-montserrat select-none">
            {currentTime}
          </p>
        </div>
      )}
    </>
  );
}
