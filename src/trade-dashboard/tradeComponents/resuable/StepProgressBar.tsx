import React from "react";

type StepProgressBarProps = {
  title: string;
  step: number;
  totalSteps: number;
  progress: number;
};

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  title,
  step,
  totalSteps,
  progress,
}) => {
  return (
    <div className="sticky top-0 z-50 bg-white w-full shadow-sm">
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex justify-between items-center flex-wrap">
          {/* Left side - Title */}
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <span className="text-2xl font-bold text-black">✕</span>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Right side - Step info */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{`Step ${step} of ${totalSteps}`}</p>
            <p className="text-sm text-gray-500">{`${progress}% Complete`}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepProgressBar;

