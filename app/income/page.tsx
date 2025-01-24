"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import request from "../common/functions/request";
import { IncomeDataType } from "../types/income";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeTable from "./components/IncomeTable";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  const [incomeData, setIncomeData] = useState<IncomeDataType[]>([]);
  const [incomeDataLoading, setIncomeDataLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchIncomeData = async () => {
      setIncomeDataLoading(true);
      const data = await request({
        url: "income",
        data: {
          userId: session?.user?.id,
        },
        method: "GET",
      });

      setIncomeData(data);
      setIncomeDataLoading(false);
    };

    fetchIncomeData();
  }, []);

  return incomeDataLoading ? (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl" />
    </div>
  ) : session ? (
    <div className="w-screen h-screen overflow-x-hidden">
      <OpenNavbarButton />
      <AddIncomeForm />
      <IncomeTable incomeData={incomeData} />
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
