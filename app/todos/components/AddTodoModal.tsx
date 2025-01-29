import ButtonOuttline from "@/app/components/ButtonOuttline";
import Dropmenu from "@/app/components/Dropmenu";
import Modal from "@/app/components/Modal";
import {
  AddTodoFormDataType,
  TodoCategoryType,
  TodoPriorityType,
  TodoType,
} from "../types";
import { PRIORITY_OPTIONS } from "../constants";
import FormElement from "@/app/components/FormElement";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useCustomToast from "@/hooks/useCustomToast";

const AddTodoModalForm = ({
  onClose,
  todoCategories,
}: {
  onClose: () => void;
  todoCategories: TodoCategoryType[];
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const successToast = useCustomToast({
    message: "Todo added successfully",
    type: "success",
  });

  const errorToast = useCustomToast({
    type: "error",
  });

  const availableCategories = todoCategories.map((category) => category.name);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<AddTodoFormDataType>();

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: async (data: AddTodoFormDataType) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addTodo`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], (oldData: TodoType[]) =>
        oldData ? [...oldData, data] : [data]
      );
      successToast();
      onClose();
    },
    onError: (error: any) => {
      errorToast(error.message);
    },
  });

  const onSubmit = (data: AddTodoFormDataType) => {
    const dataToSubmit = {
      ...data,
      userId: user?.id || "",
    };
    addTodoMutation(dataToSubmit);
  };

  return (
    <Modal onCancel={onClose}>
      <p className="text-xl font-bold">Add a new task</p>

      <form
        className="flex flex-col gap-4 w-full text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <FormElement
            width="w-full"
            errorMsg={errors?.title?.message as string}
          >
            <input
              type="text"
              id="title"
              className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
              placeholder="Title"
              autoComplete="off"
              {...register("title", { required: "Title is required" })}
            />
          </FormElement>

          <FormElement
            width="w-full"
            errorMsg={errors?.description?.message as string}
          >
            <input
              type="text"
              id="description"
              className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
              placeholder="Description"
              autoComplete="off"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </FormElement>
        </div>
        <div className="flex gap-4">
          <FormElement
            width="w-1/2"
            errorMsg={errors?.dateFor?.message as string}
          >
            <input
              type="date"
              id="dateFor"
              className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
              {...register("dateFor", { required: "Date is required" })}
            />
          </FormElement>

          <FormElement
            width="w-1/2"
            errorMsg={errors?.timeFor?.message as string}
          >
            <input
              type="time"
              id="timeFor"
              className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
              {...register("timeFor")}
            />
          </FormElement>
        </div>

        <div className="w-full flex gap-4">
          <FormElement
            width="w-full"
            errorMsg={errors?.priority?.message as string}
          >
            <Dropmenu
              options={PRIORITY_OPTIONS}
              placeholder="Priority"
              onSelect={(option) => {
                setSelectedPriority(option);
                setValue("priority", option as TodoPriorityType);
              }}
              value={selectedPriority || ""}
              width="w-full"
              {...register("priority", { required: "Priority is required" })}
            />
          </FormElement>

          <FormElement
            width="w-full"
            errorMsg={errors?.category?.message as string}
          >
            <Dropmenu
              options={availableCategories}
              placeholder="Category"
              onSelect={(option) => {
                setValue("category", option);
                setSelectedCategory(option);
              }}
              value={selectedCategory || ""}
              width="w-full"
              {...register("category", { required: "Category is required" })}
            />
          </FormElement>
        </div>
        <ButtonOuttline text="Add" type="submit" />
      </form>
    </Modal>
  );
};

export default AddTodoModalForm;
