import React, { useRef, useState } from "react";
import verifyCodeImg from "../../assets/sample_images/enterCodeImg.png";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "@/redux/features/auth/register";
// import { useVerifyOtpMutation } from "../../redux/api/authApi"; // Adjust import path as needed

interface EnterVerificationCodeProps {
  email: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EnterVerificationCode: React.FC<EnterVerificationCodeProps> = ({
  email,
}) => {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]); // 6-digit OTP
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (idx: number) => {
    const el = inputsRef.current[idx];
    if (el) el.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      const next = [...values];
      next[idx] = "";
      setValues(next);
      return;
    }

    // if user pasted multiple digits, distribute
    if (val.length > 1) {
      const chars = val.split("");
      const next = [...values];
      for (let i = 0; i < chars.length && idx + i < 6; i++)
        next[idx + i] = chars[i];
      setValues(next);
      const nextFocus = Math.min(5, idx + val.length);
      focusInput(nextFocus);
      return;
    }

    const next = [...values];
    next[idx] = val;
    setValues(next);
    if (idx < 5 && val) focusInput(idx + 1);
    
    // Auto-submit when all fields are filled
    if (idx === 5 && val) {
      const code = next.join("");
      if (code.length === 6) {
        handleSubmit();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      const prevIdx = idx - 1;
      const next = [...values];
      next[prevIdx] = "";
      setValues(next);
      focusInput(prevIdx);
    }
    if (e.key === "ArrowLeft" && idx > 0) focusInput(idx - 1);
    if (e.key === "ArrowRight" && idx < 5) focusInput(idx + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const chars = paste.split("").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setValues(next);
    const focusIdx = Math.min(5, chars.length - 1);
    focusInput(focusIdx);
    e.preventDefault();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const code = values.join("");
    if (code.length < 6) {
      alert("Please enter the 6-digit code");
      return;
    }

    try {
      const result = await verifyOtp({
        otp: parseInt(code),
        email: email, // Make sure email is passed as prop
      }).unwrap();

      // If verification is successful, navigate to home or next step
      console.log("OTP verification successful:", result);
      navigate("/");
      
    } catch (err: any) {
      console.error("OTP verification failed:", err);
      // Handle error - you might want to show an error message to the user
      alert(err?.data?.message || "Verification failed. Please try again.");
      
      // Clear the input fields on error
      setValues(["", "", "", "", "", ""]);
      focusInput(0);
    }
  };

  const handleResend = () => {
    // You can implement resend OTP logic here
    // This would typically call a resend OTP API endpoint
    alert("New verification code sent to your email");
    
    // Clear current input
    setValues(["", "", "", "", "", ""]);
    focusInput(0);
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    if (!email) return "****@gmail.com";
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.length > 2 
      ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2)
      : '****';
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* left image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={verifyCodeImg}
                alt="verify"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-5 text-center py-5">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Enter the verification code
            </h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Please enter the 6-digit code we've sent to {maskEmail(email)}
            </p>

            {error && (
              <div className="text-red-500 text-sm mb-4">
                {('data' in error) 
                  ? (error as any).data?.message 
                  : "Verification failed. Please try again."}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3 mb-4">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    value={values[i]}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="w-12 h-12 rounded-md border border-gray-200 flex items-center justify-center text-lg font-medium text-center focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label={`digit-${i + 1}`}
                    disabled={isLoading}
                  />
                ))}
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Didn't get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary hover:text-primary-dark disabled:text-gray-400"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || values.join("").length !== 6}
                className="px-5 py-2 rounded-md text-white bg-primary w-full hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterVerificationCode;