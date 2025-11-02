import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 via-amber-100 to-orange-200">
      {/* Logo / Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl animate-bounce">
          <span className="text-white font-bold text-3xl">{import.meta.env.VITE_APP_NAME.slice(0,1)}</span>
        </div>
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-amber-500 rounded-full animate-bounce animation-delay-150"></span>
        <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce animation-delay-300"></span>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-gray-700 text-lg font-medium">Loading, please wait...</p>

      <style>
        {`
          .animate-bounce {
            @apply animate-bounce;
          }
          .animation-delay-150 {
            animation-delay: 0.15s;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;
