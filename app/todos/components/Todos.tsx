import clsx from "clsx";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";

const Todos = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const todaysDate = new Date();
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(todaysDate);

  return (
    <div className="w-full flex font-montserrat h-screen text-dark dark:text-light">
      <div
        className={clsx(
          "leftPart pt-6 bg-slate-400/10 dark:bg-black/20 flex flex-col items-center transition-all duration-300 ease-out",
          {
            "w-[150px] lg:w-[200px] xl:w-[300px]": !isCreateCategoryOpen,
            "w-[300px] lg:w-[350px] xl:w-[450px]": isCreateCategoryOpen,
          }
        )}
      >
        <div className="w-full flex flex-col">
          <p className="text-xl font-bold mx-auto">Categories</p>
          {/* <div className="mb-8"> map through the user's todo categories </div> */}
          {!isCreateCategoryOpen && (
            <p
              className="opacity-70 lg:text-base text-sm cursor-pointer mt-16 px-4 py-2 w-full flex items-center gap-1 justify-center hover:opacity-50 transition-opacity duration-200"
              onClick={() => setIsCreateCategoryOpen(true)}
            >
              <span className="lg:text-2xl text-base">+</span> New category
            </p>
          )}
          {isCreateCategoryOpen && (
            <CreateCategoryForm
              onCancelClick={() => setIsCreateCategoryOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="centerPart pt-6 grow flex flex-col items-center">
        <p className="text-xl font-bold">Display and add todos</p>
      </div>

      <div className="rightPart pt-6 w-[300px] lg:w-[400px] xl:w-[500px] bg-slate-400/20 dark:bg-black/30 flex flex-col items-center">
        <p className="text-xl font-bold">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Todos;
