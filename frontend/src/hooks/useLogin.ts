import { useState } from "react";
import type { BarberLoginData, LoginResponse } from "../types";

export const useLogin = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [loginData, setLoginData] = useState<BarberLoginData>({
    email: "",
    password: "",
    rememberMe: false,
    otp: "",
    verificationType: "phone",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<any>(null);

  const updateLoginData = (data: Partial<BarberLoginData>) => {
    setLoginData((prev) => ({ ...prev, ...data }));
    if (error) setError(""); // Clear error when user types
  };

  const validateCredentials = (): boolean => {
    if (!loginData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!loginData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!isValidEmail(loginData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateOTP = (): boolean => {
    if (!loginData.otp?.trim()) {
      setError("OTP is required");
      return false;
    }
    if (loginData.otp.length < 4) {
      setError("Please enter a valid OTP");
      return false;
    }
    return true;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const verifyCredentials = async (): Promise<LoginResponse> => {
    if (!validateCredentials()) {
      return { success: false, message: error };
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock credential verification - replace with actual API
      if (loginData.email === "admin@gmail.com" && loginData.password === "0000") {
        const mockUser = {
          id: "1",
          name: "Admin User",
          email: "admin",
          shopName: "Admin Barbershop",
          phone: "+91 9876543210",
        };

        setUserInfo(mockUser);

        const response: LoginResponse = {
          success: true,
          requiresOTP: true,
          verificationType: loginData.verificationType,
          user: mockUser,
        };

        return response;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (): Promise<LoginResponse> => {
    if (!validateOTP()) {
      return { success: false, message: error };
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock OTP verification - master OTP is 0000
      if (loginData.otp === "0000") {
        const response: LoginResponse = {
          success: true,
          token: "mock-jwt-token",
          user: userInfo,
        };

        // Store token based on remember me preference
        if (loginData.rememberMe) {
          localStorage.setItem("barber_token", response.token!);
          localStorage.setItem("barber_user", JSON.stringify(response.user));
        } else {
          sessionStorage.setItem("barber_token", response.token!);
          sessionStorage.setItem("barber_user", JSON.stringify(response.user));
        }

        return response;
      } else {
        throw new Error(
          "Invalid OTP. Please try again or use master OTP: 0000"
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "OTP verification failed. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // TODO: Implement actual resend OTP logic
      console.log(
        "OTP resent to:",
        loginData.verificationType === "phone"
          ? userInfo?.phone
          : userInfo?.email
      );
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToOTPStep = () => {
    setCurrentStep(2);
    setError("");
  };

  const goBackToCredentials = () => {
    setCurrentStep(1);
    setError("");
    updateLoginData({ otp: "" });
  };

  return {
    currentStep,
    loginData,
    userInfo,
    updateLoginData,
    verifyCredentials,
    verifyOTP,
    resendOTP,
    goToOTPStep,
    goBackToCredentials,
    isLoading,
    error,
    setError,
  };
};
