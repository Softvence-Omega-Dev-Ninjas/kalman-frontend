import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import loginImg from "../../assets/sample_images/LoginImg.png";
import { useAdminLoginMutation } from "@/redux/features/auth/login";
import { setAdmin } from "@/redux/features/admin/adminSlice";


const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useAdminLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Decode JWT
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (res.success && res.data) {
        const token = res.data;
        const decoded = decodeJWT(token);
    //  console.log(res)
        if (decoded) {
          const admin = {
            id: decoded.id,
            email: decoded.email,
            phone: decoded.phone,
            role: decoded.role,
          };

          dispatch(setAdmin({ admin, token }));

      

          toast.success(res.message || "Login successful!");
          navigate("/dashboard"); 
        } else {
          toast.error("Invalid token data");
        }
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const message =
        err?.data?.message || err?.error || "Login failed! Check your credentials.";
      toast.error(message);
    }
  };

  const handleGoogleLogin = () => {
    toast("Google login coming soon!");
  };

  return (
    <div className="min-h-screen bg-white flex items-start">
      <div className="max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
              <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2 mb-6 text-center">
              Enter your email and password to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AiOutlineMail size={20} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
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
                    className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                  >
                    {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                  </span>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm font-semibold">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                    disabled={isLoading}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: "#FF7346" }}
                className="w-full text-white py-3 rounded-md font-semibold mt-2 hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-4 font-semibold">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="px-4 text-sm text-gray-400">Or Continue with</div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-gray-200 rounded-md py-2.5 flex items-center justify-center gap-3 hover:bg-gray-50"
              >
                <FcGoogle size={20} />
                <span className="text-sm font-medium">Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
