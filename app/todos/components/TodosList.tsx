import { useState } from "react";
import {
  UpsertTodoFormDataType,
  DeleteTodoDataType,
  DeleteTodoReturnType,
  TodoPriorityType,
  TodoType,
  UpdateCheckedTodoDataType,
  UpdateCheckedTodoReturnType,
} from "../lib/types";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCustomToast from "@/hooks/useCustomToast";
import {
  getDateInfo,
  getTimeInfo,
} from "@/app/common/functions/getTemporalInfo";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@/app/context/UserContext";
import AddTodoModal from "./UpsertTodoModal";
import { TodoCategoryType } from "../lib/types";
import { getPriorityColor } from "../lib/functions";

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

  const updateSuccessToast = useCustomToast({ message: "Todo updated" });
  const updateErrorToast = useCustomToast({
    message: "Failed to update todo",
    type: "error",
  });
  const deleteSuccessToast = useCustomToast({
    message: "Todo deleted",
    type: "success",
  });
  const deleteErrorToast = useCustomToast({
    message: "Failed to delete todo",
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
        console.log(response);
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

  return (
    <div className="flex flex-col gap-4 w-8/12">
      {isEditTodoOpen && (
        <AddTodoModal
          onClose={() => setIsEditTodoOpen(false)}
          todoCategories={categories}
          initialValues={initialValues as UpsertTodoFormDataType}
        />
      )}
      {todaysTodos.map((todo) => {
        const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
        const todoHHMMSS = getTimeInfo(todo?.timeFor || "");

        return (
          <div
            key={todo._id}
            className={clsx(
              "px-4 py-2 shadow-md rounded-md w-full flex gap-4 text-dark dark:text-light",
              hoveredTodoId === todo._id && "line-through",
              todo.completed &&
                "line-through bg-gray-300/50 dark:bg-gray-700/50 opacity-90",
              !todo.completed &&
                "border-black/20 dark:border-white/10 dark:bg-black/20 bg-white/20 border-[1px]"
            )}
          >
            <div
              onPointerEnter={() => {
                setHoveredTodoId(todo._id);
              }}
              onPointerLeave={() => {
                setHoveredTodoId(null);
              }}
              className="h-[16px] pt-[2px]"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => {
                  console.log(checked);
                  toggleCompletedMutation.mutate({
                    data: {
                      todoId: todo._id,
                      completed: checked as boolean,
                    },
                  });
                }}
              />
            </div>
            <div className="w-full flex justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <p className="text-base font-roboto font-bold">
                    {todo.title}
                  </p>
                  <FontAwesomeIcon
                    icon={faPen}
                    className="flex justify-center items-center text-sm cursor-pointer"
                    onClick={() => {
                      setInitialValues({
                        _id: todo._id,
                        title: todo.title,
                        description: todo.description,
                        dateFor: todo.dateFor,
                        timeFor: todo.timeFor,
                        priority: todo.priority as TodoPriorityType,
                        category: todo.category.name,
                      });
                      setIsEditTodoOpen(true);
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faTrash}
                    className="flex justify-center items-center text-sm cursor-pointer text-red-500"
                    onClick={() => {
                      deleteTodo(todo._id);
                    }}
                  />
                </div>
                <p className="text-sm font-geistSans">{todo.description}</p>
                <p
                  className={clsx(
                    "text-sm font-geistSans",
                    getPriorityColor(todo.priority)
                  )}
                >
                  {todo.priority?.slice(0, 1).toUpperCase() +
                    todo.priority?.slice(1)}{" "}
                  priority
                </p>
              </div>

              <div className="flex flex-col items-end justify-end">
                <p className="font-geistSans">{todo.category.name}</p>
                <p className="text-sm font-geistSans opacity-70 italic">
                  {todoDDMMYYYY}
                </p>
                <p className="text-sm font-geistSans opacity-70 italic">
                  {todoHHMMSS}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodosList;
