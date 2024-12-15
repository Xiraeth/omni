"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { changeUrlParams } from "../common/functions/changeParams";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const isNavbarOpen = searchParams.get("isNavbarOpen") === "true";

  const onCloseClick = () => {
    changeUrlParams({ params: "isNavbarOpen", value: "false" });
  };

  return (
    <div
      className={`fixed left-0 bottom-0 -top-5 pt-10 w-[300px] z-10 
        ${isNavbarOpen ? "shadow-lg shadow-black" : "shadow-black shadow-sm"}
        text-dark dark:text-light bg-slate-300 dark:bg-slate-800 px-4 
        ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-[color, background-color, box-shadow, transform] duration-[200ms,500ms,500ms,500ms]`}
    >
      <div className="flex items-center">
        <p className="text-4xl text-dark dark:text-light text-center drop-shadow-lg shadow-black font-bold font-montserrat mr-auto">
          Omni
        </p>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={onCloseClick}
          className="bg-transparent text-dark dark:text-light rounded-full flex items-center justify-center text-md py-3 px-4 border-2 border-dark dark:border-light cursor-pointer hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-100 z-10 justify-self-end shadow-lg shadow-black/10 dark:shadow-white/10"
        />
      </div>
    </div>
  );
};

export default Navbar;
