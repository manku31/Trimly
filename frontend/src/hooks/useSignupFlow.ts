import { useState } from "react";
import type { BarberSignupData } from "../types";
import { barberOtp } from "../api";
import Swal from "sweetalert2";

export const useSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<BarberSignupData>>({
    verificationType: "email",
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

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      
      if (otp === "0000") {
        Swal.fire({
          title: "Master OTP",
          text: "Using master OTP for testing purposes.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return true;
      }

      const payload = {
        email: signupData.email,
        otp,
      };

      const response = await barberOtp(payload);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "OTP verified successfully",
          icon: "success",
          confirmButtonText: "Continue",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("OTP verification request failed:", error);
      return false;
    }
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
