"use client";

import { useState } from "react";

import Link from "next/link";
import SignupWithGoogle from "../components/SignupWithGoogle";
import SignupWithEmail from "../components/SignupWithEmail";
type ViewMode = "email" | "google" | undefined;

const Signup = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <div className="w-[350px] sm:w-[600px] mx-auto bg-zinc-50 flex flex-col items-center justify-center gap-2 py-6 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150">
        <p className="text-xl sm:text-2xl font-bold font-montserrat transition-all duration-150">
          Sign Up
        </p>
        <p className="opacity-80 font-montserrat mb-4 text-center text-sm sm:text-base transition-all duration-150">
          Choose a way to create your account
        </p>
        <SignupWithGoogle />
        <SignupWithEmail />
        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-8 transition-all duration-150 text-sm sm:text-base">
          <p>Already have an account?</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-400 transition-all duration-150"
          >
            Sign in
          </Link>
        </div>
        <div className="text-xs sm:text-base font-montserrat opacity-80 text-center transition-all duration-150">
          This is a free and open source project. You do not have to agree to or
          pay for anything.
        </div>
      </div>
    </div>
  );
};

export default Signup;
