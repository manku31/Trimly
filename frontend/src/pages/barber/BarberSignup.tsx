import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignupFlow } from "../../hooks/useSignupFlow";
import StepIndicator from "../../components/barber/signup/StepIndicator";
import StepOne from "../../components/barber/signup/StepOne";
import StepTwo from "../../components/barber/signup/StepTwo";
import StepThree from "../../components/barber/signup/StepThree";

const BarberSignup: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    signupData,
    updateSignupData,
    nextStep,
    prevStep,
    verifyOTP,
    submitSignup,
  } = useSignupFlow();

  const steps = [
    { title: "Basic Info", description: "Personal details" },
    { title: "Verification", description: "Verify account" },
    { title: "Shop Details", description: "Business info" },
  ];

  const handleSubmit = async () => {
    try {
      await submitSignup();
      // Navigate to dashboard after successful signup
      navigate("/barber/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show toast, etc.)
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <StepOne
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <StepTwo
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
            onPrev={prevStep}
            verifyOTP={verifyOTP}
          />
        );
      case 3:
        return (
          <StepThree
            data={signupData}
            updateData={updateSignupData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Trimly as a Barber
          </h1>
          <p className="text-gray-600">
            Start managing your barbershop with our powerful tools
          </p>
        </div>

        {/* Progress Indicator */}
        <StepIndicator currentStep={currentStep} steps={steps} />

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/barber/login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarberSignup;
