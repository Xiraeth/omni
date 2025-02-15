import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import ButtonOuttlined from "@/app/components/ButtonOuttlined";
import { useTodosContext } from "../context/TodosProvider";

const CalendarSection = () => {
  const { selectedDate, setSelectedDate } = useTodosContext();

  const currentDate = new Date();

  const [month, setMonth] = useState<Date>(new Date(currentDate));

  return (
    <div className="rightPart pt-6 w-[300px] lg:w-[400px] xl:w-[500px] bg-slate-400/20 dark:bg-black/30 hidden md:flex flex-col items-center gap-14">
      <p className="w-11/12 lg:w-7/12 text-center font-bold text-base lg:text-lg">
        Pick a date to filter your todos for that specific day
      </p>

      <Calendar
        mode="single"
        selected={selectedDate}
        month={month}
        onMonthChange={setMonth}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date);
            setMonth(date);
          }
        }}
        weekStartsOn={1}
        footer={
          <div className="text-center text-lgitalic font-medium mt-2 text-sm lg:text-base">
            {selectedDate ? (
              <div>
                Selected day:{" "}
                <span className="italic font-bold text-teal-600 dark:text-teal-500 ">
                  {getDateInfo(selectedDate).monthLong}{" "}
                  {getDateInfo(selectedDate).day}{" "}
                  {getDateInfo(selectedDate).year}
                </span>
              </div>
            ) : (
              <p className="italic font-bold text-gray-600 dark:text-gray-300">
                No date selected
              </p>
            )}
          </div>
        }
      />

      <ButtonOuttlined
        text="Jump to today"
        className="text-sm lg:text-base"
        onClick={() => {
          const newDate = new Date();
          setSelectedDate(newDate);
          setMonth(newDate);
        }}
      />
    </div>
  );
};

export default CalendarSection;
