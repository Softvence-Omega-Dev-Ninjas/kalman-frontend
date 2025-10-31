// src/pages/auth/UpdatePass.tsx
import React, { useState, useEffect } from "react";
import { useUpdatePasswordMutation } from "@/redux/features/auth/forgotPasswordApi";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePass: React.FC = () => {

        useEffect(()=>{
          document.title = `Forgot Password | Stavbar`
        }, [])
      
  const [password, setPassword] = useState("");
  const [email] = useState(localStorage.getItem("verified_email") || "");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter a new password!");
      return;
    }
    try {
      await updatePassword({ email, password }).unwrap();
      
      localStorage.removeItem("forgot_email");
      localStorage.removeItem("verified_email");
      navigate("/");
      toast("Password updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Update Password</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-primary text-white hover:bg-primary/90"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePass;
