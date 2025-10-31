import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImg from "../../assets/sample_images/LoginImg.png";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/login";


interface LogInComponentProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const LogInComponent: React.FC<LogInComponentProps> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Function to decode JWT token and extract user info
    const decodeJWT = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const result = await login({
                email: formData.email,
                password: formData.password,
            }).unwrap();

            // Handle successful login
            if (result.success && result.data) {
                const token = result.data;
                
                // Decode the JWT token to get user information
                const decodedToken = decodeJWT(token);
                if (decodedToken) {
                    const userData = {
                        id: decodedToken.id,
                        email: decodedToken.email,
                        phone: decodedToken.phone,
                        role: decodedToken.role
                    };
                    // Dispatch user data and token to Redux store
                    dispatch(setUser({
                        user: userData,
                        token: token
                    }));

                    toast.success(result.message || "Login successful!");

                    // Save remember me preference
                    if (formData.rememberMe) {
                        localStorage.setItem("rememberMe", "true");
                    } else {
                        localStorage.removeItem("rememberMe");
                    }

                    // Redirect to home page
                    navigate("/");
                } else {
                    toast.error("Failed to decode user information");
                }

            } else {
                toast.error("Login failed: Invalid response format");
            }

        } catch (err: any) {
            console.error("Login error:", err);
            
            // Enhanced error handling
            const errorMessage = 
                err?.data?.message || 
                err?.error || 
                "Login failed! Please check your credentials.";
            
            toast.error(errorMessage);
        }
    };

    const handleGoogleLogin = () => {
        // Placeholder for Google OAuth integration
        toast.success("Google login coming soon!");
    };

    return (
        <div className="min-h-screen bg-white flex items-start">
            <div className="max-w-7xl w-full mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left image */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-lg">
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
                                <Link to="#" className="text-primary hover:underline">
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

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email *
                                </label>
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
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Password *
                                </label>
                                <div className="relative mt-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your password"
                                        className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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

                            {/* Remember me & Forgot password */}
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
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{ backgroundColor: "#FF7346" }}
                                className="w-full text-white py-3 rounded-md font-semibold mt-2 hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-4 font-semibold">
                                <div className="flex-1 h-px bg-gray-200" />
                                <div className="px-4 text-sm text-gray-400">
                                    Or Continue with
                                </div>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Google login */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full border border-gray-200 rounded-md py-2.5 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FcGoogle size={20} />
                                <span className="text-sm font-medium">Google</span>
                            </button>

                            {/* Sign up links */}
                            <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
                                Don't have an account?{" "}
                                <Link 
                                    to="/general-signup" 
                                    className="text-primary hover:underline"
                                >
                                    Sign up
                                </Link>
                            </div>

                            <div className="text-center text-sm text-gray-600 mt-2 font-semibold">
                                Are you a tradesperson?{" "}
                                <Link to="#" className="text-primary hover:underline">
                                    Register as a Tradesperson
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInComponent;