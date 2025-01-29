import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoCategoryType, TodoType } from "../types";
import Categories from "./Categories";
import { useTodos } from "../context/TodosProvider";

const Todos = () => {
  const { user } = useUser();
  const todaysDate = new Date();
  const formattedDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(todaysDate);

  const categoriesQuery = `${process.env.NEXT_PUBLIC_API_URL}/todoCategories?id=${user?.id}`;
  const todosQuery = `${process.env.NEXT_PUBLIC_API_URL}/todos?id=${user?.id}`;

  const { selectedCategory } = useTodos();
  console.log(selectedCategory);

  const { data: todoCategories, isLoading: todoCategoriesLoading } = useQuery<
    TodoCategoryType[]
  >({
    queryKey: ["todoCategories"],
    queryFn: async () => {
      const response = await axios.get(categoriesQuery);
      return response.data;
    },
  });

  const { isLoading: todosLoading } = useQuery<TodoType[]>({
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
      <Categories todoCategories={todoCategories || []} />
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
