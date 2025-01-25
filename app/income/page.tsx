"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import request from "../common/functions/request";
import { IncomeDataType } from "../types/income";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeTable from "./components/IncomeTable";
import useCustomToast from "@/hooks/useCustomToast";
import { changeUrlParams } from "../common/functions/changeParams";
import FiltersModal from "./components/FiltersModal";
import Dropmenu from "../components/Dropmenu";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      changeUrlParams({ params: "userId", value: session.user.id });
    }
  }, [session]);

  const [incomeData, setIncomeData] = useState<IncomeDataType[]>([]);
  const [incomeDataLoading, setIncomeDataLoading] = useState<boolean>(false);
  const urlSearchParams = useSearchParams();
  const dateFrom = urlSearchParams.get("dateFrom");
  const dateTo = urlSearchParams.get("dateTo");
  const query = `income?${new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(session?.user?.id && { userId: session.user.id }),
  }).toString()}`;

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  useEffect(() => {
    const fetchIncomeData = async () => {
      setIncomeDataLoading(true);

      try {
        const data = await request({
          url: query,
          data: {
            userId: session?.user?.id,
          },
          method: "GET",
        });

        setIncomeData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIncomeDataLoading(false);
      }
    };

    fetchIncomeData();
  }, []);

  const successToast = useCustomToast({
    message: "Income deleted successfully",
  });

  const errorToast = useCustomToast({
    message: "Error deleting income",
  });

  const handleDeleteIncome = async (id: string) => {
    const response = await request({
      url: `income/${id}`,
      method: "DELETE",
    });

    if (response.error) {
      errorToast();
      return;
    }

    successToast();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return incomeDataLoading ? (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl" />
    </div>
  ) : session ? (
    <div className="w-screen h-screen overflow-x-hidden">
      <OpenNavbarButton />
      <AddIncomeForm />
      {isFiltersModalOpen && (
        <FiltersModal handleCloseFiltersModal={handleCloseFiltersModal} />
      )}

      <div className="w-10/12 mx-auto mb-4 flex justify-between items-center">
        <Dropmenu
          options={["Date", "Amount", "Category"]}
          placeholder="Sort by"
          onSelect={() => {}}
          value=""
          width="[100px]"
        />
        <div>
          <button
            className="flex items-center gap-2 bg-light border-[1px] drop-shadow-md border-dark text-dark rounded-md px-2 py-1 hover:bg-dark hover:text-light transition-all duration-200 dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
            onClick={handleOpenFiltersModal}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
        </div>
      </div>
      <IncomeTable
        incomeData={incomeData}
        handleDeleteIncome={handleDeleteIncome}
      />
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
