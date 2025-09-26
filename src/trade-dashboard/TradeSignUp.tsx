import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import signupImg from "../assets/sample_images/SignUPImg.png"

const TradeSignUp: React.FC = () => {
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
                        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">Create your account</h1>
                        <p className="text-gray-500 mt-2 mb-6 text-center">Enter your email and password to create your account</p>

                        <form className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email *</label>
                                <div className="relative mt-2">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineMail /></span>
                                    <input type="email" placeholder="Enter your email" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Password *</label>
                                <div className="relative mt-2">
                                    <input type="password" placeholder="Enter your password" className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineEyeInvisible /></span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
                                <div className="relative mt-2">
                                    <input type="password" placeholder="Confirm your password" className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineEyeInvisible /></span>
                                </div>
                            </div>

                            <label className="flex items-start gap-3 text-sm text-gray-600 font-semibold">
                                <input type="checkbox" className="w-4 h-4 mt-1" />
                                <span>I agree to Theta Analyzer <Link to="#" className="text-primary">Licence Agreement</Link> and <Link to="#" className="text-primary">Privacy policy</Link></span>
                            </label>

                            <Link to='/trade-person/personal-info'>
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold mt-2">Register Now</button>
                            </Link>

                            <div className="flex items-center my-4 font-semibold">
                                <div className="flex-1 h-px bg-gray-200" />
                                <div className="px-4 text-sm text-black">Or Continue with</div>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            <button type="button" className="w-full border border-gray-200 rounded-md py-2.5 flex items-center justify-center gap-3">
                                <FcGoogle />
                                <span className="text-sm">Google</span>
                            </button>

                            <div className="text-center text-sm text-gray-600 mt-4 font-semibold">
                                Already have an account? <Link to="/general-login" className="text-primary">Log In Now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeSignUp