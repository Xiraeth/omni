import { ExpensesFiltersType, ExpensesDataType } from "../types";
import EntryCard from "@/app/components/EntryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { isExpenseInFilters } from "../functions/isExpenseInFilters";

const ExpensesTable = ({
  expensesData,
  filtersData,
  handleDeleteExpense,
}: {
  expensesData: ExpensesDataType[];
  filtersData?: ExpensesFiltersType;
  handleDeleteExpense: (id: string) => Promise<void>;
}) => {
  return (
    <div className="w-10/12 mx-auto flex gap-2 flex-col items-start">
      <div className="md:text-lg text-sm text-shadow-sm w-full flex gap-4 flex-col">
        {expensesData?.map((expense: ExpensesDataType) => {
          const date = new Date(expense?.date);

          const shouldExpenseBeDisplayed = isExpenseInFilters(
            expense,
            filtersData || {}
          );

          if (!shouldExpenseBeDisplayed) return null;

          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <div
              key={expense?._id}
              className="flex justify-between items-center gap-4"
            >
              <EntryCard key={expense?._id}>
                <div className="flex gap-2 items-center sm:w-1/2 w-full justify-between">
                  {" "}
                  <div className="sm:text-xl text-sm sm:font-bold w-1/2">
                    {expense?.name}
                  </div>
                  <div className="w-1/2">{expense?.category}</div>
                </div>
                <div className="flex gap-2 items-center sm:w-1/2 w-full justify-between">
                  {" "}
                  <div className="w-1/2">{formattedDate}</div>
                  <div className="text-red-600 sm:font-bold text-base sm:text-lg dark:text-red-500 w-1/2 sm:text-right">
                    {expense?.amount}&#8364;
                  </div>
                </div>
              </EntryCard>

              <FontAwesomeIcon
                onClick={() => handleDeleteExpense(expense?._id)}
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

export default ExpensesTable;
