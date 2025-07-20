import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Users,
  DollarSign,
  Calendar,
  MessageCircle,
  Share2,
  ChevronRight,
  Check,
  Timer,
  User,
  Plus,
  Minus,
} from "lucide-react";
import Header from "../../components/common/Header";
import { mockBarberShops } from "../../data/mockData";
import type { BarberShop, Service, Barber } from "../../types";

const unavailableBarbers = [
  {
    id: "b4",
    name: "Mike Rodriguez",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.6,
    experience: "4 years exp",
    specialties: ["Fade Cuts", "Styling"],
    isAvailable: false,
    reason: "On vacation until next week",
  },
  {
    id: "b5",
    name: "Chris Taylor",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4.4,
    experience: "3 years exp",
    specialties: ["Classic Cuts", "Trimming"],
    isAvailable: false,
    reason: "Sick leave",
  },
];

// Add static reviews data
const staticReviews = [
  {
    id: "r1",
    name: "Rajesh Kumar",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent service! The barber was very skilled and professional. Got exactly the haircut I wanted.",
    service: "Premium Haircut",
  },
  {
    id: "r2",
    name: "Amit Sharma",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    date: "1 week ago",
    comment:
      "Good experience overall. The queue management system works well. Clean and hygienic place.",
    service: "Beard Trimming",
  },
  {
    id: "r3",
    name: "Vikram Singh",
    avatar:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Amazing haircut and shave! The staff is friendly and the ambiance is great. Highly recommended!",
    service: "Hair + Beard Combo",
  },
  {
    id: "r4",
    name: "Rohit Verma",
    avatar:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    date: "3 weeks ago",
    comment:
      "Professional service with reasonable pricing. The online queue system saved me a lot of waiting time.",
    service: "Basic Haircut",
  },
];

function ShopDetails() {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState<BarberShop | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [activeTab, setActiveTab] = useState<
    "services" | "barbers" | "reviews"
  >("services");

  useEffect(() => {
    const foundShop = mockBarberShops.find((s) => s.id === shopId);
    if (foundShop) {
      setShop(foundShop);
    } else {
      navigate("/user/dashboard");
    }
  }, [shopId, navigate]);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop details...</p>
        </div>
      </div>
    );
  }

  const handleServiceToggle = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleJoinQueue = () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    // In a real app, this would make an API call
    console.log("Joining queue with:", {
      shopId: shop.id,
      serviceIds: selectedServices.map((s) => s.id),
      barberId: selectedBarber?.id || null,
    });

    const serviceNames = selectedServices.map((s) => s.name).join(", ");
    alert(`Successfully joined queue at ${shop.name} for ${serviceNames}!`);
  };

  const openMaps = () => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
      shop.address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  const shareShop = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shop.name,
          text: `Check out ${shop.name} - ${shop.address}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const tabs = [
    { id: "services", label: "Services", count: shop.services.length },
    { id: "barbers", label: "Barbers", count: shop.barbers.length },
    { id: "reviews", label: "Reviews", count: shop.reviewCount },
  ];

  const estimatedWaitTime = shop.queueLength * 15; // 15 min per person
  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const totalDuration = selectedServices.reduce(
    (sum, service) => sum + service.duration,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/user/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to shops</span>
        </button>

        {/* Shop Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <div className="grid grid-cols-3 h-full">
              {/* Main Image */}
              <div className="col-span-2 relative">
                <img
                  src={
                    shop.image ||
                    "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt={shop.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800";
                  }}
                />
              </div>

              {/* Side Images */}
              <div className="grid grid-rows-2 gap-1">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Shop interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Barber tools"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {/* More Photos Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all">
                    <span className="text-white font-medium text-sm">
                      +3 more photos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Shop Status */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  shop.isOpen
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {shop.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>

            {/* Shop Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {shop.name}
              </h1>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="font-semibold">{shop.rating}</span>
                  <span className="opacity-90">
                    ({shop.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="text-white opacity-90" size={20} />
                  <span>{shop.queueLength} in queue</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="text-white opacity-90" size={18} />
                <span className="opacity-90">{shop.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={openMaps}
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <MapPin className="text-blue-600 mb-2" size={24} />
                  <span className="text-sm font-medium text-blue-900">
                    Directions
                  </span>
                </button>

                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Phone className="text-green-600 mb-2" size={24} />
                  <span className="text-sm font-medium text-green-900">
                    Call
                  </span>
                </button>

                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <MessageCircle className="text-purple-600 mb-2" size={24} />
                  <span className="text-sm font-medium text-purple-900">
                    Message
                  </span>
                </button>

                <button
                  onClick={shareShop}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="text-gray-600 mb-2" size={24} />
                  <span className="text-sm font-medium text-gray-900">
                    Share
                  </span>
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-teal-500 text-teal-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                      <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Services Tab */}
                {activeTab === "services" && (
                  <div className="space-y-4">
                    {selectedServices.length > 0 && (
                      <div className="bg-teal-50 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-teal-900 mb-2">
                          Selected Services ({selectedServices.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedServices.map((service) => (
                            <span
                              key={service.id}
                              className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                            >
                              <span>{service.name}</span>
                              <button
                                onClick={() => handleServiceToggle(service)}
                                className="ml-1 hover:bg-teal-700 rounded-full p-0.5"
                              >
                                <Minus size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {shop.services.map((service) => {
                      const isSelected = selectedServices.some(
                        (s) => s.id === service.id
                      );
                      return (
                        <div
                          key={service.id}
                          onClick={() => handleServiceToggle(service)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {service.name}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {service.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-green-600 font-bold">
                                  ₹{service.price}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {service.duration} min
                                </span>
                              </div>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-teal-500 bg-teal-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <Check
                                  className="text-white"
                                  size={14}
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Barbers Tab */}
                {activeTab === "barbers" && (
                  <div className="space-y-4">
                    <div
                      onClick={() => setSelectedBarber(null)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        !selectedBarber
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="text-gray-500" size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Any Available Barber
                            </h4>
                            <p className="text-gray-600 text-sm">
                              First available barber will serve you
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            !selectedBarber
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300"
                          }`}
                        >
                          {!selectedBarber && (
                            <Check
                              className="text-white"
                              size={14}
                              strokeWidth={3}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Available Barbers */}
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        Available Now
                      </h5>
                      {shop.barbers.map((barber) => (
                        <div
                          key={barber.id}
                          onClick={() =>
                            setSelectedBarber(
                              selectedBarber?.id === barber.id ? null : barber
                            )
                          }
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedBarber?.id === barber.id
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={barber.avatar}
                                  alt={barber.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {barber.name}
                                </h4>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Star
                                    className="text-yellow-400 fill-current"
                                    size={14}
                                  />
                                  <span className="text-sm text-gray-600">
                                    {barber.rating}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    • {barber.experience}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {barber.specialties
                                    .slice(0, 2)
                                    .map((specialty) => (
                                      <span
                                        key={specialty}
                                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                                      >
                                        {specialty}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Available
                              </span>
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  selectedBarber?.id === barber.id
                                    ? "border-teal-500 bg-teal-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedBarber?.id === barber.id && (
                                  <Check
                                    className="text-white"
                                    size={14}
                                    strokeWidth={3}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Unavailable Barbers */}
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-500 text-sm uppercase tracking-wide">
                        Currently Unavailable
                      </h5>
                      {unavailableBarbers.map((barber) => (
                        <div
                          key={barber.id}
                          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 cursor-not-allowed opacity-75"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <img
                                  src={barber.avatar}
                                  alt={barber.name}
                                  className="w-12 h-12 rounded-full object-cover grayscale"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-600">
                                  {barber.name}
                                </h4>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Star
                                    className="text-yellow-400 fill-current"
                                    size={14}
                                  />
                                  <span className="text-sm text-gray-500">
                                    {barber.rating}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    • {barber.experience}
                                  </span>
                                </div>
                                <p className="text-xs text-red-600 mt-1 font-medium">
                                  {barber.reason}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Unavailable
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {/* Reviews Summary */}
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {shop.rating}{" "}
                            <span className="text-lg font-normal text-gray-600">
                              out of 5
                            </span>
                          </h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`${
                                  star <= Math.floor(shop.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                size={20}
                              />
                            ))}
                            <span className="text-gray-600 ml-2">
                              ({shop.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Based on customer feedback
                          </p>
                          <p className="text-xs text-gray-500">
                            Last updated today
                          </p>
                        </div>
                      </div>

                      {/* Rating Breakdown */}
                      <div className="grid grid-cols-5 gap-2 text-center">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div
                            key={rating}
                            className="flex flex-col items-center"
                          >
                            <span className="text-xs text-gray-600">
                              {rating}★
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${
                                    rating === 5 ? 70 : rating === 4 ? 25 : 5
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              {rating === 5
                                ? "70%"
                                : rating === 4
                                ? "25%"
                                : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {staticReviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h5 className="font-semibold text-gray-900">
                                    {review.name}
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    {review.date}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`${
                                        star <= review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                      size={16}
                                    />
                                  ))}
                                </div>
                              </div>

                              <p className="text-gray-700 mb-3">
                                {review.comment}
                              </p>

                              <div className="flex items-center space-x-2">
                                <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                                  {review.service}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  Verified booking
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Write Review Button */}
                    <div className="text-center pt-6">
                      <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                        Write a Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Queue Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Queue Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-900">
                      Current Queue
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {shop.queueLength}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Timer className="text-orange-600" size={20} />
                    <span className="font-medium text-orange-900">
                      Est. Wait Time
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">
                    {estimatedWaitTime} min
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Services Summary */}
            {(selectedServices.length > 0 || selectedBarber) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-3">
                  {/* Selected Barber */}
                  {selectedBarber && (
                    <div className="bg-teal-50 p-3 rounded-lg mb-4">
                      <h4 className="font-semibold text-teal-800 text-sm mb-2">
                        Preferred Barber
                      </h4>
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedBarber.avatar}
                          alt={selectedBarber.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-teal-900">
                            {selectedBarber.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            <Star
                              className="text-yellow-400 fill-current"
                              size={12}
                            />
                            <span className="text-xs text-teal-700">
                              {selectedBarber.rating} •{" "}
                              {selectedBarber.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Selected Services */}
                  {selectedServices.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Selected Services ({selectedServices.length})
                      </h4>
                      {selectedServices.map((service) => (
                        <div key={service.id} className="flex justify-between">
                          <span className="text-gray-600">{service.name}</span>
                          <span className="font-medium text-gray-900">
                            ₹{service.price}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Total Summary */}
                  {selectedServices.length > 0 && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Price:</span>
                        <span className="font-bold text-green-600">
                          ₹{totalPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Duration:</span>
                        <span className="font-medium text-gray-900">
                          {totalDuration} min
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Join Queue Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleJoinQueue}
                disabled={selectedServices.length === 0}
                className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {selectedServices.length > 0
                  ? "Join Queue Now"
                  : "Select a Service First"}
              </button>

              {selectedServices.length > 0 && (
                <p className="text-center text-gray-600 text-sm mt-3">
                  You'll be notified when it's your turn
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;
