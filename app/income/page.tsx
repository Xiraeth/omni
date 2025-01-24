"use client";

import { useEffect } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import FinanceInput from "@/app/components/FinanceInput";
import Dropdown from "../components/Dropdown";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return session ? (
    <div className="w-screen h-screen overflow-x-hidden">
      <OpenNavbarButton />
      <div
        id="add-income-row"
        className="w-10/12 p-4 mx-auto flex justify-between items-center mt-20"
      >
        <div className="w-1/2">
          <FinanceInput placeholder="Income name" />
        </div>

        <div>
          <Dropdown
            options={["Salary", "Freelance", "Investment", "Other"]}
            placeholder="Category"
            onSelect={(option) => console.log(option)}
          />
        </div>
      </div>
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
