"use client";

import Card from "@/app/components/Card";
import OpenNavbarButton from "@/app/components/OpenNavbarButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Input from "@/app/components/Input";
import FormElement from "@/app/components/FormElement";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useCustomToast from "@/hooks/useCustomToast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Zoom } from "react-toastify";
type UsernameFormDataType = {
  id: string;
  username: string;
};

type EmailFormDataType = {
  id: string;
  email: string;
};

type PasswordFormDataType = {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const SettingsPage = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: session, update } = useSession();

  const user = session?.user;

  const successToast = useCustomToast({
    message: "User updated successfully",
    hideProgressBar: true,
    transition: Zoom,
  });
  const errorToast = useCustomToast({
    message: "Failed to update user",
  });

  const {
    control: controlUsername,
    handleSubmit: handleSubmitUsername,
    formState: { errors: errorsUsername },
  } = useForm<UsernameFormDataType>({
    defaultValues: {
      username: user?.username || "",
    },
    mode: "onSubmit",
  });

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<EmailFormDataType>({
    defaultValues: {
      email: user?.email || "",
    },
    mode: "onSubmit",
  });

  const {
    control: controlPassword,
    watch: watchPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<PasswordFormDataType>({
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const updateUserMutation = useMutation({
    mutationFn: async (
      data: UsernameFormDataType | EmailFormDataType | PasswordFormDataType
    ) => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/updateUser/${user?.id}`,
        data
      );

      return response.data;
    },
    onSuccess: async (data: any) => {
      await update({
        ...session,
        user: {
          ...session?.user,
          ...data.user,
        },
      });

      successToast();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.error || "Error updating user");
      } else {
        errorToast("Error updating user");
      }
    },
  });

  const onSubmitUsername = async (data: UsernameFormDataType) => {
    await updateUserMutation.mutateAsync({ ...data, id: user?.id || "" });
  };

  const onSubmitEmail = async () => {
    // eslint-disable-next-line no-console
    console.log("to be implemented sometime in the future (or not) :)");
    // await updateUserMutation.mutateAsync({ ...data, id: user?.id || "" });
  };

  const onSubmitPassword = async () => {
    // eslint-disable-next-line no-console
    console.log("to be implemented sometime in the future (or not) :)");
    // await updateUserMutation.mutateAsync({ ...data, id: user?.id || "" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150 font-lato">
      <OpenNavbarButton />
      <Tabs defaultValue="username" className="w-[500px]">
        <TabsList className="w-full">
          <TabsTrigger value="username" className="w-1/3">
            Username
          </TabsTrigger>
          <TabsTrigger value="email" className="w-1/3">
            Email
          </TabsTrigger>
          <TabsTrigger value="password" className="w-1/3">
            Password
          </TabsTrigger>
        </TabsList>

        {/* username */}
        <TabsContent value="username">
          <Card className="py-4" hasPadding={false} height="h-[250px]">
            <form
              onSubmit={handleSubmitUsername(onSubmitUsername)}
              className="flex flex-col justify-center gap-2 h-full"
            >
              <FormElement errorMsg={errorsUsername.username?.message}>
                <Controller
                  control={controlUsername}
                  name="username"
                  rules={{
                    required: "Username is required",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Username"
                      value={field.value || ""}
                    />
                  )}
                />
              </FormElement>
              <Button type="submit" className="w-full">
                Change username
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* email */}
        <TabsContent value="email">
          <Card className="py-4" hasPadding={false} height="h-[250px]">
            <form
              onSubmit={handleSubmitEmail(onSubmitEmail)}
              className="flex flex-col gap-2"
            >
              <FormElement errorMsg={errorsEmail.email?.message}>
                <Controller
                  control={controlEmail}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Email"
                    />
                  )}
                />
              </FormElement>
              <Button type="submit" className="w-full">
                Change email
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* password */}
        <TabsContent value="password">
          <Card
            hasPadding={false}
            className="py-6"
            height={
              Object.values(errorsPassword).length > 0
                ? "h-[300px]"
                : "h-[250px]"
            }
          >
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="flex flex-col gap-2 items-center"
            >
              <FormElement errorMsg={errorsPassword.oldPassword?.message}>
                <Controller
                  control={controlPassword}
                  name="oldPassword"
                  rules={{
                    required: "Old password is required",
                  }}
                  render={({ field }) => (
                    <div className="w-full relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        {...field}
                        placeholder="Old Password"
                        value={field.value || ""}
                      />
                      {showOldPassword ? (
                        <Eye
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowOldPassword(!showOldPassword);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowOldPassword(!showOldPassword);
                          }}
                        />
                      )}
                    </div>
                  )}
                />
              </FormElement>
              <FormElement errorMsg={errorsPassword.password?.message}>
                <Controller
                  control={controlPassword}
                  name="password"
                  rules={{
                    required: "New password is required",
                  }}
                  render={({ field }) => (
                    <div className="w-full relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="New Password"
                        value={field.value || ""}
                      />
                      {showPassword ? (
                        <Eye
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </div>
                  )}
                />
              </FormElement>
              <FormElement errorMsg={errorsPassword.confirmPassword?.message}>
                <Controller
                  control={controlPassword}
                  name="confirmPassword"
                  rules={{
                    required: "Confirm password is required",
                    validate: (value) => {
                      if (value !== watchPassword("password")) {
                        return "Passwords do not match";
                      }
                    },
                  }}
                  render={({ field }) => (
                    <div className="w-full relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        placeholder="Confirm Password"
                        value={field.value || ""}
                      />
                      {showConfirmPassword ? (
                        <Eye
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          size={16}
                          onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        />
                      )}
                    </div>
                  )}
                />
              </FormElement>
              <Button type="submit" className="w-full mt-2">
                Change password
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
