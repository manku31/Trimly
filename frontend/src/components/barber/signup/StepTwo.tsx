import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import type { BarberSignupData } from "../../../types";
import { otpResendBarber } from "../../../api";

interface StepTwoProps {
  data: Partial<BarberSignupData>;
  updateData: (data: Partial<BarberSignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  verifyOTP: (otp: string) => boolean;
}

const StepTwo: React.FC<StepTwoProps> = ({
  data,
  updateData,
  onNext,
  onPrev,
  verifyOTP,
}) => {
  // console.log("StepTwo data:", data);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(3);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  // Set email as default verification type
  useEffect(() => {
    if (!data.verificationType) {
      updateData({ verificationType: "email" });
    }
  }, [data.verificationType, updateData]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerificationType = (type: "email" | "phone") => {
    if (type === "phone") {
      Swal.fire({
        icon: "info",
        title: "Feature in Progress",
        text: "Phone verification is currently under development. Please verify using your email address.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    updateData({ verificationType: type });
    setTimer(30);
    setCanResend(false);
  };

  const handleVerifyOTP = () => {
    if (verifyOTP(otp)) {
      updateData({ otp });
      onNext();
    } else {
      setError("Invalid OTP. Please try again or use master OTP: 000");
    }
  };

  const handleResendOTP = async () => {
    try {
      const payload = {
        // emial : data.email
        email: "admin@ertyui.com",
         
      };

      const response = await otpResendBarber(payload);

      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "OTP Resent",
          text: "A new OTP has been sent to your email.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          setTimer(30);
          setCanResend(false);
          setError("");
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to resend OTP. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      }).then(() => {
        onPrev();
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">
          Choose how you'd like to receive the verification code
        </p>
      </div>

      {/* Verification Method Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Verification Method
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleVerificationType("email")}
            className={`p-4 border-2 rounded-lg text-left ${
              data.verificationType === "email"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                📧
              </div>
              <div>
                <div className="font-medium">Email Address</div>
                <div className="text-sm text-gray-500">{data.email}</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleVerificationType("phone")}
            className={`p-4 border-2 rounded-lg text-left ${
              data.verificationType === "phone"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                📱
              </div>
              <div>
                <div className="font-medium">Phone Number</div>
                <div className="text-sm text-gray-500">{data.phone}</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* OTP Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Verification Code
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError("");
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 6-digit code"
            maxLength={6}
          />
          <button
            onClick={handleVerifyOTP}
            disabled={otp.length < 6}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Verify
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Resend Timer */}
      <div className="text-center">
        {!canResend ? (
          <p className="text-gray-500">Resend code in {timer} seconds</p>
        ) : (
          <button
            onClick={handleResendOTP}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Resend verification code
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <div className="text-sm text-gray-500 self-center">Step 2 of 3</div>
      </div>
    </div>
  );
};

export default StepTwo;
