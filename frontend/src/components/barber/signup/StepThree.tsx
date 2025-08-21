import React, { useState } from "react";
import type { BarberSignupData } from "../../../types";
import Swal from "sweetalert2";

interface StepThreeProps {
  data: Partial<BarberSignupData>;
  updateData: (data: Partial<BarberSignupData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  data,
  updateData,
  onPrev,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof BarberSignupData,
    value: string | string[]
  ) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (!data.shopName?.trim()) newErrors.shopName = "Shop name is required";
    if (!data.address?.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        await onSubmit();

      } catch (error) {
        console.error("Signup failed:", error);

        // Error alert
        Swal.fire({
          title: "Error!",
          text: "Failed to create account. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop Details</h2>
        <p className="text-gray-600">Tell us about your barbershop</p>
      </div>

      <div className="space-y-6">
        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shop Name *
          </label>
          <input
            type="text"
            value={data.shopName || ""}
            onChange={(e) => handleInputChange("shopName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.shopName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your shop name"
          />
          {errors.shopName && (
            <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shop Address *
          </label>
          <textarea
            value={data.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter complete address with landmarks"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Google Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps Location (Optional)
          </label>
          <input
            type="text"
            value={data.googleLocation || ""}
            onChange={(e) =>
              handleInputChange("googleLocation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste Google Maps link or coordinates"
          />
          <p className="text-xs text-gray-500 mt-1">
            This helps customers find your shop easily
          </p>
        </div>

        {/* GST Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GST Number (Optional)
          </label>
          <input
            type="text"
            value={data.gstNumber || ""}
            onChange={(e) => handleInputChange("gstNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="22AAAAA0000A1Z5"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>

        <div className="text-sm text-gray-500">Step 3 of 3</div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Complete Signup</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepThree;
