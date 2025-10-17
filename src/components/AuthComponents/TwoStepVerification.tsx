import React, { useState } from "react";
import { Mail, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useSendOtpByEmailMutation } from "@/redux/features/auth/register";

const options = [
  {
    id: "email",
    title: "Get verification code at your email",
    description: "We will send a 6-digit code to your email",
    icon: <Mail className="w-5 h-5 text-gray-600" />,
  },
];

interface TwoStepVerificationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}

const TwoStepVerification: React.FC<TwoStepVerificationProps> = ({ step, setStep, email }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [sendOtp, { isLoading }] = useSendOtpByEmailMutation();

  const handleOptionClick = async (optionId: string) => {
    if (isLoading) return; 
    setSelectedOption(optionId);

    try {
      await sendOtp({ email }).unwrap();
      console.log("OTP sent to:", email);
      toast.success("OTP sent to your email!");
      setStep(step + 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP!");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-black">
              2-Step Verification
            </h1>
            <p className="text-lg text-gray-500 mt-4 max-w-xl">
              To keep your account safe, we need to verify it's really you.
            </p>
          </div>

          {/* Right column */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-6">
              Choose your log in process:
            </h4>
            <div className="space-y-4">
              {options.map((opt) => (
                <label
                  key={opt.id}
                  className={`group block border ${
                    selectedOption === opt.id ? "border-[#FF7346]" : "border-gray-200"
                  } rounded-lg p-4 hover:shadow-sm cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center mt-1">
                        {opt.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{opt.title}</div>
                        <div className="text-sm text-gray-400 mt-1">{opt.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="two-step"
                        checked={selectedOption === opt.id}
                        onChange={() => handleOptionClick(opt.id)}
                        className="w-4 h-4 text-[#FF7346] cursor-pointer"
                      />
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoStepVerification;
