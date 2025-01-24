import { IncomeDataType } from "@/app/types/income";
import IncomeCard from "./IncomeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const IncomeTable = ({
  incomeData,
  handleDeleteIncome,
}: {
  incomeData: IncomeDataType[];
  handleDeleteIncome: (id: string) => Promise<void>;
}) => {
  return (
    <div className="w-10/12 mx-auto md:text-lg text-sm text-shadow-sm">
      {incomeData?.map((income) => {
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
              <div className="md:text-xl text-basefont-bold">
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
  );
};

export default IncomeTable;
