"use client";

import NavigationBar from "./components/NavigationBar";
import { ToggleThemeButton } from "./components/ToggleThemeButton";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <ToggleThemeButton />
    </>
  );
}
