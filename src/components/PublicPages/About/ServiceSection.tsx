import React from "react";
import { CheckCircle } from "lucide-react";
import tradeImg from '../../../assets/about-trade.png'
import { Link } from "react-router-dom";

const ServiceSection: React.FC = () => {
    return (
        <section className="bg-gray-100 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-10">
                {/* Left - Image */}
                <div className="flex-1">
                    <img
                        src={tradeImg}
                        alt="Tradesperson"
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>

                {/* Right - Content */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                        Reliable Tradespeople <br /> Quality Services
                    </h2>
                    <p className="mt-4 text-gray-600 text-base md:text-lg">
                        We connect customers with skilled tradespeople across a range of
                        services. From small repairs to large projects, our team ensures
                        every job is done efficiently, safely, and reliably.
                    </p>

                    {/* Solutions List */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Your Solutions
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Home Repairs & Maintenance",
                                "Renovations & Remodeling",
                                "Cleaning & Handyman Services",
                                "Business & Commercial Services",
                                "Outdoor & Landscaping",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="text-orange-500 w-5 h-5" />
                                    <span className="text-gray-800">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Button */}
                    <Link to='/post-a-job'>
                    <button className="mt-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors">
                        Post a Job
                    </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
