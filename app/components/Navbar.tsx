"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faArrowRightFromBracket,
  faChartLine,
  faGear,
  faHandHoldingDollar,
  faListCheck,
  faSackDollar,
  faSackXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { changeUrlParams } from "../common/functions/changeParams";
import { useUser } from "../context/UserContext";
import { signOut } from "next-auth/react";
import NavbarButton from "./NavbarButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { session } = useUser();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isNavbarOpen = searchParams.get("isNavbarOpen") === "true";

  const closeNavbar = () => {
    setIsDropdownOpen(false);
    changeUrlParams({ params: "isNavbarOpen", value: null });
  };

  const handleLogout = async () => {
    await signOut();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!session) {
    return null;
  }

  return (
    <div
      className={`fixed left-0 bottom-0 top-0 w-[150px] sm:w-[250px] pt-4
        ${isNavbarOpen ? "shadow-lg shadow-black" : "shadow-black shadow-sm"}
        text-dark dark:text-light bg-slate-300 dark:bg-slate-800 px-4 
        ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-[color, background-color, box-shadow, transform] duration-[200ms,200ms,500ms,500ms] z-50`}
    >
      <div className="flex items-center border-b-[1px] border-dark pb-2">
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt={`${session?.user?.username || "User"}'s Avatar`}
          width={32}
          height={32}
          className="rounded-full mr-2"
          onError={(e) => {
            // Fallback to default avatar if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "/default-avatar.png";
          }}
        />
        <p className="text-base sm:text-2xl text-dark dark:text-light font-bold drop-shadow-lg shadow-black w-2/3 text-wrap break-words font-montserrat mr-auto ">
          {session?.user?.username ||
            session?.user?.name ||
            session?.user?.email}
        </p>
        <div
          className="w-8 h-8 flex items-center justify-center text-dark hover:bg-slate-200 rounded-full transition-all duration-200 cursor-pointer active:bg-slate-300 drop-shadow-lg shadow-black dark:text-light dark:hover:bg-slate-500 dark:active:bg-slate-400"
          onClick={closeNavbar}
        >
          <FontAwesomeIcon
            icon={faAnglesLeft}
            className="w-4 h-4 dark:text-light"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-70px)]">
        <div className="flex flex-col">
          <NavbarButton
            text="Dashboard"
            onClick={() => router.push("/")}
            icon={faChartLine}
          />
          <div className="container flex flex-col">
            <NavbarButton
              text="Finance"
              onClick={toggleDropdown}
              icon={faHandHoldingDollar}
              isDropdown
              className={`${
                isDropdownOpen
                  ? "[&>.arrow-icon]:rotate-180 bg-slate-200/80 dark:bg-slate-600/80"
                  : ""
              }`}
            />
            <div
              className={`flex flex-col gap-2 p-2 pl-4 overflow-hidden transition-[max-height,opacity] duration-300 ${
                isDropdownOpen
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <NavbarButton
                text="Income"
                onClick={isDropdownOpen ? () => {} : undefined}
                icon={faSackDollar}
                className={`${!isDropdownOpen ? "cursor-default" : ""}`}
                mt={0}
              />
              <NavbarButton
                text="Expenses"
                onClick={() => {}}
                icon={faSackXmark}
                className={`${!isDropdownOpen ? "cursor-default" : ""}`}
                mt={0}
              />
            </div>
          </div>
          <NavbarButton
            text="Todos"
            onClick={() => {}}
            icon={faListCheck}
            mt={0}
          />
        </div>
        <div>
          <NavbarButton text="Settings" onClick={() => {}} icon={faGear} />
          <NavbarButton
            text="Logout"
            onClick={handleLogout}
            icon={faArrowRightFromBracket}
            className="text-red-600 dark:text-rose-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
