import { useState } from "react";
import { TodoType, UpdateTodoData, UpdateTodoReturnType } from "../types";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCustomToast from "@/hooks/useCustomToast";
import {
  getDateInfo,
  getTimeInfo,
} from "@/app/common/functions/getTemporalInfo";

const TodoCard = ({ todos }: { todos: TodoType[] }) => {
  const [hoveredTodoId, setHoveredTodoId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const successToast = useCustomToast({ message: "Todo updated" });
  const errorToast = useCustomToast({
    message: "Failed to update todo",
    type: "error",
  });

  const toggleCompletedMutation = useMutation({
    mutationFn: async ({ data }: { data: UpdateTodoData }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateTodo`,
        { ...data }
      );
      return response.data;
    },
    onSuccess: (response: UpdateTodoReturnType) => {
      queryClient.setQueryData(["todos"], (oldData: TodoType[]) => {
        console.log(response);
        return oldData.map((todo) => {
          if (todo._id === response.todo._id) {
            return { ...todo, completed: response.todo.completed };
          }
          return todo;
        });
      });
      successToast();
    },
    onError: (error: any) => {
      errorToast(error.message);
    },
  });

  const todaysTodos = todos.filter((todo) => {
    const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
    const { DDMMYYYY: todaysDDMMYYYY } = getDateInfo(new Date());
    return todoDDMMYYYY === todaysDDMMYYYY;
  });

  return (
    <div className="flex flex-col gap-4 w-8/12">
      {todaysTodos.map((todo) => {
        const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));

        const todoHHMMSS = getTimeInfo(todo?.timeFor || "");

        return (
          <div
            key={todo._id}
            className={clsx(
              "px-4 py-2 border-[1px] border-black/20 shadow-md bg-white/20 rounded-md w-full flex gap-4",
              hoveredTodoId === todo._id && "line-through",
              todo.completed && "line-through"
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
                <p className="text-base font-roboto font-bold">{todo.title}</p>
                <p className="text-sm font-geistSans">{todo.description}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-sm font-geistSans">{todoDDMMYYYY}</p>
                <p className="text-sm font-geistSans">{todoHHMMSS}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoCard;
