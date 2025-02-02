"use client";

import { useUser } from "./context/UserContext";
import { changeUrlParams } from "./common/functions/changeParams";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CustomLoader from "./components/CustomLoader";
import { DashboardProvider } from "./context/DashboardProvider";
import Dashboard from "./components/Dashboard/Dashboard";

// the dashboard page if user is logged in, otherwise the landing/home page
export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      )}
    </>
  );
}
