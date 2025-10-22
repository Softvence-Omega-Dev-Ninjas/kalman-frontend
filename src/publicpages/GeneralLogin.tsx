"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImg from "../assets/sample_images/LoginImg.png";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/login";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const GeneralLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const onSubmit = async (data: LoginFormInputs) => {
    if (!data.rememberMe) {
          toast.error("You must agree to the terms before continuing!");
          return;
        }
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result.success && result.data) {
        const token = result.data;
        const decodedToken = decodeJWT(token);

        if (decodedToken) {
          const userData = {
            id: decodedToken.id,
            email: decodedToken.email,
            phone: decodedToken.phone,
            role: decodedToken.role,
          };

          dispatch(
            setUser({
              user: userData,
              token,
            })
          );

          toast.success(result.message || "Login successful!");

          if (data.rememberMe) {
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberMe");
          }

          navigate("/");
        } else {
          toast.error("Failed to decode user information");
        }
      } else {
        toast.error("Login failed: Invalid response format");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Login failed! Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Google login coming soon!");
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={loginImg}
                alt="Login"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              Welcome back
            </h1>
            <p className="text-gray-500 mt-2 mb-6 text-center">
              Enter your email and password to access your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineMail size={20} />
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

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm font-semibold">
                <div className="flex items-start gap-3 text-gray-600 font-semibold">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    )}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="leading-snug cursor-pointer select-none"
                  >
                    Remember Me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-primary cursor-pointer text-white font-semibold py-3 rounded-md hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="flex items-center my-4 font-semibold">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="px-4 text-sm text-gray-400">
                  Or Continue with
                </div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              

              {/* Google login */}
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border border-gray-200 flex items-center justify-center gap-3"
              >
                <FcGoogle size={20} />
                <span className="text-sm font-medium">Google</span>
              </Button>

              {/* Sign up links */}
              <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
                Don’t have an account?{" "}
                <Link
                  to="/general-signup"
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLogin;

