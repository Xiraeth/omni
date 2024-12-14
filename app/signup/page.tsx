"use client";

import { useState } from "react";

type ViewMode = "email" | "google" | undefined;

const Signup = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full font-montserrat">
      <div className="w-1/3 mx-auto bg-zinc-50 flex flex-col items-center justify-center gap-2 py-6 h-fit drop-shadow-lg shadow-black rounded-lg">
        <p className="text-2xl font-bold ">Signup</p>
        <p className="italic opacity-90">Choose a way to create your account</p>
      </div>
    </div>
  );
};

export default Signup;
