import { IncomeFiltersType, IncomeDataType } from "../types";
import EntryCard from "@/app/components/EntryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { isIncomeInFilters } from "../functions/isIncomeInFilters";

const IncomeTable = ({
  incomeData,
  filtersData,
  handleDeleteIncome,
}: {
  incomeData: IncomeDataType[];
  filtersData?: IncomeFiltersType;
  handleDeleteIncome: (id: string) => Promise<void>;
}) => {
  return (
    <div className="w-10/12 mx-auto flex gap-2 flex-col items-start">
      <div className="md:text-lg text-sm text-shadow-sm w-full flex gap-4 flex-col">
        {incomeData?.map((income: IncomeDataType) => {
          const date = new Date(income?.date);

          const shouldIncomeBeDisplayed = isIncomeInFilters(
            income,
            filtersData || {}
          );

          if (!shouldIncomeBeDisplayed) return null;

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
              <EntryCard key={income?._id}>
                <div className="flex gap-2 items-center sm:w-1/2 w-full justify-between">
                  {" "}
                  <div className="sm:text-xl text-sm sm:font-bold w-1/2">
                    {income?.name}
                  </div>
                  <div className="w-1/2">{income?.category}</div>
                </div>
                <div className="flex gap-2 items-center sm:w-1/2 w-full justify-between">
                  {" "}
                  <div className="w-1/2">{formattedDate}</div>
                  <div className="text-green-600 sm:font-bold text-base sm:text-lg dark:text-green-500 w-1/2 sm:text-right">
                    {income?.amount}&#8364;
                  </div>
                </div>
              </EntryCard>

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
