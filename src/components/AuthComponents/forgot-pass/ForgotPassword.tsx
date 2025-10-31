// src/pages/auth/ForgotPassword.tsx
import React, { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "@/redux/features/auth/forgotPasswordApi";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ForgotPassword: React.FC = () => {

      useEffect(()=>{
        document.title = `Forgot Password | Stavbar`
      }, [])
    

  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    try {
      const res = await forgetPassword({ email }).unwrap();
      toast.success(res?.message || "OTP sent successfully!");
      localStorage.setItem("forgot_email", email);
      setEmail("");
      navigate("/forgot-password/verify-otp");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
        />
        <Button type="submit" disabled={isLoading} className={`w-full cursor-pointer ${isLoading ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"} text-white`}>
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>

        <p className="text-gray-500 text-sm mt-3">
          Enter your registered email address and we will send you a 6-digit verification code to reset your password.
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Make sure to check your inbox and spam folder.
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
