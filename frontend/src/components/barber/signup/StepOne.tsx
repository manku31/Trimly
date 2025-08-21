import React, { useState, useCallback } from "react";
import type { BarberSignupData, SignupResponse } from "../../../types";
import { signupbarber } from "../../../api";
import Swal from "sweetalert2";

interface StepOneProps {
  data: Partial<BarberSignupData>;
  updateData: (data: Partial<BarberSignupData>) => void;
  onNext: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const StepOne: React.FC<StepOneProps> = ({ data, updateData, onNext }) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof BarberSignupData, value: string) => {
      updateData({ [field]: value });

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [updateData, errors]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const validations = [
      { field: "name", value: data.name?.trim(), message: "Name is required" },
      {
        field: "email",
        value: data.email?.trim(),
        message: "Email is required",
      },
      {
        field: "phone",
        value: data.phone?.trim(),
        message: "Phone number is required",
      },
      {
        field: "password",
        value: data.password?.trim(),
        message: "Password is required",
      },
    ];

    validations.forEach(({ field, value, message }) => {
      if (!value) {
        newErrors[field as keyof FormErrors] = message;
      }
    });

    // Email format validation
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password confirmation validation
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Password strength validation
    if (data.password && data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: data.name!,
        email: data.email!,
        phone: data.phone!,
        password: data.password!,
        confirm_Password: data.confirmPassword!,
      };

      const response = await signupbarber(payload);
      // console.log("Signup response:", response);

      if (response.status === "success") {
        updateData(response.barber);
        await Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: response.message,
          confirmButtonColor: "#3B82F6",
        });
        onNext();
      } else {
        throw new Error(response.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);

      await Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error
          ? error.message
          : "An unexpected error occurred. Please try again.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      field: "name" as keyof BarberSignupData,
      placeholder: "Enter your full name",
      className: "col-span-1",
    },
    {
      label: "Phone Number",
      type: "tel",
      field: "phone" as keyof BarberSignupData,
      placeholder: "+91 9876543210",
      className: "col-span-1",
    },
    {
      label: "Email Address",
      type: "email",
      field: "email" as keyof BarberSignupData,
      placeholder: "your@email.com",
      className: "col-span-full",
    },
    {
      label: "Password",
      type: "password",
      field: "password" as keyof BarberSignupData,
      placeholder: "Create a strong password",
      className: "col-span-1",
    },
    {
      label: "Confirm Password",
      type: "password",
      field: "confirmPassword" as keyof BarberSignupData,
      placeholder: "Confirm your password",
      className: "col-span-1",
    },
  ];

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </header>

      {/* Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {inputFields.map(({ label, type, field, placeholder, className }) => (
          <div key={field} className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              type={type}
              value={data[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors[field]
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder={placeholder}
              disabled={isLoading}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
            />
            {errors[field] && (
              <p
                id={`${field}-error`}
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </form>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-all duration-200 ${
            isLoading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          }`}
          type="button"
        >
          {isLoading && <LoadingSpinner />}
          {isLoading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default StepOne;
