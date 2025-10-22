"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/features/auth/forgotPasswordApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic client validation
    if (!formData.old_password || !formData.new_password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const res = await resetPassword(formData).unwrap();
      toast.success(res.message || "Password reset successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password!");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>
            <Input
              type="password"
              name="old_password"
              placeholder="Enter old password"
              value={formData.old_password}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              type="password"
              name="new_password"
              placeholder="Enter new password"
              value={formData.new_password}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
