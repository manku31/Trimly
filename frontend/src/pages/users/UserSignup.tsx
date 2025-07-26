import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserSignupFlow } from "../../hooks/useUserSignupFlow";
import StepIndicator from "../../components/users/StepIndicator";
import StepOne from "../../components/users/StepOne";
import StepTwo from "../../components/users/StepTwo";
import StepThree from "../../components/users/StepThree";

const UserSignup: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    signupData,
    updateSignupData,
    nextStep,
    prevStep,
    verifyOTP,
    submitSignup,
  } = useUserSignupFlow();

  const steps = [
    { title: "Account Details", description: "Personal information" },
    { title: "Verification", description: "Verify your account" },
    { title: "Location", description: "Set your location" },
  ];

  const handleSubmit = async () => {
    try {
      await submitSignup();
      // Navigate to dashboard after successful signup
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle error (show toast, etc.)
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
          />
        );
      case 2:
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Trimly</h1>
          <p className="text-gray-600">
            Create your account and never wait in line again
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
            <Link
              to="/user/login"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Want to register as a barber?{" "}
            <Link
              to="/barber/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Join as barber
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
