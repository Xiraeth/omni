import { Controller, useForm } from "react-hook-form";
import {
  TodoCategoryType,
  TodoFormDataReturnType,
  TodoFormDataType,
} from "../lib/types";
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
          <div className="flex flex-col xl:items-center w-full">
            <label htmlFor="name" className="text-center xl:text-start">
              Name
            </label>

            <FormElement errorMsg={errors?.name?.message} width="w-10/12">
              <input
                {...register("name")}
                id="name"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
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
          <div className="flex flex-col xl:items-center w-full">
            <label htmlFor="description" className="text-center xl:text-start">
              Description
            </label>

            <FormElement
              errorMsg={errors?.description?.message}
              width="w-10/12"
            >
              <input
                {...register("description")}
                id="description"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="font-lato drop-shadow-md border-[1px] rounded-md p-2 w-full transition-all duration-200 min-w-32 text-dark dark:text-light hover:border-buttonBorderLightHover dark:border-slate-600 dark:hover:border-slate-500 dark:bg-buttonBgDark bg-buttonBgLight focus:dark:border-amber-400 focus:border-sky-400 focus:dark:bg-buttonBgDarkFocus focus:bg-buttonBgLightFocus outline-none"
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
