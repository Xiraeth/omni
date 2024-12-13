"use client";

import { ToggleThemeButton } from "./components/ToggleThemeButton";
import LinkButton from "./components/LinkButton";

export default function Home() {
  return (
    <>
      <LinkButton
        text="finances"
        href="/finances"
        className="absolute top-4 left-4"
      />
      <ToggleThemeButton />
      <div className=" italic select-none font-bold flex flex-col items-center justify-center h-screen w-fit gap-12 mx-auto text-text-dark dark:text-text-light relative z-10">
        <p className="text-6xl font-montserrat drop-shadow-lg shadow-black text-center">
          An app for many things
        </p>
        <div className="flex justify-center gap-24 w-full">
          <LinkButton text="Login" href="/login" />
          <LinkButton text="Sign up" href="/signup" />
        </div>
      </div>
    </>
  );
}
