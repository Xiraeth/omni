"use client";

import { useForm, Controller } from "react-hook-form";

import FormElement from "../components/FormElement";
import { LoginFormData } from "../common/types";
import Link from "next/link";
import ConnectButton from "../components/ConnectButton";
import LinkButton from "../components/LinkButton";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { changeUrlParams } from "../common/functions/changeParams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ConnectWithGithub from "../components/ConnectWithGithub";
import ConnectWithDiscord from "../components/ConnectWithDiscord";

const Login = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const userCreated = searchParams.get("userCreated");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userCreatedToast = () => {
    toast("User created successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: true,
      type: "success",
      theme,
    });
  };

  useEffect(() => {
    if (userCreated === "true") {
      changeUrlParams({ params: "userCreated", value: null });
      userCreatedToast();
    }
  }, [userCreated]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const loginWithGithub = async () => {
    try {
      setIsSubmitting(true);
      const result = await signIn("github", {
        callbackUrl: "http://localhost:3000",
        redirect: false,
      });

      if (result?.error) {
        toast.error("Failed to connect with GitHub");
        setIsSubmitting(false);
        return;
      }

      if (result?.url) {
        setIsSubmitting(false);
        router.push(result.url);
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Failed to connect with GitHub");
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError("root", { message: result.error });
        setIsSubmitting(false);
        return;
      }

      if (result?.ok) {
        setIsSubmitting(false);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("root", {
        message: "Server is not responding. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <ToastContainer className="relative z-50" />
      <div className="w-[300px] sm:w-[500px] mx-auto bg-zinc-50 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
        <p className="text-xl sm:text-2xl font-bold font-geistSans transition-all duration-150">
          Login
        </p>
        <form
          className="w-full flex flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
          id="login-form"
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormElement
                errorMsg={errors?.email?.message}
                InputProps={{
                  type: "email",
                  placeholder: "Email",
                  ...field,
                  value: field.value || "",
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <FormElement
                errorMsg={errors?.password?.message}
                InputProps={{
                  type: "password",
                  placeholder: "Password",
                  ...field,
                  value: field.value || "",
                }}
              />
            )}
          />
          {isSubmitting && (
            <div className="w-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-4 h-4 animate-spin"
              />
            </div>
          )}
          {errors?.root?.message && (
            <p className="text-red-500 font-bold text-xs font-geistSans">
              {errors?.root?.message}
            </p>
          )}
          <ConnectButton text="Log in" />
        </form>
        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-2 transition-all duration-150 text-xs sm:text-sm">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-150"
          >
            Sign up
          </Link>
        </div>
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
          <span className="text-sm sm:text-base">or</span>
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <ConnectWithGithub
            onClick={loginWithGithub}
            text="Login with Github"
          />
        </div>
        <div className="text-xs sm:text-sm font-geistSans opacity-80 text-center transition-all duration-150">
          Placeholder for privacy policy and other stuff like that
        </div>
      </div>
    </div>
  );
};

export default Login;
