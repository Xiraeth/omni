"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeTable from "./components/IncomeTable";
import useCustomToast from "@/hooks/useCustomToast";
import { changeUrlParams } from "../common/functions/changeParams";
import FiltersModal from "./components/FiltersModal";
import Dropmenu from "../components/Dropmenu";
import axios from "axios";
import { IncomeDataType } from "../types/income";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (sessionStorage.getItem("incomeDeleted") === "true") {
      successToast();
      sessionStorage.removeItem("incomeDeleted");
    }
  }, []);

  // const [incomeData, setIncomeData] = useState<IncomeDataType[]>([]);
  const urlSearchParams = useSearchParams();
  const dateFrom = urlSearchParams.get("dateFrom");
  const dateTo = urlSearchParams.get("dateTo");
  const query = `income?${new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(session?.user?.id && { userId: session.user.id }),
  }).toString()}`;

  const successToast = useCustomToast({
    message: "Income deleted successfully",
  });

  const errorToast = useCustomToast({
    message: "Error deleting income",
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  const { data: incomeData, isLoading: incomeDataLoading } = useQuery({
    queryKey: ["incomeData"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${query}`
      );
      return response.data;
    },
  });

  const { mutate: deleteIncome } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/income/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      successToast();

      const deletedEntry = data?.response;

      queryClient.setQueryData(["incomeData"], (oldData: IncomeDataType[]) => {
        return oldData.filter((item) => item._id !== deletedEntry._id);
      });
    },
    onError: () => {
      errorToast();
    },
  });

  const handleDeleteIncome = async (id: string) => {
    deleteIncome(id);
  };

  return incomeDataLoading ? (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin w-8 h-8 dark:text-light"
      />
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
