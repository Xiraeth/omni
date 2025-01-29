import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoCategoryType, TodoType } from "../types";
import CategoriesSection from "./CategoriesSection";
import TodosSection from "./TodosSection";

const Todos = () => {
  const { user } = useUser();
  const todaysDate = new Date();
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(todaysDate);

  const categoriesQuery = `${process.env.NEXT_PUBLIC_API_URL}/todoCategories?id=${user?.id}`;
  const todosQuery = `${process.env.NEXT_PUBLIC_API_URL}/todos?id=${user?.id}`;

  const { data: todoCategories, isLoading: todoCategoriesLoading } = useQuery<
    TodoCategoryType[]
  >({
    queryKey: ["todoCategories"],
    queryFn: async () => {
      const response = await axios.get(categoriesQuery);
      return response.data;
    },
  });

  const { data: todos, isLoading: todosLoading } = useQuery<TodoType[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(todosQuery);
      return response.data;
    },
  });

  return todoCategoriesLoading || todosLoading ? (
    <div className="w-full flex justify-center items-center h-screen">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin size-8 text-dark dark:text-light"
      />
    </div>
  ) : (
    <div className="w-full flex font-montserrat h-screen text-dark dark:text-light">
      <CategoriesSection todoCategories={todoCategories || []} />

      <TodosSection todos={todos || []} />

      <div className="rightPart pt-6 w-[300px] lg:w-[400px] xl:w-[500px] bg-slate-400/20 dark:bg-black/30 flex flex-col items-center">
        <p className="text-xl font-bold">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Todos;
