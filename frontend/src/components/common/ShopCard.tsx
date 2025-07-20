import React, { useState } from "react";
import { Star, MapPin, Clock, Users, Phone, DollarSign } from "lucide-react";
import type { BarberShop } from "../../types";

interface ShopCardProps {
  shop: BarberShop;
  onClick: () => void;
  showDistance?: boolean;
}

function ShopCard({ shop, onClick, showDistance = false }: ShopCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDistance = (distance?: number) => {
    if (!distance) return "";
    return distance < 1
      ? `${Math.round(distance * 1000)}m away`
      : `${distance.toFixed(1)}km away`;
  };

  const getMinPrice = () => {
    // Add null/undefined checks for shop.services
    if (
      !shop?.services ||
      !Array.isArray(shop.services) ||
      shop.services.length === 0
    ) {
      return 0;
    }
    return Math.min(...shop.services.map((s) => s.price));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback images for barber shops
  const fallbackImages = [
    "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2040627/pexels-photo-2040627.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const getImageSrc = () => {
    if (imageError || !shop?.image) {
      // Use shop ID to consistently assign the same fallback image
      const fallbackIndex =
        parseInt((shop?.id || "0").slice(-1)) % fallbackImages.length;
      return fallbackImages[fallbackIndex];
    }
    return shop.image;
  };

  // Add safety checks for shop data
  if (!shop) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group overflow-hidden">
      {/* Shop Image */}
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        <img
          src={getImageSrc()}
          alt={shop.name || "Barber Shop"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Removed the black hover overlay that was causing the dark effect */}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 transform transition-all duration-300 group-hover:scale-110">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              shop.isOpen
                ? "bg-green-100/90 text-green-800"
                : "bg-red-100/90 text-red-800"
            }`}
          >
            {shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Distance Badge */}
        {showDistance && shop.distance && (
          <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-110">
            <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              {formatDistance(shop.distance)}
            </span>
          </div>
        )}

        {/* Removed the Quick View Button that appeared on hover */}
      </div>

      {/* Shop Details */}
      <div
        className="p-6 transform transition-all duration-300"
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-teal-600 transition-colors duration-300">
              {shop.name || "Unknown Shop"}
            </h3>
            <div className="flex items-center space-x-1 mb-2">
              <Star
                className="text-yellow-400 fill-current transition-transform duration-300 group-hover:scale-110"
                size={16}
              />
              <span className="font-semibold text-gray-900">
                {shop.rating || 0}
              </span>
              <span className="text-gray-500 text-sm">
                ({shop.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-2 mb-4">
          <MapPin
            className="text-gray-400 mt-0.5 flex-shrink-0 transition-colors duration-300 group-hover:text-teal-500"
            size={16}
          />
          <span className="text-gray-600 text-sm line-clamp-2">
            {shop.address || "Address not available"}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg transition-all duration-300 group-hover:bg-teal-50">
            <Users
              className="text-teal-600 transition-transform duration-300 group-hover:scale-110"
              size={16}
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                {shop.queueLength || 0}
              </span>
              <p className="text-xs text-gray-500">in queue</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg transition-all duration-300 group-hover:bg-green-50">
            <DollarSign
              className="text-green-600 transition-transform duration-300 group-hover:scale-110"
              size={16}
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                ₹{getMinPrice()}+
              </span>
              <p className="text-xs text-gray-500">starting</p>
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Popular Services:
          </p>
          <div className="flex flex-wrap gap-1">
            {shop.services && shop.services.length > 0 ? (
              <>
                {shop.services.slice(0, 3).map((service, index) => (
                  <span
                    key={service.id || index}
                    className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:bg-teal-100"
                  >
                    {service.name}
                  </span>
                ))}
                {shop.services.length > 3 && (
                  <span className="text-teal-600 text-xs font-medium">
                    +{shop.services.length - 3} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-500 text-xs">No services listed</span>
            )}
          </div>
        </div>

        {/* Available Barbers */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Barbers:</p>
          <div className="flex -space-x-2">
            {shop.barbers && shop.barbers.length > 0 ? (
              <>
                {shop.barbers.slice(0, 4).map((barber, index) => (
                  <div
                    key={barber.id || index}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden transition-transform duration-300 group-hover:scale-110"
                    title={barber.name}
                    style={{ zIndex: shop.barbers.length - index }}
                  >
                    <img
                      src={barber.avatar}
                      alt={barber.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback for barber avatars too
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100`;
                      }}
                    />
                  </div>
                ))}
                {shop.barbers.length > 4 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-xs text-gray-600">
                      +{shop.barbers.length - 4}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">?</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleButtonClick}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          View Details & Join Queue
        </button>
      </div>
    </div>
  );
}

export default ShopCard;
