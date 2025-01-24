"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import Dropdown from "../components/Dropdown";
import NameInput from "./components/NameInput";
import AmountInput from "./components/AmountInput";
import DateInput from "./components/DateInput";
import GenericButton from "../components/GenericButton";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  const [category, setCategory] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  return session ? (
    <div className="w-screen h-screen overflow-x-hidden">
      <OpenNavbarButton />
      <div
        id="add-income-row"
        className="w-10/12 p-4 mx-auto flex flex-col lg:flex-row items-center md:items-start mt-20 gap-4"
      >
        <div className="lg:w-1/2 w-full">
          <NameInput />
        </div>

        <div className="flex gap-4 md:flex-row flex-col w-full justify-end">
          <Dropdown
            options={["Salary", "Freelance", "Investment", "Other"]}
            placeholder="Category"
            onSelect={(option) => setCategory(option)}
          />
          <AmountInput />
          <DateInput />
          <GenericButton text="Add income" width="md" />
        </div>
      </div>
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
