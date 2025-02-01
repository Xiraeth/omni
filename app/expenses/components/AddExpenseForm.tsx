import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import FormElement from "@/app/components/FormElement";
import NameInput from "@/app/components/NameInput";
import AmountInput from "@/app/components/AmountInput";
import DateInput from "@/app/components/DateInput";
import GenericButton from "@/app/components/GenericButton";
import useCustomToast from "@/hooks/useCustomToast";
import { EXPENSES_CATEGORIES } from "@/app/constants/constants";
import Dropmenu from "@/app/components/Dropmenu";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/app/context/UserContext";
import { ExpensesDataType, ExpensesFormDataType } from "../types";

const AddExpenseForm = ({
  setIsAddExpenseLoading,
}: {
  setIsAddExpenseLoading: (isLoading: boolean) => void;
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const successToast = useCustomToast({
    message: "Expense added successfully",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<ExpensesFormDataType>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      amount: "",
      date: "",
      category: undefined,
      userId: "",
    },
  });

  const { mutate: createExpense } = useMutation({
    mutationFn: async (data: ExpensesFormDataType) => {
      setIsAddExpenseLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
        data
      );
      if (response?.data?.error) {
        throw new Error(response.data.error);
      }
      return response.data.expense;
    },
    onSuccess: (data) => {
      setValue("name", "");
      setValue("amount", "");
      setValue("date", "");
      setValue("category", undefined);
      queryClient.setQueryData(
        ["expensesData"],
        (oldData: ExpensesDataType[]) => {
          return [...oldData, data];
        }
      );
      successToast();
      setIsAddExpenseLoading(false);
    },
    onError: (error: Error) => {
      setError("root", { message: error.message });
      setIsAddExpenseLoading(false);
    },
  });

  const onSubmit = async (data: ExpensesFormDataType) => {
    const dataToSubmit = {
      ...data,
      userId: user?.id || "",
    };

    if (Object.keys(errors).length === 0) {
      createExpense(dataToSubmit);
    }
  };

  return (
    <form
      id="add-income-row"
      onSubmit={handleSubmit(onSubmit)}
      className="w-10/12 py-4 pb-16 mx-auto flex flex-col lg:flex-row items-center md:items-start mt-20 gap-4 relative z-10"
    >
      <div className="lg:w-1/2 w-full">
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.name?.message}>
              <NameInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
      </div>

      <div className="flex gap-4 md:flex-row flex-col w-full lg:justify-end">
        <Controller
          control={control}
          name="category"
          rules={{
            required: "Category is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.category?.message}>
              <Dropmenu
                options={EXPENSES_CATEGORIES}
                placeholder="Category"
                value={value || ""}
                width="w-full min-w-[130px]"
                onSelect={(option) => onChange(option)}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.amount?.message}>
              <AmountInput
                onChange={(e) => onChange(Number(e.target.value))}
                value={value}
              />
            </FormElement>
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{
            required: "Date is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormElement errorMsg={errors?.date?.message}>
              <DateInput
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            </FormElement>
          )}
        />
        <GenericButton text="Add expense" width="md" />
      </div>
    </form>
  );
};

export default AddExpenseForm;
