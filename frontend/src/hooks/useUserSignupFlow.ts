import { useState } from "react";

interface UserSignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  otp: string;
  verificationType: "email" | "phone";
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}

export const useUserSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<Partial<UserSignupData>>({
    verificationType: "phone",
    agreeToTerms: false,
    coordinates: null,
  });

  const updateSignupData = (data: Partial<UserSignupData>) => {
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
    // Master OTP bypass or actual verification
    return otp === "0000" || otp.length === 4;
  };

  const submitSignup = async () => {
    // TODO: Implement actual signup API call
    console.log("User signup data:", signupData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store auth data
    sessionStorage.setItem("user_token", "mock-user-token");
    sessionStorage.setItem("user_data", JSON.stringify(signupData));
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

export type { UserSignupData };
