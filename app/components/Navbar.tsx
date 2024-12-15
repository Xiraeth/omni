"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { changeUrlParams } from "../common/functions/changeParams";
import { useUser } from "../context/UserContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      className={`fixed left-0 bottom-0 -top-5 pt-10 pb-20 w-[300px] z-10 
        ${isNavbarOpen ? "shadow-lg shadow-black" : "shadow-black shadow-sm"}
        text-dark dark:text-light bg-slate-300 dark:bg-slate-800 px-4 
        ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-[color, background-color, box-shadow, transform] duration-[200ms,500ms,500ms,500ms] z-50`}
    >
      <div className="flex items-center border-b-[1px] border-dark pb-2">
        <p className="text-xl text-dark dark:text-light text-center drop-shadow-lg shadow-black w-1/2 text-wrap break-words font-montserrat mr-auto ">
          {session?.user?.username || session?.user?.email}
        </p>
        <FontAwesomeIcon
          icon={faAnglesLeft}
          onClick={closeNavbar}
          className="text-lg width-[20px] height-[20px] text-dark p-2 flex items-center justify-center hover:bg-slate-200 rounded-full transition-all duration-200 cursor-pointer active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400"
        />
      </div>
      <p className="h-full flex items-end" onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
};

export default Navbar;
