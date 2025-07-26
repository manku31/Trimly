import React from "react";

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-teal-500 text-white ring-4 ring-teal-100"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-teal-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                    stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
