import React, { useState } from "react";
import { Link } from "react-router-dom";

interface UserSignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface StepOneProps {
  data: Partial<UserSignupData>;
  updateData: (data: Partial<UserSignupData>) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, updateData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (
    field: keyof UserSignupData,
    value: string | boolean
  ) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (!data.name?.trim()) newErrors.name = "Full name is required";
    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!data.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(data.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!data.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!data.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!data.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">
          Enter your personal details to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+91 9876543210"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={data.password || ""}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword || ""}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div>
        <div className="flex items-start">
          <input
            id="agree-terms"
            type="checkbox"
            checked={data.agreeToTerms || false}
            onChange={(e) =>
              handleInputChange("agreeToTerms", e.target.checked)
            }
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-1"
          />
          <label
            htmlFor="agree-terms"
            className="ml-2 block text-sm text-gray-700"
          >
            I agree to the{" "}
            <a href="/terms" className="text-teal-600 hover:text-teal-700">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-teal-600 hover:text-teal-700">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepOne;
