import React, { useState } from "react";
import { MapPin, Navigation } from "lucide-react";

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

interface StepThreeProps {
  data: Partial<UserSignupData>;
  updateData: (data: Partial<UserSignupData>) => void;
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
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationMethod, setLocationMethod] = useState<"current" | "manual">(
    "current"
  );

  const handleInputChange = (field: keyof UserSignupData, value: any) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setErrors({});

    if (!navigator.geolocation) {
      setErrors({ location: "Geolocation is not supported by this browser" });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        updateData({ coordinates });

        // Reverse geocoding to get address (mock implementation)
        const mockAddress = `${coordinates.lat.toFixed(
          4
        )}, ${coordinates.lng.toFixed(4)} - Current Location`;
        updateData({ address: mockAddress });

        setIsGettingLocation(false);
      },
      (error) => {
        setErrors({
          location:
            "Unable to get your location. Please try again or enter manually.",
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (locationMethod === "manual" && !data.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (locationMethod === "current" && !data.coordinates) {
      newErrors.location =
        "Please get your current location or switch to manual entry";
    }

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
        setErrors({ submit: "Signup failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Set Your Location
        </h2>
        <p className="text-gray-600">
          Help us find the best barber shops near you
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-600 mr-2">⚠️</div>
            <div className="text-red-700 text-sm">{errors.submit}</div>
          </div>
        </div>
      )}

      {/* Location Method Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          How would you like to set your location?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setLocationMethod("current")}
            type="button"
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              locationMethod === "current"
                ? "border-teal-500 bg-teal-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="font-medium">Use Current Location</div>
                <div className="text-sm text-gray-500">
                  Automatically detect your location
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setLocationMethod("manual")}
            type="button"
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              locationMethod === "manual"
                ? "border-teal-500 bg-teal-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-medium">Enter Address</div>
                <div className="text-sm text-gray-500">
                  Manually enter your address
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Current Location Section */}
      {locationMethod === "current" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">Current Location</h3>
                {data.coordinates ? (
                  <p className="text-sm text-blue-600 mt-1">
                    ✅ Location detected: {data.address}
                  </p>
                ) : (
                  <p className="text-sm text-blue-600 mt-1">
                    Click the button to get your current location
                  </p>
                )}
              </div>
              <button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGettingLocation ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Getting Location...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={16} />
                    <span>Get Location</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>
      )}

      {/* Manual Address Section */}
      {locationMethod === "manual" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Address *
            </label>
            <textarea
              value={data.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your complete address (Street, Area, City, State, Pincode)"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Map Preview (Mock) */}
          {data.address && (
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-gray-500 mb-2">📍 Map Preview</div>
              <p className="text-sm text-gray-600 mb-4">
                Map will be displayed here based on your address
              </p>
              <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Interactive Map Component</span>
              </div>
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Confirm Location on Map
              </button>
            </div>
          )}
        </div>
      )}

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
          disabled={
            isSubmitting ||
            (!data.coordinates && locationMethod === "current") ||
            (!data.address?.trim() && locationMethod === "manual")
          }
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
