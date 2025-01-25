"use client";

import LinkButton from "./components/LinkButton";
import { useUser } from "./context/UserContext";
import { changeUrlParams } from "./common/functions/changeParams";
import { useEffect, useState } from "react";
import OpenNavbarButton from "./components/OpenNavbarButton";
import { useNavbar } from "../hooks/useNavbar";
import { formatTimeWithSeconds } from "./common/functions/formatTime";

// the dashboard page if user is logged in, otherwise the landing/home page
export default function Home() {
  const { session } = useUser();
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

  useEffect(() => {
    if (!session) {
      changeUrlParams({ params: "isNavbarOpen", value: null });
    }
  }, [session]);

  return (
    <>
      {!session ? (
        <div className="italic select-none flex flex-col items-center justify-center h-screen w-fit gap-8 transition-all duration-200 mx-auto text-text-dark dark:text-text-light relative z-10">
          <p className="text-6xl font-bold font-montserrat drop-shadow-lg shadow-black text-center">
            Omni
          </p>
          <p className="text-xl font-montserrat drop-shadow-lg shadow-black text-center">
            An (under construction) app for many things
          </p>
          <div className="flex justify-center gap-24 w-full">
            <LinkButton color="black" text="Log in" href="/login" />
            <LinkButton color="black" text="Sign up" href="/signup" />
          </div>
        </div>
      ) : (
        <div className="flex w-full px-24 sm:px-40 h-20 border-b-[1px] border-b-black mx-auto justify-center sm:justify-between items-center">
          {!isNavbarOpen ? <OpenNavbarButton /> : null}
          <p className="text-dark dark:text-light text-xl lg:text-3xl font-bold select-none hidden md:block">
            Dashboard
          </p>
          <p className="text-dark dark:text-light text-xl lg:text-3xl font-lato select-none">
            {formattedDate}
          </p>
          <p className="transition-all h-12 items-center justify-center duration-200 text-xl lg:text-3xl py-2 sm:flex hidden w-32 lg:w-40 text-center bg-slate-200 text-purple-600 dark:bg-slate-800 rounded-md dark:text-green-500 font-montserrat select-none">
            {currentTime}
          </p>
        </div>
      )}
    </>
  );
}
