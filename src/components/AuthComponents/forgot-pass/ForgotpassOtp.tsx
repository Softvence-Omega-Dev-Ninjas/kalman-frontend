// src/pages/auth/VerifyOtp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation, useSendOtpByEmailMutation } from "@/redux/features/auth/register";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";

const FordotPassOtp: React.FC = () => {

        useEffect(()=>{
          document.title = `Forgot Password | Stavbar`
        }, [])
      
        
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email] = useState(localStorage.getItem("forgot_email") || "");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtpByEmail, { isLoading: isResending }] = useSendOtpByEmailMutation();
  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const maskEmail = (email: string) => {
    if (!email) return "****@gmail.com";
    const [local, domain] = email.split("@");
    return local.length > 2 ? local.slice(0, 2) + "*".repeat(local.length - 2) + "@" + domain : "****@" + domain;
  };

  const handleSubmit = async (e?: React.FormEvent, autoSubmit = false) => {
    if (e) e.preventDefault();
    if (!autoSubmit && otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    if (otp.length !== 6) return;
    try {
      await verifyOtp({ otp: parseInt(otp), email }).unwrap();
      toast.success("OTP verified successfully!");
      localStorage.setItem("verified_email", email);
      navigate("/forgot-password/update-pass");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired OTP!");
      setOtp("");
    }
  };

  const handleResend = async () => {
    try {
      await sendOtpByEmail({ email }).unwrap();
      toast.success(`OTP resent to ${maskEmail(email)}`);
      setOtp("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster position="top-center" />
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold">Enter Verification Code</h2>
        <p className="text-gray-500 mb-4">OTP sent to {maskEmail(email)}</p>
        <InputOTP maxLength={6} value={otp} onChange={(v) => { setOtp(v); if (v.length === 6) handleSubmit(undefined, true); }}>
          <InputOTPGroup className="flex gap-3 justify-center">
            {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>
        <div className="text-sm text-gray-600 mb-4">
          Didn’t get the code?{" "}
          <button type="button" onClick={handleResend} disabled={isResending} className="text-primary cursor-pointer hover:underline disabled:text-gray-400">
            {isResending ? "Resending..." : "Resend"}
          </button>
        </div>
        <Button type="submit" disabled={isLoading || otp.length !== 6} className="w-full cursor-pointer">{isLoading ? "Verifying..." : "Confirm"}</Button>
      </form>
    </div>
  );
};

export default FordotPassOtp;
