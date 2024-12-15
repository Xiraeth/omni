"use client";

import LinkButton from "./components/LinkButton";
import { useUser } from "./context/UserContext";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeUrlParams } from "./common/functions/changeParams";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { session } = useUser();

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
        <div className="select-none flex flex-col items-center justify-center h-screen w-fit gap-8 transition-all duration-200 mx-auto text-text-dark dark:text-text-light relative z-10">
          {!isNavbarOpen ? (
            <div className="fixed top-4 left-4">
              <FontAwesomeIcon
                onClick={onOpenClick}
                icon={faAnglesRight}
                className="text-lg width-[20px] height-[20px] text-dark p-2 flex items-center justify-center hover:bg-slate-200 rounded-full transition-all duration-200 cursor-pointer active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400"
              />
            </div>
          ) : null}

          <h1 className="text-6xl font-bold font-montserrat drop-shadow-lg shadow-black text-center text-violet-600 dark:text-red-500">
            Welcome back, <i>Master</i>
          </h1>
        </div>
      )}
    </>
  );
}
