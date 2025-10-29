/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import signupImg from "../assets/sample_images/SignUPImg.png";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignupMutation } from "@/redux/features/auth/register";

interface GeneralSignUpProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const GeneralSignUp: React.FC<GeneralSignUpProps> = ({
  setStep,
  setUserEmail,
}) => {
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
  });

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.agreement) {
      toast.error("You must agree to the terms before continuing!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match!" });
      return;
    }

    try {
      const result = await signup({
        email: data.email,
        password: data.password,
        role: "CUSTOMER",
      }).unwrap();

      toast.success(result?.message);

      if (result?.message?.toLowerCase().includes("already exist")) return;

      setUserEmail(result?.data?.email);
      setStep(2);
    } catch (err: any) {
      const messages = err?.data?.message;
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(messages || "Signup failed!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={signupImg}
                alt="Sign up"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right form */}
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              Create your account
            </h1>
            <p className="text-gray-500 mt-2 mb-6 text-center">
              Enter your email and password to create your account
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineMail />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-lg focus:outline-none ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password *
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full pl-4 pr-11 py-3 bg-gray-50 border rounded-lg focus:outline-none ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("password", {
                      required: "Please enter your password.",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long.",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`w-full pl-4 pr-11 py-3 bg-gray-50 border rounded-lg focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password.",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match.",
                    })}
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 text-sm text-gray-600 font-semibold">
                <Checkbox
                  id="agreement"
                  checked={watch("agreement")}
                  onCheckedChange={() =>
                    (
                      document.querySelector(
                        'input[name="agreement"]'
                      ) as HTMLInputElement
                    ).click()
                  }
                  className="mt-1 border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="agreement"
                  className="leading-snug cursor-pointer"
                >
                  I agree to Theta Analyzer{" "}
                  <Link to="/licence" className="text-primary hover:underline">
                    Licence Agreement
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    Privacy policy
                  </Link>
                </label>
              </div>

              <input
                type="checkbox"
                {...register("agreement", { required: true })}
                className="hidden"
              />
              {errors.agreement && (
                <p className="text-red-500 text-sm mt-1">
                  You must agree to the terms before continuing.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary cursor-pointer text-white py-3 rounded-md font-semibold mt-2 hover:bg-primary/90 transition-colors"
              >
                {isLoading ? "Registering..." : "Register Now"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
              Already have an account?{" "}
              <Link
                to="/general-login"
                className="text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSignUp;
