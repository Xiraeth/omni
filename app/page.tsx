"use client";

import LinkButton from "./components/LinkButton";

export default function Home() {
  return (
    <>
      <LinkButton
        color="black"
        text="About me"
        href="/"
        className="absolute top-4 left-4"
      />
      <div className=" italic select-none flex flex-col items-center justify-center h-screen w-fit gap-8 transition-all duration-200 mx-auto text-text-dark dark:text-text-light relative z-10">
        <p className="text-6xl font-bold font-montserrat drop-shadow-lg shadow-black text-center">
          Omni
        </p>
        <p className="text-xl font-montserrat drop-shadow-lg shadow-black text-center">
          An app for many things
        </p>
        <div className="flex justify-center gap-24 w-full">
          <LinkButton color="black" text="Log in" href="/" />
          <LinkButton color="black" text="Sign up" href="/signup" />
        </div>
      </div>
    </>
  );
}
