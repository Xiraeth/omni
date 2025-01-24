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
import SubmitButton from "./components/SubmitButton";

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
        className="w-10/12 p-4 mx-auto flex justify-between items-center mt-20"
      >
        <div className="w-1/2">
          <NameInput />
        </div>

        <div className="flex gap-4">
          <Dropdown
            options={["Salary", "Freelance", "Investment", "Other"]}
            placeholder="Category"
            onSelect={(option) => setCategory(option)}
          />
          <AmountInput />
          <DateInput />
        </div>

        <SubmitButton />
      </div>
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
