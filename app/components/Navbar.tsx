"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faArrowRightFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { changeUrlParams } from "../common/functions/changeParams";
import { useUser } from "../context/UserContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const { session } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isNavbarOpen = searchParams.get("isNavbarOpen") === "true";

  const closeNavbar = () => {
    changeUrlParams({ params: "isNavbarOpen", value: null });
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (!session) {
    return null;
  }

  return (
    <div
      className={`fixed left-0 bottom-0 -top-5 pt-10 pb-20 w-[150px] sm:w-[250px] z-10 
        ${isNavbarOpen ? "shadow-lg shadow-black" : "shadow-black shadow-sm"}
        text-dark dark:text-light bg-slate-300 dark:bg-slate-800 px-4 
        ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-[color, background-color, box-shadow, transform] duration-[200ms,500ms,500ms,500ms] z-50`}
    >
      <div className="flex items-center border-b-[1px] border-dark pb-2">
        <p className="text-base sm:text-2xl text-dark dark:text-light font-bold drop-shadow-lg shadow-black w-1/2 text-wrap break-words font-montserrat mr-auto ">
          {session?.user?.username || session?.user?.email}
        </p>
        <div className="w-8 h-8 flex items-center justify-center text-dark hover:bg-slate-200 rounded-full transition-all duration-200 cursor-pointer active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400">
          <FontAwesomeIcon
            icon={faAnglesLeft}
            onClick={closeNavbar}
            className="w-4 h-4 dark:text-light"
          />
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex gap-2 items-center justify-between px-2 py-1 mt-6 rounded-lg hover:bg-slate-200 transition-all duration-200 cursor-pointer font-lato text-sm sm:text-base dark:hover:bg-slate-500"
      >
        Logout
        <div className="w-4 h-4 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="w-full h-full"
          />
        </div>
      </button>
    </div>
  );
};

export default Navbar;
