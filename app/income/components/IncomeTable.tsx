import { IncomeDataType } from "@/app/types/income";
import IncomeCard from "./IncomeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type FilterType = "all" | "category" | "date";

const IncomeTable = ({
  incomeData,
  handleDeleteIncome,
}: {
  incomeData: IncomeDataType[];
  handleDeleteIncome: (id: string) => Promise<void>;
}) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [filteredIncomeData, setFilteredIncomeData] =
    useState<IncomeDataType[]>(incomeData);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setFilteredIncomeData(incomeData);
  }, [incomeData]);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  return (
    <div className="w-10/12 mx-auto flex gap-2 flex-col items-start">
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
      <button
        className="flex items-center gap-2 bg-light border-[1px] drop-shadow-md border-dark text-dark rounded-md px-2 py-1 hover:bg-dark hover:text-light transition-all duration-200 dark:bg-dark dark:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
        onClick={handleOpenFiltersModal}
      >
        <FontAwesomeIcon icon={faFilter} />
        Filters
      </button>
      <div className="md:text-lg text-sm text-shadow-sm w-full flex gap-4 flex-col">
        {filteredIncomeData?.map((income) => {
          const date = new Date(income?.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <div
              key={income?._id}
              className="flex justify-between items-center gap-4"
            >
              <IncomeCard key={income?._id}>
                <div className="md:text-xl text-basefont-bold md:w-1/4 w-1/3">
                  {income?.name}
                </div>
                <div>{income?.amount}&#8364;</div>
                <div>{formattedDate}</div>
                <div>{income?.category}</div>
              </IncomeCard>

              <FontAwesomeIcon
                onClick={() => handleDeleteIncome(income?._id)}
                className="cursor-pointer text-dark dark:text-light 
              text-red-500 dark:text-red-600 transition-all duration-200 text-2xl
              hover:text-red-600 dark:hover:text-red-500
              "
                icon={faTrash}
                width={40}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncomeTable;
