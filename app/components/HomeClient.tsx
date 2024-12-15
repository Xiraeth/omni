"use client";

import { Session } from "next-auth";
import { useState } from "react";
import LinkButton from "./LinkButton";

interface HomeClientProps {
  session: Session | null;
}

export default function HomeClient({ session }: HomeClientProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
        <div className="italic select-none flex flex-col items-center justify-center h-screen w-fit gap-8 transition-all duration-200 mx-auto text-text-dark dark:text-text-light relative z-10">
          <div className="fixed top-4 left-4">Open</div>
          <h1 className="text-6xl font-bold font-montserrat drop-shadow-lg shadow-black text-center text-violet-600 dark:text-red-500">
            Welcome back, <i>Master</i>
          </h1>
        </div>
      )}
    </>
  );
}
