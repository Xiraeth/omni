"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import request from "../common/functions/request";
import { IncomeDataType } from "../types/income";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeTable from "./components/IncomeTable";
import useCustomToast from "@/hooks/useCustomToast";
import { changeUrlParams } from "../common/functions/changeParams";

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
      const data = await request({
        url: query,
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
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]"
            onClick={handleCloseFiltersModal}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              bg-light dark:bg-dark rounded-lg shadow-xl 
              w-[90%] max-w-[600px] p-6"
          >
            <div className="flex items-center mb-4">
              <p
                id="modal-title"
                className="text-xl font-bold text-dark dark:text-light"
              >
                Select filters
              </p>
              <button
                onClick={handleCloseFiltersModal}
                className="absolute right-[-10px] top-[-10px] bg-light hover:bg-dark hover:text-light rounded-full w-[35px] h-[35px] flex items-center justify-center transition-all duration-200 text-xl dark:bg-dark dark:hover:bg-light dark:text-light dark:hover:text-dark"
              >
                <FontAwesomeIcon icon={faXmark} className="" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Your modal content goes here */}
            </div>
          </div>
        </>
      )}

      <div className="w-10/12 mx-auto mb-4">
        <button
          className="flex items-center gap-2 bg-light border-[1px] drop-shadow-md border-dark text-dark rounded-md px-2 py-1 hover:bg-dark hover:text-light transition-all duration-200 dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
          onClick={handleOpenFiltersModal}
        >
          <FontAwesomeIcon icon={faFilter} />
          Filters
        </button>
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
