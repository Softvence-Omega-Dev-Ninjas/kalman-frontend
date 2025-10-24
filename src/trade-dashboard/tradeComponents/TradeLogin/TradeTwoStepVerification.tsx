import React from 'react'
import { Mail, ChevronRight } from 'lucide-react'
import { useSendOtpByEmailMutation } from '@/redux/features/auth/register';



interface LogInComponentProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    email: string | null;
}

const TradeTwoStepVerification: React.FC<LogInComponentProps> = ({step, setStep, email}) => {
    const [sendOtpByEmail, { isLoading }] = useSendOtpByEmailMutation();

    const handleSendOtp = async() => {
        if (!email) {
            console.error("No email provided to send OTP");
            return;
        }

        if (isLoading) return; // prevent duplicate sends

        try{
            await sendOtpByEmail({email}).unwrap();
            setStep(step + 1);
        }catch (error) {
            console.error("Failed to send OTP:", error);
        }
    };

    const maskEmail = (raw?: string | null) => {
        if (!raw) return "";
        const parts = raw.split("@");
        if (parts.length !== 2) return raw;
        const [local, domain] = parts;
        const maskLen = Math.min(5, local.length);
        const masked = "***" + local.slice(maskLen);
        return `${masked}@${domain}`;
    };

    const maskedEmail = maskEmail(email);

    const options = [
    {
        id: 'email',
        title: 'Get verification code at',
        description: 'Write additional text here.',
        icon: <Mail className="w-5 h-5 text-gray-600" />
    }
]
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left column - title */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-black">2-Step Verification</h1>
                        <p className="text-lg text-gray-500 mt-4 max-w-xl">To help keep your account safe, Theta Analyzer wants to make sure it's really you trying to log in</p>
                    </div>

                    {/* Right column - options */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-6">Choose your log in process:</h4>

                        <div className="space-y-4">
                            {options.map((opt) => (
                                <label
                                    key={opt.id}
                                    onClick={() => handleSendOtp()}
                                    className={`group block border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center mt-1">{opt.icon}</div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{opt.title} {maskedEmail}</div>
                                                <div className="text-sm text-gray-400 mt-1">{opt.description}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <input
                                                type="radio"
                                                name="two-step"
                                                className="w-4 h-4 text-primary"
                                                aria-label={opt.title}
                                                onChange={() => handleSendOtp()}
                                                disabled={isLoading}
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
    )
}

export default TradeTwoStepVerification