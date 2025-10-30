/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineEye,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../assets/sample_images/LoginImg.png";
import { useLoginMutation } from "@/redux/features/auth/login";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

const TradeLogInComponent: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: false },
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

  const onSubmit = async (data: FormValues) => {
    // if (!data.rememberMe) {
    //       toast.error("You must agree to the terms before continuing!");
    //       return;
    //     }
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("Login result:", result.data?.user);
      if (result.success && result.data) {
        const token = result.data.token;
        console.log("Received Token:", token);
        const decodedToken = decodeJWT(token);
        console.log("Decoded Token:", decodedToken);
        
if(decodedToken.role !== "TRADEMAN"){
  toast.error("Only Trade Person are allow for login from here!")
  return
}
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

          // if (data.rememberMe) {
          //   localStorage.setItem("rememberMe", "true");
          // } else {
          //   localStorage.removeItem("rememberMe");
          // }
          if (result.data?.user?.firstName || result.data?.user?.lastName) {
            navigate("/");
          } else {
            navigate("/trade-person/personal-info");
          }
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left image */}
      <div className="flex items-center justify-center">
        <div className="w-full  max-w-[560px] rounded-xl overflow-hidden shadow-lg">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right form */}
      <div className="w-full max-w-md mx-auto">
        <div className="text-right mb-6 hidden lg:block">
          <div className="text-sm text-gray-800 font-semibold">
            Are you a tradesperson?{" "}
            <Link to="#" className="text-primary">
              Sign up
            </Link>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
          Welcome back
        </h1>
        <p className="text-gray-500 mt-2 mb-6 text-center">
          Enter your email and password to access your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <AiOutlineMail />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDEC9]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm font-semibold">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="w-4 h-4" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-primary">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: "#FF7346" }}
            className="w-full text-white py-3 rounded-md font-semibold mt-2 disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* <div className="flex items-center my-4 font-semibold">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="px-4 text-sm text-gray-400">Or Continue with</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-200 rounded-md py-2.5 flex items-center justify-center gap-3"
          >
            <FcGoogle />
            <span className="text-sm">Google</span>
          </button> */}

          <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
            Don't have an account?{" "}
            <Link to="/trade-signup" className="text-primary">
              Sign up
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600 mt-2 font-semibold">
            Are you a tradesperson?{" "}
            <Link to="#" className="text-primary">
              Register as a Tradesperson
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeLogInComponent;
