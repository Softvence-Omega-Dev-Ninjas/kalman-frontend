import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import signupImg from "../assets/sample_images/SignUPImg.png"
import { useSignupMutation } from '@/redux/features/auth/register'
import { useForm } from 'react-hook-form'

type SignupForm = {
    email: string;
    password: string;
    confirmPassword?: string;
    role?: string;
    agree?: boolean;
}

const TradeSignUp: React.FC = () => {
    const [signup, { isLoading }] = useSignupMutation();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>({
        defaultValues: { role: 'TRADESMAN' }
    });

    const onSubmit = async (values: SignupForm) => {
        const payload = {
            email: values.email,
            password: values.password,
            role: values.role ?? 'TRADESMAN'
        };

        try {
            // RTK Query mutation - unwrap to access result or throw on error
            const res = await signup(payload).unwrap();
            console.log('signup success', res);
        } catch (err) {
            console.error('signup failed', err);
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
                        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center">Create your account</h1>
                        <p className="text-gray-500 mt-2 mb-6 text-center">Enter your email and password to create your account</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Email *</label>
                                <div className="relative mt-2">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineMail /></span>
                                    <input
                                        {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                                    />
                                </div>
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Password *</label>
                                <div className="relative mt-2">
                                    <input
                                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineEyeInvisible /></span>
                                </div>
                                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
                                <div className="relative mt-2">
                                    <input
                                        {...register('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords do not match' })}
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><AiOutlineEyeInvisible /></span>
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                            </div>

                            <label className="flex items-start gap-3 text-sm text-gray-600 font-semibold">
                                <input {...register('agree', { required: 'You must accept the terms' })} type="checkbox" className="w-4 h-4 mt-1" />
                                <span>I agree to Theta Analyzer <Link to="#" className="text-primary">Licence Agreement</Link> and <Link to="#" className="text-primary">Privacy policy</Link></span>
                            </label>
                            {errors.agree && <p className="text-sm text-red-500 mt-1">{errors.agree.message}</p>}

                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold mt-2" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register Now'}</button>

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
                                Already have an account? <Link to="/trade-login" className="text-primary">Log In Now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeSignUp