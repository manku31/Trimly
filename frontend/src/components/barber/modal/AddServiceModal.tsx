import { useState } from "react";
import { X, Plus, DollarSign, Clock, Tag, FileText } from "lucide-react";
import type { Service } from "../../../types";

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (service: Service) => void;
}

function AddServiceModal({ open, onClose, onAdd }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService: Service = {
      id: Math.random().toString(36).slice(2),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      duration: formData.duration,
      category: formData.category,
    };

    onAdd(newService);
    onClose();

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      duration: 0,
      category: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const categories = [
    "Hair Cut",
    "Hair Styling",
    "Beard Trim",
    "Shave",
    "Hair Wash",
    "Color",
    "Treatment",
    "Other",
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        open
          ? "opacity-100 visible backdrop-blur-md bg-gray-900/20"
          : "opacity-0 invisible backdrop-blur-none bg-transparent"
      }`}
      onClick={handleBackdropClick}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] border border-white/30 transition-all duration-500 ease-out transform flex flex-col ${
          open
            ? "opacity-100 scale-100 translate-y-0 rotate-0"
            : "opacity-0 scale-90 translate-y-8 rotate-1"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Plus className="text-teal-600" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Service
              </h3>
              <p className="text-sm text-gray-600">
                Create a new service offering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100/50 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter service name"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter service description"
                />
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="text-gray-400" size={16} />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (min) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="text-gray-400" size={16} />
                    </div>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration || ""}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="text-gray-400" size={16} />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 appearance-none bg-white/80 backdrop-blur-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add some extra space at the bottom for better scrolling */}
              <div className="h-4"></div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="border-t border-gray-200/50 bg-gray-50/50 backdrop-blur-sm p-6 rounded-b-2xl flex-shrink-0">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-lg hover:bg-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Service</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;
