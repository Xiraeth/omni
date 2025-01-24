import { IncomeDataType } from "@/app/types/income";
import IncomeCard from "./IncomeCard";

const IncomeTable = ({ incomeData }: { incomeData: IncomeDataType[] }) => {
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
          <IncomeCard key={income?._id}>
            <div className="md:text-xl text-basefont-bold">{income?.name}</div>
            <div>{income?.amount}&#8364;</div>
            <div>{formattedDate}</div>
            <div>{income?.category}</div>
          </IncomeCard>
        );
      })}
    </div>
  );
};

export default IncomeTable;
