import clsx from "clsx";
import {
  TodoPriorityType,
  TodoType,
  UpsertTodoFormDataType,
} from "../lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { UseMutationResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getPriorityColor } from "../lib/functions";
import { getDateInfo } from "@/app/common/functions/getTemporalInfo";
import { getTimeInfo } from "@/app/common/functions/getTemporalInfo";

const TodoCard = ({
  todo,
  hoveredTodoId,
  setHoveredTodoId,
  toggleCompletedMutation,
  setInitialValues,
  setIsEditTodoOpen,
  deleteTodo,
}: {
  todo: TodoType;
  hoveredTodoId: string | null;
  setHoveredTodoId: (id: string | null) => void;
  toggleCompletedMutation: UseMutationResult<any, any, any, any>;
  setInitialValues: (values: UpsertTodoFormDataType) => void;
  setIsEditTodoOpen: (open: boolean) => void;
  deleteTodo: (id: string) => void;
}) => {
  const { DDMMYYYY: todoDDMMYYYY } = getDateInfo(new Date(todo?.dateFor));
  const todoHHMMSS = getTimeInfo(todo?.timeFor || "");

  return (
    <div
      key={todo?._id}
      className={clsx(
        "px-4 py-2 shadow-md rounded-md w-full flex gap-4 text-dark dark:text-light",
        hoveredTodoId === todo?._id && "line-through",
        todo?.completed &&
          "line-through bg-gray-300/50 dark:bg-gray-700/50 opacity-90",
        !todo?.completed &&
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
          checked={todo?.completed}
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
            <p className="text-base font-roboto font-bold">{todo?.title}</p>
            <FontAwesomeIcon
              icon={faPen}
              className="flex justify-center items-center text-sm cursor-pointer"
              onClick={() => {
                setInitialValues({
                  _id: todo._id,
                  title: todo?.title,
                  description: todo?.description,
                  dateFor: todo?.dateFor,
                  timeFor: todo?.timeFor,
                  priority: todo?.priority as TodoPriorityType,
                  category: todo?.category?.name,
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
          <p className="text-sm font-geistSans">{todo?.description}</p>
          <p
            className={clsx(
              "text-sm font-geistSans",
              getPriorityColor(todo?.priority as TodoPriorityType)
            )}
          >
            {todo?.priority?.slice(0, 1).toUpperCase() +
              todo?.priority?.slice(1)}{" "}
            priority
          </p>
        </div>

        <div className="flex flex-col items-end justify-end">
          <p className="font-geistSans">{todo?.category?.name}</p>
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
};

export default TodoCard;
