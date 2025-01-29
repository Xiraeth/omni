import { Controller, useForm } from "react-hook-form";
import {
  TodoCategoryType,
  TodoFormDataReturnType,
  TodoFormDataType,
} from "../types";
import FormElement from "@/app/components/FormElement";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/hooks/useCustomToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ButtonOuttline from "@/app/components/ButtonOuttline";

const CreateCategoryForm = ({
  onCancelClick,
}: {
  onCancelClick: () => void;
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const successToast = useCustomToast({
    type: "success",
    message: "Category created",
  });

  const errorToast = useCustomToast({
    type: "error",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormDataType>({ mode: "onSubmit" });

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: async (data: TodoFormDataType) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/addTodoCategory`,
        data
      );

      if (response?.data?.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onSuccess: (data: TodoFormDataReturnType) => {
      queryClient.setQueryData(
        ["todoCategories"],
        (oldData: TodoCategoryType[] | undefined) => {
          return [...(oldData || []), data.category];
        }
      );
      onCancelClick();
      successToast();
    },
    onError: (error: Error) => {
      errorToast(error.message);
    },
  });

  const onSubmit = (data: TodoFormDataType) => {
    const dataToSend = {
      name: data.name,
      description: data.description,
      userId: user?.id || "",
    };
    createCategory(dataToSend);
  };

  return isPending ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin size-8 text-dark dark:text-light"
      />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full text-sm items-center"
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col xl:items-center">
            <label htmlFor="name" className="text-center xl:text-start">
              Name
            </label>

            <FormElement errorMsg={errors?.name?.message}>
              <input
                {...register("name")}
                id="name"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2 border-[1px] border-black/15 rounded-md outline-none bg-white/10 hover:bg-white/20 focus:border-black/25 focus:bg-white/35 transition-all duration-150 shadow-sm dark:border-white/15 dark:bg-black/20 dark:hover:bg-black/30 dark:focus:border-white/25 dark:focus:bg-black/30 w-11/12 xl:w-full"
                autoComplete="off"
              />
            </FormElement>
          </div>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col xl:items-center">
            <label htmlFor="description" className="text-center xl:text-start">
              Description
            </label>

            <FormElement errorMsg={errors?.description?.message}>
              <input
                {...register("description")}
                id="description"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2 border-[1px] border-black/15 rounded-md outline-none bg-white/10 hover:bg-white/20 focus:border-black/25 focus:bg-white/35 transition-all duration-150 shadow-sm dark:border-white/15 dark:bg-black/20 dark:hover:bg-black/30 dark:focus:border-white/25 dark:focus:bg-black/30 w-11/12 xl:w-full"
                autoComplete="off"
              />
            </FormElement>
          </div>
        )}
      />

      <div className="flex flex-col lg:flex-row justify-center w-full gap-4 mt-4 text-xs">
        <ButtonOuttline text="Cancel" onClick={onCancelClick} />
        <ButtonOuttline text="Create" type="submit" />
      </div>
    </form>
  );
};

export default CreateCategoryForm;
