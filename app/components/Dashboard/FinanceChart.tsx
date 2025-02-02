import { type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { constructChartData } from "@/app/common/functions/constructChartData";
import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import { useDashboardContext } from "@/app/context/DashboardProvider";

const FinanceChart = () => {
  const { incomeEntries, expenseEntries } = useDashboardContext();
  const { monthIndex: amountOfMonthsThisYear } = getDateInfo(new Date());

  const [numberOfMonths, setNumberOfMonths] = useState(
    amountOfMonthsThisYear + 1
  );

  const chartData = constructChartData(incomeEntries, expenseEntries).slice(
    0,
    numberOfMonths
  );

  const chartConfig = {
    financialData: {
      label: "Euros",
    },
    incomes: {
      label: "Income",
      icon: TrendingUp,
      color: "hsl(var(--chart-1))",
    },
    expenses: {
      label: "Expenses",
      icon: TrendingDown,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="">
      <p className="text-center font-bold text-xs md:text-sm lg:text-base xl:text-lg font-montserrat text-dark dark:text-light">
        A chart of your income and expenses
      </p>
      <ChartContainer
        config={chartConfig}
        className="min-h-[300px] max-h-[400px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis className="text-white" dataKey="month" color="white" />
          <YAxis className="text-white" color="white" />
          <ChartTooltip
            content={
              <ChartTooltipContent labelKey="financialData" nameKey="month" />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="incomes" fill="var(--color-incomes)" radius={4} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
        </BarChart>
      </ChartContainer>
      <Slider
        defaultValue={[numberOfMonths]}
        max={12}
        min={1}
        step={1}
        onValueChange={(value) => setNumberOfMonths(value[0])}
        className="mt-2 w-full"
      />
    </div>
  );
};

export default FinanceChart;
