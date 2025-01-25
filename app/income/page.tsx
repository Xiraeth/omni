"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeTable from "./components/IncomeTable";
import useCustomToast from "@/hooks/useCustomToast";
import { changeUrlParams } from "../common/functions/changeParams";
import FiltersModal from "./components/FiltersModal";
import Dropmenu from "../components/Dropmenu";
import axios from "axios";
import { IncomeDataType, SortFieldType, SortOrderType } from "../types/income";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SORT_FIELDS } from "../constants/constants";
import IncomeCard from "./components/IncomeCard";

const IncomePage = () => {
  const router = useRouter();
  const { session } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!session) {
      router.push("/login");
    }

    // Set userId in URL params
    if (session) {
      changeUrlParams({ params: "userId", value: session.user.id });
    }
  }, [session]);

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
  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

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

  const incomeTotalAmount = incomeData?.reduce(
    (acc: number, cur: IncomeDataType) => {
      return acc + cur.amount;
    },
    0
  );

  const handleSort = (
    data: IncomeDataType[],
    field: SortFieldType,
    order: SortOrderType
  ) => {
    return data.sort((a, b) => {
      if (field === "Category") {
        return order === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (field === "Amount") {
        return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else if (field === "Date") {
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (field === "Name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });
  };

  const handleSortSelection = (option: string) => {
    setSortField(option);
    queryClient.setQueryData(["incomeData"], (oldData: IncomeDataType[]) => {
      return handleSort(
        [...oldData],
        option as SortFieldType,
        sortOrder as SortOrderType
      );
    });
  };

  const handleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    queryClient.setQueryData(["incomeData"], (oldData: IncomeDataType[]) => {
      return handleSort(
        [...oldData],
        sortField as SortFieldType,
        newOrder as SortOrderType
      );
    });
  };

  return incomeDataLoading ? (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin w-8 h-8 dark:text-light"
      />
    </div>
  ) : session ? (
    <div className="w-screen h-screen overflow-x-hidden pb-8">
      <OpenNavbarButton />
      <AddIncomeForm />
      {isFiltersModalOpen && (
        <FiltersModal handleCloseFiltersModal={handleCloseFiltersModal} />
      )}

      <div className="w-10/12 mx-auto mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Dropmenu
            options={SORT_FIELDS}
            placeholder="Sort by"
            onSelect={handleSortSelection}
            width="[100px]"
            value={sortField}
          />

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-dark dark:text-light bg-buttonBgLight dark:bg-buttonBgDark border-[1px] dark:border-buttonBorderDark  hover:border-buttonBorderLightHover dark:hover:border-buttonBorderDarkHover transition-all duration-200 cursor-pointer active:bg-buttonBgLightFocus dark:active:bg-buttonBgDarkFocus drop-shadow-md"
            onClick={handleSortOrder}
          >
            <FontAwesomeIcon icon={faSort} />
          </div>
        </div>

        <div>
          <button
            className="flex items-center gap-2 bg-light border-[1px] drop-shadow-md border-dark text-dark rounded-md px-2 py-1 hover:bg-dark hover:text-light transition-all duration-200 dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark select-none"
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

      <div className="w-10/12 mx-auto mt-12">
        <IncomeCard hasBorder={true}>
          <div className="flex gap-2 items-center">
            {" "}
            <div className="sm:text-xl text-base sm:font-bold">
              Total amount of money earned
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-green-600 sm:font-bold text-base sm:text-lg dark:text-green-500">
              {incomeTotalAmount}&#8364;
            </div>
          </div>
        </IncomeCard>
      </div>
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default IncomePage;
