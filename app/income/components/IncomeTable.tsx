import { IncomeDataType } from "@/app/types/income";
import IncomeCard from "./IncomeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const IncomeTable = ({
  incomeData,
  handleDeleteIncome,
}: {
  incomeData: IncomeDataType[];
  handleDeleteIncome: (id: string) => Promise<void>;
}) => {
  useState<IncomeDataType[]>(incomeData);

  return (
    <div className="w-10/12 mx-auto flex gap-2 flex-col items-start">
      <div className="md:text-lg text-sm text-shadow-sm w-full flex gap-4 flex-col">
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
                <div className="flex gap-2 items-center">
                  {" "}
                  <div className="sm:text-xl text-base sm:font-bold">
                    {income?.name},
                  </div>
                  <div className="">{income?.category}</div>
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <div>{formattedDate} -</div>
                  <div className="text-green-600 sm:font-bold text-base sm:text-lg dark:text-green-500">
                    {income?.amount}&#8364;
                  </div>
                </div>
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
