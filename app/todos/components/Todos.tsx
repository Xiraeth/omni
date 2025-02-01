import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "@/app/context/UserContext";
import { TodoCategoryType, TodoType } from "../lib/types";
import CategoriesSection from "./CategoriesSection";
import TodosSection from "./TodosSection";
import CalendarSection from "./CalendarSection";
import { useTodosContext } from "../context/TodosProvider";
import { useEffect } from "react";
import CustomLoader from "@/app/components/CustomLoader";

const Todos = () => {
  const { user } = useUser();
  const { setCategories } = useTodosContext();

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

  useEffect(() => {
    if (todoCategories) {
      setCategories(todoCategories);
    }
  }, [todoCategories]);

  return todoCategoriesLoading || todosLoading ? (
    <CustomLoader />
  ) : (
    <div className="w-full flex font-montserrat h-screen text-dark dark:text-light">
      <CategoriesSection todoCategories={todoCategories || []} />
      <TodosSection todos={todos || []} />
      <CalendarSection />
    </div>
  );
};

export default Todos;
