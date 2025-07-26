import React, { useState, useEffect } from "react";

interface UserSignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  otp: string;
  verificationType: "email" | "phone";
}

interface StepTwoProps {
  data: Partial<UserSignupData>;
  updateData: (data: Partial<UserSignupData>) => void;
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
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

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
    updateData({ verificationType: type });
    setTimer(30);
    setCanResend(false);
  };

  const handleVerifyOTP = () => {
    if (verifyOTP(otp)) {
      updateData({ otp });
      onNext();
    } else {
      setError("Invalid OTP. Please try again or use master OTP: 0000");
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setError("");
    // TODO: Implement actual resend OTP logic
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
            onClick={() => handleVerificationType("phone")}
            type="button"
            className={`p-4 border-2 rounded-lg text-left ${
              data.verificationType === "phone"
                ? "border-teal-500 bg-teal-50"
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

          <button
            onClick={() => handleVerificationType("email")}
            type="button"
            className={`p-4 border-2 rounded-lg text-left ${
              data.verificationType === "email"
                ? "border-teal-500 bg-teal-50"
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter 4-digit code (or 0000 for testing)"
            maxLength={4}
          />
          <button
            onClick={handleVerifyOTP}
            disabled={otp.length < 3}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Resend verification code
          </button>
        )}
      </div>

      {/* Master OTP Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-yellow-600 mr-2">⚡</div>
          <div>
            <div className="font-medium text-yellow-800">Testing Mode</div>
            <div className="text-sm text-yellow-700">
              Use master OTP:{" "}
              <code className="bg-yellow-100 px-1 rounded">0000</code> to bypass
              verification
            </div>
          </div>
        </div>
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
