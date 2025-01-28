import clsx from "clsx";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoCategoryType } from "../types";

const Todos = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const todaysDate = new Date();
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(todaysDate);

  const query = `/api/todoCategories?id=${user?.id}`;

  const { data: todoCategories, isLoading: todoCategoriesLoading } = useQuery({
    queryKey: ["todoCategories"],
    queryFn: async () => {
      const response = await axios.get(query);
      return response.data;
    },
  });

  return todoCategoriesLoading ? (
    <div className="w-full flex justify-center items-center h-screen">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin size-8 text-dark dark:text-light"
      />
    </div>
  ) : (
    <div className="w-full flex font-montserrat h-screen text-dark dark:text-light">
      <div
        className={clsx(
          "leftPart pt-6 bg-slate-400/10 dark:bg-black/20 flex flex-col items-center transition-all duration-300 ease-out w-[150px] lg:w-[200px] xl:w-[250px]"
        )}
      >
        <div className="w-full flex flex-col">
          <p className="text-xl font-bold mx-auto mb-6 pb-4 border-b-[1px] border-b-black/15 w-8/12 text-center">
            Categories
          </p>
          <div className="mb-2 flex flex-col gap-4 px-8">
            {todoCategories?.map((category: TodoCategoryType) => (
              <div
                key={category._id}
                className="flex justify-between items-center rounded-md bg-slate-200/30 px-4 py-2 hover:bg-slate-200/20 transition-colors duration-200 cursor-pointer"
              >
                <p className="font-montserrat text-lg">{category.name}</p>
                <p className="text-xl text-dark dark:text-light hover:text-red-500 cursor-pointer dark:hover:text-red-500 font-bold font-montserrat transition-colors duration-200">
                  x
                </p>
              </div>
            ))}
          </div>
          {!isCreateCategoryOpen && (
            <p
              className="opacity-70 lg:text-base text-sm cursor-pointer py-2 w-full flex items-center gap-1 justify-center hover:opacity-50 transition-opacity duration-200"
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
