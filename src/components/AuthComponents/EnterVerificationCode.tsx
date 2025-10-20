import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "@/redux/features/auth/register";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import verifyCodeImg from "../../assets/sample_images/enterCodeImg.png";
import toast, { Toaster } from "react-hot-toast";

interface EnterVerificationCodeProps {
  email: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EnterVerificationCode: React.FC<EnterVerificationCodeProps> = ({ email }) => {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // toast.error("Please enter the 6-digit code");
    if (otp.length !== 6) {
      // toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      const result = await verifyOtp({ otp: parseInt(otp), email }).unwrap();
      toast.success("OTP verified successfully!");
      console.log("OTP verification successful:", result);
      navigate("/general-login");
    } catch (err: any) {
      console.error("OTP verification failed:", err);
      toast.error(err?.data?.message || "Verification failed. Please try again.");
      setOtp("");
    }
  };

  const handleResend = () => {
    // Add resend API call here if needed
    toast.success(`New verification code sent to ${maskEmail(email)}`);
    setOtp("");
  };

  const maskEmail = (email: string) => {
    if (!email) return "****@gmail.com";
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.length > 2
        ? localPart.substring(0, 2) + "*".repeat(localPart.length - 2)
        : "****";
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <Toaster position="top-center" />
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-cnter">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={verifyCodeImg}
                alt="verify"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* OTP form */}
          <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-5 text-center py-5">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Enter the verification code
            </h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Please enter the 6-digit code we've sent to {maskEmail(email)}
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-center mb-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    if (value.length === 6) handleSubmit();
                  }}
                  disabled={isLoading}
                >
                  <InputOTPGroup className="flex gap-3">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Didn’t get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary hover:underline disabled:text-gray-400"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </div>

              <Button
                type="submit"
                className="w-full "
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Confirm"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterVerificationCode;