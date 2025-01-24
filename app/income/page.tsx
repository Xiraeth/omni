"use client";

import { useEffect } from "react";
import OpenNavbarButton from "../components/OpenNavbarButton";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import NoSessionDiv from "../components/NoSessionDiv";

const Income = () => {
  const router = useRouter();
  const { session } = useUser();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return session ? (
    <div>
      <OpenNavbarButton />
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default Income;
