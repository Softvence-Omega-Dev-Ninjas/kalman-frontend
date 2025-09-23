import React from 'react'
import { MessageSquare, Mail, ChevronRight } from 'lucide-react'

const options = [
    {
        id: 'sms',
        title: 'Get verification code at ****-****47',
        description: 'Write additional text here.',
        icon: <MessageSquare className="w-5 h-5 text-gray-600" />
    },
    {
        id: 'email',
        title: 'Get verification code at ****-***l@y@gmail.com',
        description: 'Write additional text here.',
        icon: <Mail className="w-5 h-5 text-gray-600" />
    }
]

const TwoStepVerification: React.FC = () => {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left column - title */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827]">2-Step Verification</h1>
                        <p className="text-sm text-gray-500 mt-4 max-w-xl">To help keep your account safe, Theta Analyzer wants to make sure it's really you trying to log in</p>
                    </div>

                    {/* Right column - options */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-6">Choose your log in process:</h4>

                        <div className="space-y-4">
                            {options.map((opt) => (
                                <label key={opt.id} className="group block border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center mt-1">{opt.icon}</div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{opt.title}</div>
                                                <div className="text-sm text-gray-400 mt-1">{opt.description}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <input type="radio" name="two-step" className="w-4 h-4 text-[#FF7346]" aria-label={opt.title} />
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

export default TwoStepVerification