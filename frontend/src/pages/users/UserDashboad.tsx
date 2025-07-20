import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Star, Clock, Users, Filter } from "lucide-react";
import Header from "../../components/common/Header";
import ShopCard from "../../components/common/ShopCard";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { mockBarberShops } from "../../data/mockData";
import type { BarberShop } from "../../types";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

function UserDashboard() {
  const navigate = useNavigate();
  const [shops, setShops] = useState<BarberShop[]>(mockBarberShops);
  const [filteredShops, setFilteredShops] =
    useState<BarberShop[]>(mockBarberShops);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  // Get user's current location
  const getCurrentLocation = () => {
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to retrieve your location",
        }));
      }
    );
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort shops by distance when location is available
  useEffect(() => {
    if (location.latitude && location.longitude) {
      const shopsWithDistance = shops
        .map((shop) => ({
          ...shop,
          distance: calculateDistance(
            location.latitude!,
            location.longitude!,
            shop.coordinates.lat,
            shop.coordinates.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      setShops(shopsWithDistance);
      setFilteredShops(shopsWithDistance);
    }
  }, [location]);

  // Filter shops based on search and filters
  useEffect(() => {
    let filtered = shops;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "open":
          filtered = filtered.filter((shop) => shop.isOpen);
          break;
        case "nearby":
          filtered = filtered.filter(
            (shop) => shop.distance && shop.distance <= 5
          );
          break;
        case "rating":
          filtered = filtered.filter((shop) => shop.rating >= 4.5);
          break;
      }
    }

    setFilteredShops(filtered);
  }, [searchTerm, selectedFilter, shops]);

  const handleShopClick = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };

  const filters = [
    { id: "all", label: "All Shops", icon: null },
    { id: "open", label: "Open Now", icon: Clock },
    { id: "nearby", label: "Nearby", icon: MapPin },
    { id: "rating", label: "Top Rated", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10 rounded-3xl"></div>

          <div className="relative px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Find Your
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Perfect Barber
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover nearby barber shops, check real-time queues, and book
                your spot seamlessly
              </p>
            </div>

            {/* Enhanced Location Section */}
            <div className="max-w-lg mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Your Location</h3>
                      <p className="text-sm text-gray-600">
                        Get personalized recommendations
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={getCurrentLocation}
                    disabled={location.loading}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {location.loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Detecting...</span>
                      </div>
                    ) : (
                      "Detect Location"
                    )}
                  </button>
                </div>

                {location.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {location.error}
                    </p>
                  </div>
                )}

                {location.latitude && location.longitude && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Location detected - showing nearby shops
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search barber shops or areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-2 overflow-x-auto">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedFilter === "nearby"
              ? "Nearby Barber Shops"
              : "Barber Shops"}
            <span className="text-teal-600 ml-2">({filteredShops.length})</span>
          </h2>

          {location.latitude && location.longitude && (
            <div className="text-sm text-gray-600">
              Sorted by distance from your location
            </div>
          )}
        </div>

        {/* Shop Cards Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ErrorBoundary
                key={shop.id}
                fallback={
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                    <p className="text-gray-500">Unable to load shop</p>
                  </div>
                }
              >
                <ShopCard
                  shop={shop}
                  onClick={() => handleShopClick(shop.id)}
                  showDistance={!!location.latitude}
                />
              </ErrorBoundary>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No shops found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
