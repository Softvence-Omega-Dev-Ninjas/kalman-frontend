import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
import signupImg from "../assets/sample_images/SignUPImg.png";
// import { useSignupMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useSignupMutation } from "@/redux/features/auth/register";

interface GeneralSignUpProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const GeneralSignUp: React.FC<GeneralSignUpProps> = ({ setStep, setUserEmail }) => {
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        role: "CUSTOMER",
      }).unwrap();

      console.log(result?.data?.email);

      toast.success(result?.message);

      // ✅ Pass email to parent and go to verification
      setUserEmail(result?.data?.email);
      setStep(2);

      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (err: any) {
      console.error(err);
      toast.error((err?.data?.message as string) || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img src={signupImg} alt="Sign up" className="w-full h-full object-cover" />
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

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineMail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">Password *</label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </label>
                <div className="relative mt-2">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 text-sm text-gray-600 font-semibold">
                <input type="checkbox" className="w-4 h-4 mt-1" required />
                <span>
                  I agree to Theta Analyzer{" "}
                  <Link to="#" className="text-primary">Licence Agreement</Link> and{" "}
                  <Link to="#" className="text-primary">Privacy policy</Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-md font-semibold mt-2 hover:bg-primary/90 transition-colors"
              >
                {isLoading ? "Registering..." : "Register Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSignUp;
