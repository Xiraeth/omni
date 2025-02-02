"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faArrowRightFromBracket,
  faChartLine,
  faGear,
  faHandHoldingDollar,
  faListCheck,
  faMoon,
  faSackDollar,
  faSackXmark,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { changeUrlParams } from "../common/functions/changeParams";
import { useUser } from "../context/UserContext";
import { signOut } from "next-auth/react";
import NavbarButton from "./NavbarButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import CustomLoader from "./CustomLoader";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isNavbarOpen = searchParams.get("isNavbarOpen") === "true";
  const [isLoading, setIsLoading] = useState(false);

  const closeNavbar = () => {
    changeUrlParams({ params: "isNavbarOpen", value: null });
    setIsLoading(false);
    setIsDropdownOpen(false);
  };

  const handleDashboardClick = () => {
    router.push("/");
    setIsLoading(false);
    setIsDropdownOpen(false);
  };

  const handleIncomeClick = () => {
    setIsLoading(true);
    router.push("/income");
    setIsLoading(false);
  };

  const handleExpensesClick = () => {
    setIsLoading(true);
    router.push("/expenses");
    setIsLoading(false);
  };

  const handleTodosClick = () => {
    setIsLoading(true);
    router.push("/todos");
    setIsLoading(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!user) {
    return null;
  }

  return isLoading ? (
    <CustomLoader />
  ) : (
    <div
      className={`fixed left-0 bottom-0 top-0 w-[200px] sm:w-[250px] pt-4
        ${isNavbarOpen ? "shadow-lg shadow-black" : "shadow-black shadow-sm"}
        text-dark dark:text-light bg-slate-300 dark:bg-slate-800 px-4 
        ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-[color, background-color, box-shadow, transform] duration-200 z-[100]`}
    >
      <div className="flex items-center border-b-[1px] border-dark pb-2">
        {user?.image && (
          <Image
            src={user?.image || "/default-avatar.png"}
            alt={`${user?.username || "User"}'s Avatar`}
            width={32}
            height={32}
            className="rounded-full mr-2"
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "/default-avatar.png";
            }}
          />
        )}
        <p className="text-lg sm:text-xl text-dark dark:text-light font-bold drop-shadow-lg shadow-black w-2/3 text-wrap break-words font-montserrat mr-auto ">
          {user?.username || user?.name || user?.email}
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
      <div className="flex flex-col justify-between h-[calc(100%-70px)] mt-4">
        <div className="flex flex-col gap-2">
          <NavbarButton
            text="Dashboard"
            onClick={handleDashboardClick}
            icon={faChartLine}
          />
          <div
            className={`container flex flex-col ${
              isDropdownOpen ? "h-auto" : "h-[32px]"
            }`}
          >
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
              className={`flex flex-col gap-2 p-2 pl-4 overflow-hidden transition-[opacity] duration-300 ${
                isDropdownOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <NavbarButton
                text="Income"
                onClick={isDropdownOpen ? handleIncomeClick : undefined}
                icon={faSackDollar}
                className={`${!isDropdownOpen ? "cursor-default" : ""}`}
              />
              <NavbarButton
                text="Expenses"
                onClick={isDropdownOpen ? handleExpensesClick : undefined}
                icon={faSackXmark}
                className={`${!isDropdownOpen ? "cursor-default" : ""}`}
              />
            </div>
          </div>
          <NavbarButton
            text="Todos"
            onClick={handleTodosClick}
            icon={faListCheck}
          />
        </div>
        <div className="flex flex-col gap-2 pb-2">
          <div>
            <NavbarButton
              text="Toggle theme"
              onClick={toggleTheme}
              icon={theme === "light" ? faSun : faMoon}
            />
          </div>
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
