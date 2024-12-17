"use client";

import LinkButton from "./components/LinkButton";
import { useUser } from "./context/UserContext";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUrlParams } from "./common/functions/changeParams";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { session } = useUser();
  const [currentTime, setCurrentTime] = useState<string>("");

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  });

  const formatTimeWithSeconds = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    setCurrentTime(formatTimeWithSeconds(new Date()));

    const timer = setInterval(() => {
      setCurrentTime(formatTimeWithSeconds(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const searchParams = useSearchParams();
  const isNavbarOpen = searchParams.get("isNavbarOpen") === "true";

  const onOpenClick = () => {
    changeUrlParams({ params: "isNavbarOpen", value: "true" });
  };

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
            An app for many things
          </p>
          <div className="flex justify-center gap-24 w-full">
            <LinkButton color="black" text="Log in" href="/login" />
            <LinkButton color="black" text="Sign up" href="/signup" />
          </div>
        </div>
      ) : (
        <div className="flex w-full px-40 h-20 border-b-[1px] border-b-black mx-auto justify-between items-center">
          {!isNavbarOpen ? (
            <div
              onClick={onOpenClick}
              className="fixed top-[22px] left-4 w-8 h-8 flex hover:bg-slate-200 items-center justify-center transition-all duration-200 active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400 cursor-pointer rounded-full"
            >
              <FontAwesomeIcon
                icon={faAnglesRight}
                className="w-4 h-4 text-dark dark:text-light"
              />
            </div>
          ) : null}
          <p className="text-dark dark:text-light text-3xl font-bold select-none">
            Dashboard
          </p>
          <p className="text-dark dark:text-light text-3xl font-lato select-none">
            {formattedDate}
          </p>
          <p className="transition-all h-12 flex items-center justify-center duration-200 text-3xl py-2 w-40 text-center bg-slate-300 text-purple-600 dark:bg-slate-800 rounded-md dark:text-green-500 font-montserrat select-none">
            {currentTime}
          </p>
        </div>
      )}
    </>
  );
}
