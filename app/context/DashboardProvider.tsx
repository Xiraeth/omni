import { createContext, useContext, useMemo, useState } from "react";
import { TodoType } from "../todos/lib/types";
import { IncomeDataType } from "../income/types";
import { ExpensesDataType } from "../expenses/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

type DashboardContextType = {
  tasks: TodoType[];
  incomeEntries: IncomeDataType[];
  expenseEntries: ExpensesDataType[];
  areTasksLoading: boolean;
  areIncomeEntriesLoading: boolean;
  areExpenseEntriesLoading: boolean;
  isAnythingLoading: boolean;
};

const DashboardContext = createContext<DashboardContextType>({
  tasks: [],
  incomeEntries: [],
  expenseEntries: [],
  areTasksLoading: true,
  areIncomeEntriesLoading: true,
  areExpenseEntriesLoading: true,
  isAnythingLoading: true,
});
export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedDate, setSelectedDate] = useState<string>("");

  const { data: tasks, isPending: areTasksLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/todos?id=${user?.id}`
      );
      return response.data;
    },
  });

  const { data: incomeEntries, isPending: areIncomeEntriesLoading } = useQuery({
    queryKey: ["incomeData"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/income?userId=${user?.id}`
      );
      return response.data;
    },
  });

  const { data: expenseEntries, isPending: areExpenseEntriesLoading } =
    useQuery({
      queryKey: ["expensesData"],
      queryFn: async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/expenses?userId=${user?.id}`
        );
        return response.data;
      },
    });

  const isAnythingLoading =
    areTasksLoading || areIncomeEntriesLoading || areExpenseEntriesLoading;

  const dataToExport = useMemo(() => {
    return {
      tasks,
      incomeEntries,
      expenseEntries,
      selectedDate,
      setSelectedDate,
      areTasksLoading,
      areIncomeEntriesLoading,
      areExpenseEntriesLoading,
      isAnythingLoading,
    };
  }, [
    tasks,
    incomeEntries,
    expenseEntries,
    selectedDate,
    setSelectedDate,
    areTasksLoading,
    areIncomeEntriesLoading,
    areExpenseEntriesLoading,
    isAnythingLoading,
  ]);

  return (
    <DashboardContext.Provider value={dataToExport}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
