import { useState } from "react";
import {
  UpsertTodoFormDataType,
  DeleteTodoDataType,
  DeleteTodoReturnType,
  TodoType,
  UpdateCheckedTodoDataType,
  UpdateCheckedTodoReturnType,
} from "../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCustomToast from "@/hooks/useCustomToast";
import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import { useUser } from "@/app/context/UserContext";
import { TodoCategoryType } from "../lib/types";
import TodoCard from "./TodoCard";
import Loader from "@/app/components/Loader";
import UpsertTodoModal from "./UpsertTodoModal";

const TodosList = ({
  todos,
  categories,
}: {
  todos: TodoType[];
  categories: TodoCategoryType[];
}) => {
  const { user } = useUser();
  const [hoveredTodoId, setHoveredTodoId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isEditTodoOpen, setIsEditTodoOpen] = useState(false);
  const [initialValues, setInitialValues] =
    useState<UpsertTodoFormDataType | null>(null);

  const updateSuccessToast = useCustomToast({ message: "Task updated" });
  const updateErrorToast = useCustomToast({
    message: "Failed to update task",
    type: "error",
  });
  const deleteSuccessToast = useCustomToast({
    message: "Task deleted",
    type: "success",
  });
  const deleteErrorToast = useCustomToast({
    message: "Failed to delete task",
    type: "error",
  });

  const toggleCompletedMutation = useMutation({
    mutationFn: async ({ data }: { data: UpdateCheckedTodoDataType }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateTodo`,
        { ...data }
      );
      return response.data;
    },
    onSuccess: (response: UpdateCheckedTodoReturnType) => {
      queryClient.setQueryData(["todos"], (oldData: TodoType[]) => {
        return oldData.map((todo) => {
          if (todo._id === response.todo._id) {
            return { ...todo, completed: response.todo.completed };
          }
          return todo;
        });
      });
      updateSuccessToast();
    },
    onError: (error: any) => {
      updateErrorToast(error.message);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async ({ data }: { data: DeleteTodoDataType }) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteTodo`,
        { data }
      );
      return response.data;
    },
    onSuccess: (response: DeleteTodoReturnType) => {
      queryClient.setQueryData(["todos"], (oldData: TodoType[]) => {
        return oldData.filter((todo) => todo._id !== response.todo._id);
      });
      deleteSuccessToast();
    },
    onError: (error: any) => {
      deleteErrorToast(error.message);
    },
  });

  const deleteTodo = (todoId: string) => {
    const dataToSubmit = {
      todoId,
      userId: user?.id || "",
    };
    deleteTodoMutation.mutate({ data: dataToSubmit });
  };

  const todaysTodos = todos.filter((todo) => {
    const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
    const { DDMMYYYY: todaysDDMMYYYY } = getDateInfo(new Date());
    return todoDDMMYYYY === todaysDDMMYYYY;
  });

  const isAnyMutationPending =
    toggleCompletedMutation.isPending || deleteTodoMutation.isPending;

  return isAnyMutationPending ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 w-8/12">
      {isEditTodoOpen && (
        <UpsertTodoModal
          onClose={() => setIsEditTodoOpen(false)}
          todoCategories={categories}
          initialValues={initialValues as UpsertTodoFormDataType}
        />
      )}
      {todaysTodos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          hoveredTodoId={hoveredTodoId}
          setHoveredTodoId={setHoveredTodoId}
          toggleCompletedMutation={toggleCompletedMutation}
          setInitialValues={setInitialValues}
          setIsEditTodoOpen={setIsEditTodoOpen}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodosList;
