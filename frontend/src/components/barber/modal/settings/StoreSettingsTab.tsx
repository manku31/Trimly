import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Image, Save } from "lucide-react";
import type { BarberShop } from "../../../../types";

interface StoreSettingsTabProps {
  shop: BarberShop;
  onUpdateShop: (updatedShop: BarberShop) => void;
}

function StoreSettingsTab({ shop, onUpdateShop }: StoreSettingsTabProps) {
  const [formData, setFormData] = useState({
    name: shop.name,
    address: shop.address,
    phone: "+1 (555) 123-4567", // This would come from shop data
    email: "contact@elitecuts.com", // This would come from shop data
    description:
      "Elite barbershop providing premium grooming services since 2020.",
    image: shop.image,
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "19:00", closed: false },
      saturday: { open: "08:00", close: "17:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: false },
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    const updatedShop: BarberShop = {
      ...shop,
      name: formData.name,
      address: formData.address,
      image: formData.image,
    };
    onUpdateShop(updatedShop);
  };

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Details</h2>
        <p className="text-gray-600">Update your barbershop information</p>
      </div>

      {/* Basic Information */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" size={16} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter shop name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="text-gray-400" size={16} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="text-gray-400" size={16} />
              </div>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter image URL"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
            placeholder="Enter full address"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
            placeholder="Describe your barbershop"
          />
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Clock size={20} />
          <span>Operating Hours</span>
        </h3>

        <div className="space-y-4">
          {days.map((day) => {
            const hours =
              formData.operatingHours[
                day.key as keyof typeof formData.operatingHours
              ];
            return (
              <div
                key={day.key}
                className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20">
                    <span className="font-medium text-gray-900">
                      {day.label}
                    </span>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!hours.closed}
                      onChange={(e) =>
                        handleHoursChange(day.key, "closed", !e.target.checked)
                      }
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Open</span>
                  </label>
                </div>

                {!hours.closed && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleHoursChange(day.key, "open", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleHoursChange(day.key, "close", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                    />
                  </div>
                )}

                {hours.closed && (
                  <span className="text-red-600 font-medium">Closed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}

export default StoreSettingsTab;
