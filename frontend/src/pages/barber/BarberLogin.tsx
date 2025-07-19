import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const BarberLogin: React.FC = () => {
  const navigate = useNavigate();
  const {
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
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOTP, setCanResendOTP] = useState(false);

  // OTP Timer effect
  useEffect(() => {
    if (currentStep === 2 && otpTimer > 0) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (otpTimer === 0) {
      setCanResendOTP(true);
    }
  }, [currentStep, otpTimer]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyCredentials();

    if (result.success && result.requiresOTP) {
      goToOTPStep();
      setOtpTimer(30);
      setCanResendOTP(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyOTP();

    if (result.success) {
      navigate("/");
    }
  };

  const handleResendOTP = async () => {
    await resendOTP();
    setOtpTimer(30);
    setCanResendOTP(false);
  };

  const handleVerificationTypeChange = (type: "email" | "phone") => {
    updateLoginData({ verificationType: type });
  };

  const renderCredentialsStep = () => (
    <form onSubmit={handleCredentialsSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-600 mr-2">⚠️</div>
            <div className="text-red-700 text-sm">{error}</div>
          </div>
        </div>
      )}

      {/* Demo Credentials */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-blue-600 mr-2">💡</div>
          <div>
            <div className="font-medium text-blue-800">Demo Credentials</div>
            <div className="text-sm text-blue-700 mt-1">
              Email: <code className="bg-blue-100 px-1 rounded">admin</code>
              <br />
              Password: <code className="bg-blue-100 px-1 rounded">0000</code>
            </div>
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="text"
          value={loginData.email}
          onChange={(e) => updateLoginData({ email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={loginData.password}
            onChange={(e) => updateLoginData({ password: e.target.value })}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={loginData.rememberMe}
          onChange={(e) => updateLoginData({ rememberMe: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-700"
        >
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </>
        ) : (
          <span>Continue</span>
        )}
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={goBackToCredentials}
        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        ← Back to login
      </button>

      {/* User Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          Signed in as:{" "}
          <span className="font-medium text-gray-900">{userInfo?.name}</span>
        </div>
      </div>

      {/* Verification Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose verification method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleVerificationTypeChange("phone")}
            className={`p-3 border-2 rounded-lg text-left transition-colors ${
              loginData.verificationType === "phone"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <div>
                <div className="font-medium text-sm">Phone</div>
                <div className="text-xs text-gray-500">{userInfo?.phone}</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleVerificationTypeChange("email")}
            className={`p-3 border-2 rounded-lg text-left transition-colors ${
              loginData.verificationType === "email"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <div>
                <div className="font-medium text-sm">Email</div>
                <div className="text-xs text-gray-500">{userInfo?.email}</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleOTPSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-600 mr-2">⚠️</div>
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          </div>
        )}

        {/* Master OTP Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-yellow-600 mr-2">⚡</div>
            <div>
              <div className="font-medium text-yellow-800">Testing Mode</div>
              <div className="text-sm text-yellow-700">
                Use master OTP:{" "}
                <code className="bg-yellow-100 px-1 rounded">0000</code> to
                login
              </div>
            </div>
          </div>
        </div>

        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            value={loginData.otp || ""}
            onChange={(e) => updateLoginData({ otp: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            required
          />
        </div>

        {/* Resend OTP */}
        <div className="text-center">
          {!canResendOTP ? (
            <p className="text-gray-500 text-sm">
              Resend OTP in {otpTimer} seconds
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying OTP...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentStep === 1 ? "Welcome Back" : "Verify Your Identity"}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1
              ? "Sign in to your Trimly barber account"
              : "Enter the OTP sent to your registered contact"}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 ? renderCredentialsStep() : renderOTPStep()}
        </div>

        {/* Footer */}
        {currentStep === 1 && (
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/barber/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up as a barber
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarberLogin;
