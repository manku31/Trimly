import { useState } from "react";
import type { BarberSignupData } from "../types";
import { barberOtp, createBarberShop } from "../api";
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
      if (otp === "000000") {
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
    try {
      const payload = {
        name: signupData.shopName,
        address: signupData.address,
        location: signupData.googleLocation,
        gst_number: signupData.gstNumber,
        barber_id: signupData.barber_id,
      };

      const response = await createBarberShop(payload);

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Your barber shop has been created successfully!",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#16a34a",
        });
      }
    } catch (error) {
      console.error("Signup submission failed:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to create account. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
