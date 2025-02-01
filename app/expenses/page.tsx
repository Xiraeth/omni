"use client";

import { useEffect, useState } from "react";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import NoSessionDiv from "@/app/components/NoSessionDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpensesTable from "./components/ExpensesTable";
import useCustomToast from "@/hooks/useCustomToast";
import { changeUrlParams } from "@/app/common/functions/changeParams";
import FiltersModal from "./components/ExpensesFiltersModal";
import Dropmenu from "@/app/components/Dropmenu";
import axios from "axios";
import {
  ExpensesFiltersType,
  ExpensesDataType,
  SortFieldType,
  SortOrderType,
} from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  INITIAL_EXPENSES_FILTERS,
  SORT_FIELDS,
  EXPENSES_CATEGORIES_LOWERCASE,
} from "@/app/constants/constants";
import EntryCard from "@/app/components/EntryCard";
import { handleSortExpenses } from "../common/functions/handleSort";
import { isExpenseInFilters } from "./functions/isExpenseInFilters";

const ExpensesPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      router.push("/login");
    }

    // Set userId in URL params
    if (user) {
      changeUrlParams({ params: "userId", value: user.id });
    }
  }, [user]);

  const query = `expenses?${new URLSearchParams({
    ...(user?.id && { userId: user.id }),
  }).toString()}`;

  const successToast = useCustomToast({
    message: "Expense deleted successfully",
  });

  const errorToast = useCustomToast({
    message: "Error deleting expense",
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortFieldType>("");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("");

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  const { data: expensesData, isLoading: expensesDataLoading } = useQuery({
    queryKey: ["expensesData"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/${query}`
      );
      return response.data;
    },
  });

  const filtersData =
    queryClient.getQueryData<ExpensesFiltersType>(["expensesFiltersData"]) ||
    INITIAL_EXPENSES_FILTERS;

  const areThereFilters = Object.values(filtersData).some((value) => {
    if (Array.isArray(value)) {
      return value?.length < EXPENSES_CATEGORIES_LOWERCASE?.length;
    }
    return value;
  });

  const { mutate: deleteExpense } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      successToast();

      const deletedEntry = data?.response;

      queryClient.setQueryData(
        ["expensesData"],
        (oldData: ExpensesDataType[]) => {
          return oldData.filter((item) => item._id !== deletedEntry._id);
        }
      );
    },
    onError: () => {
      errorToast();
    },
  });

  const handleDeleteExpense = async (id: string) => {
    deleteExpense(id);
  };

  const expensesTotalAmount = expensesData?.reduce(
    (acc: number, cur: ExpensesDataType) => {
      return isExpenseInFilters(cur, filtersData) ? acc + cur.amount : acc;
    },
    0
  );

  const handleSortSelection = (option: string) => {
    setSortField(option as SortFieldType);

    queryClient.setQueryData(
      ["expensesData"],
      (oldData: ExpensesDataType[]) => {
        return handleSortExpenses(
          [...oldData],
          option as SortFieldType,
          sortOrder as SortOrderType
        );
      }
    );
  };

  const handleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    queryClient.setQueryData(
      ["expensesData"],
      (oldData: ExpensesDataType[]) => {
        return handleSortExpenses(
          [...oldData],
          sortField as SortFieldType,
          newOrder as SortOrderType
        );
      }
    );
  };

  return expensesDataLoading ? (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin w-8 h-8 dark:text-light"
      />
    </div>
  ) : user ? (
    <div className="w-screen h-screen overflow-x-hidden pb-8">
      <OpenNavbarButton />
      <AddExpenseForm />
      {isFiltersModalOpen && (
        <FiltersModal handleCloseFiltersModal={handleCloseFiltersModal} />
      )}

      {/* filter and sorting */}
      {(expensesData?.length || areThereFilters) && (
        <>
          <div className="w-10/12 mx-auto mb-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Dropmenu
                options={SORT_FIELDS}
                placeholder="Sort by"
                onSelect={handleSortSelection}
                value={sortField}
              />

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-dark dark:text-light bg-buttonBgLight dark:bg-buttonBgDark border-[1px] dark:border-buttonBorderDark hover:border-buttonBorderLightHover dark:hover:border-buttonBorderDarkHover transition-all duration-200 cursor-pointer active:bg-buttonBgLightFocus dark:active:bg-buttonBgDarkFocus drop-shadow-md"
                onClick={handleSortOrder}
              >
                <FontAwesomeIcon icon={faSort} />
              </div>
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 bg-light border-[1px] drop-shadow-md border-dark text-dark rounded-md px-2 py-1 hover:bg-dark hover:text-light transition-all duration-200 dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark select-none"
                onClick={handleOpenFiltersModal}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
              </button>
              {areThereFilters && (
                <div className="absolute -top-[4px] -right-[2px] bg-red-500 size-[10px] rounded-full"></div>
              )}
            </div>
          </div>

          <ExpensesTable
            expensesData={expensesData}
            filtersData={filtersData as ExpensesFiltersType}
            handleDeleteExpense={handleDeleteExpense}
          />

          {/* total amount of money spent */}
          {expensesTotalAmount ? (
            <div className="w-10/12 mx-auto mt-12">
              <EntryCard hasBorder={true}>
                <div className="flex gap-2 items-center">
                  {" "}
                  <div className="sm:text-xl text-base sm:font-bold">
                    Total amount of money spent
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-red-600 sm:font-bold text-base sm:text-lg dark:text-red-500">
                    {expensesTotalAmount}&#8364;
                  </div>
                </div>
              </EntryCard>
            </div>
          ) : null}
        </>
      )}
    </div>
  ) : (
    <NoSessionDiv />
  );
};

export default ExpensesPage;
