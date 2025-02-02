import { useDashboardContext } from "../../context/DashboardProvider";
import CustomLoader from "../CustomLoader";
import FinanceChart from "./FinanceChart";
import Header from "./Header";

const Dashboard = () => {
  const { isAnythingLoading } = useDashboardContext();

  return (
    <div className="text-dark dark:text-light">
      <Header />

      {isAnythingLoading ? (
        <CustomLoader />
      ) : (
        <div className="pt-10 flex flex-col md:flex-row gap-2">
          <div className="leftSide w-11/12 md:w-6/12 md:mx-0 mx-auto pl-0 md:pl-6">
            <FinanceChart />
            <div className="mt-2"></div>
          </div>

          <div className="rightSide w-11/12 md:w-5/12 bg-slate-300/20 min-h-[400px] mx-auto pr-0 md:pr-6 flex justify-center items-center rounded-md">
            Placeholder
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
