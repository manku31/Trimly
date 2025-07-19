import { useState } from "react";
import type { BarberSignupData } from "../types";

export const useSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<BarberSignupData>>({
    verificationType: "phone",
    services: [],
    workingHours: { start: "09:00", end: "18:00" },
  });

  const updateSignupData = (data: Partial<BarberSignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const verifyOTP = (otp: string): boolean => {
    // Master OTP bypass
    return otp === "000" || otp.length === 6;
  };

  const submitSignup = async () => {
    // TODO: Implement actual signup API call
    console.log("Signup data:", signupData);
    // Navigate to dashboard
  };

  return {
    currentStep,
    signupData,
    updateSignupData,
    nextStep,
    prevStep,
    verifyOTP,
    submitSignup,
  };
};

// Export the type for use in other components
export type { BarberSignupData };
