"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LinkButton from "@/app/components/LinkButton";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold text-red-500">Error</h1>
      <p className="text-slate-700 dark:text-slate-200">
        {error === "Configuration"
          ? "Please sign in to access this page"
          : "An authentication error occurred"}
      </p>
      <LinkButton text="Go to Login" href="/login" color="black" />
    </div>
  );
};

export default ErrorPage;
