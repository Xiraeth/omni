"use client";

import FormElement from "@/app/components/FormElement";
import Input from "@/app/components/Input";
import { Button } from "@/components/ui/button";
import useCustomToast from "@/hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LucideArrowLeft, LucideLoader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type ResetPasswordFormData = {
  userId: string;
  password: string;
  confirmPassword?: string;
};

const ResetPasswordPage = () => {
  const { id: userId } = useParams();
  const router = useRouter();

  const successToast = useCustomToast({ type: "success" });
  const errorToast = useCustomToast({ type: "error" });

  const { mutate: resetPasswordMutation, isPending } = useMutation({
    mutationFn: async (data: ResetPasswordFormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/resetPassword/${userId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      successToast("Password reset successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.error || "Error resetting password");
      } else {
        errorToast("Error resetting password");
      }
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    mode: "onSubmit",
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation({
      userId: userId as string,
      password: data.password,
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full transition-all duration-150 text-dark dark:text-light font-lato`}
    >
      <div className="absolute top-0 left-0 p-4">
        <LucideArrowLeft
          className="cursor-pointer"
          onClick={() => router.push("/login")}
        />
      </div>
      <div className="w-[300px] sm:w-[500px] mx-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-4 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
        <p className="text-xl font-bold">Enter your new password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Enter your password",
            }}
            render={({ field }) => (
              <FormElement errorMsg={errors.password?.message as string}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  value={field.value || ""}
                  className="text-sm"
                />
              </FormElement>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm your password",
              validate: (value) => {
                if (value !== watch("password"))
                  return "Passwords do not match";
                return true;
              },
            }}
            render={({ field }) => (
              <FormElement errorMsg={errors.confirmPassword?.message as string}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                  value={field.value || ""}
                  className="text-sm"
                />
              </FormElement>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <LucideLoader className="animate-spin" />
            ) : (
              "Change password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
