"use client";

import { useForm, Controller } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import FormElement from "../components/FormElement";
import { SignupFormData } from "../common/types";
import ConnectButton from "../components/ConnectButton";
import { useRouter } from "next/navigation";
import request from "../common/functions/request";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ConnectWithGithub from "../components/ConnectWithGithub";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const signupWithGithub = async () => {
    try {
      setIsSubmitting(true);
      const result = await signIn("github", {
        callbackUrl: "/",
        redirect: true,
      });

      if (result?.error) {
        setIsSubmitting(false);
        toast.error("Failed to connect with GitHub");
        return;
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Failed to connect with GitHub");
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    const { email, password, username } = data;

    try {
      setIsSubmitting(true);
      const response = await request({
        data: { email, password, username },
        url: `register`,
      });

      if (response.error) {
        setError("root", { message: response.error });
        return;
      }

      if (response.user) {
        router.push("/login?userCreated=true");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setError("root", {
        message: "Server is not responding. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full transition-all duration-150">
      <div className="w-[300px] sm:w-[500px] mx-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 py-12 px-6 sm:px-20 h-fit drop-shadow-lg shadow-black rounded-lg transition-all duration-150 dark:text-white">
        <p className="text-xl sm:text-2xl font-bold font-geistSans transition-all duration-150">
          Sign Up
        </p>
        <p className="opacity-80 font-geistSans mb-4 text-center text-sm sm:text-base transition-all duration-150">
          Fill in the form to create your account
        </p>
        <form
          className="w-full flex flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
          id="signup-form"
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            }}
            render={({ field }) => (
              <FormElement
                errorMsg={errors?.username?.message}
                InputProps={{
                  type: "text",
                  placeholder: "Username",
                  ...field,
                  value: field.value || "",
                }}
              />
            )}
          />

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
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <FormElement
                errorMsg={errors?.password?.message}
                InputProps={{
                  type: "password",
                  placeholder: "Password",
                  ...field,
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
            render={({ field }) => (
              <FormElement
                errorMsg={errors?.confirmPassword?.message}
                InputProps={{
                  type: "password",
                  placeholder: "Confirm Password",
                  ...field,
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
          <ConnectButton text="Sign up" />
        </form>

        <div className="flex items-center justify-center gap-2 font-lato opacity-80 mb-2 transition-all duration-150 text-xs sm:text-sm">
          <p>Already have an account?</p>
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-150"
          >
            Sign in
          </Link>
        </div>
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
          <span className="text-sm sm:text-base">or</span>
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 transition-all duration-150"></div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          {/* <ConnectWithDiscord
            text="Sign up with Discord"
            onClick={signupWithDiscord}
          /> */}
          <ConnectWithGithub
            text="Sign up with Github"
            onClick={signupWithGithub}
          />
        </div>
        <div className="text-xs sm:text-sm font-geistSans opacity-80 text-center transition-all duration-150">
          Placeholder for privacy policy and other stuff like that
        </div>
      </div>
    </div>
  );
};

export default Signup;
