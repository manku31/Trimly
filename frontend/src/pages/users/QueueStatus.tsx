import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import Header from "../../components/common/Header";

interface QueueData {
  queueId: string;
  shopId: string;
  shopName: string;
  shopAddress: string;
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
  barber?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    experience: string;
  } | null;
  totalPrice: number;
  totalDuration: number;
  queuePosition: number;
  estimatedWaitTime: number;
  joinedAt: string;
  status: "waiting" | "next" | "in-progress" | "completed" | "cancelled";
}

function QueueStatus() {
  const { queueId } = useParams<{ queueId: string }>();
  const navigate = useNavigate();
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  useEffect(() => {
    // Load queue data from localStorage (in real app, this would be an API call)
    const storedData = localStorage.getItem("currentQueue");
    if (storedData) {
      const data = JSON.parse(storedData);
      setQueueData(data);
      setCurrentPosition(data.queuePosition);
      setEstimatedTime(data.estimatedWaitTime);
    } else {
      navigate("/user/dashboard");
    }
  }, [queueId, navigate]);

  // Simulate queue updates
  useEffect(() => {
    if (!queueData) return;

    const interval = setInterval(() => {
      setCurrentPosition((prev) => {
        const newPosition = Math.max(1, prev - Math.floor(Math.random() * 2));
        setEstimatedTime(Math.max(0, newPosition * 15 - 15));

        // Update status based on position
        if (newPosition === 1) {
          setQueueData((prev) => (prev ? { ...prev, status: "next" } : null));
        }

        return newPosition;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [queueData]);

  const handleLeaveQueue = () => {
    if (window.confirm("Are you sure you want to leave the queue?")) {
      localStorage.removeItem("currentQueue");
      navigate("/user/dashboard");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-blue-100 text-blue-800";
      case "next":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return <Clock className="w-5 h-5" />;
      case "next":
        return <AlertCircle className="w-5 h-5" />;
      case "in-progress":
        return <Timer className="w-5 h-5" />;
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (!queueData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queue status...</p>
        </div>
      </div>
    );
  }

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
          <span>Back to dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Queue Status Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Queue Status
                </h1>
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    queueData.status
                  )}`}
                >
                  {getStatusIcon(queueData.status)}
                  <span className="capitalize">
                    {queueData.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-1">
                      {currentPosition}
                    </div>
                    <div className="text-sm text-gray-600">
                      Position in Queue
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {estimatedTime}
                    </div>
                    <div className="text-sm text-gray-600">Minutes Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ₹{queueData.totalPrice}
                    </div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                </div>
              </div>

              {queueData.status === "next" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">
                      You're next! Please be ready.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Shop Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Barbershop Details
              </h3>

              <div className="flex items-start space-x-4">
                <img
                  src="https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt={queueData.shopName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {queueData.shopName}
                  </h4>
                  <div className="flex items-center space-x-1 text-gray-600 mt-1">
                    <MapPin size={16} />
                    <span className="text-sm">{queueData.shopAddress}</span>
                  </div>

                  <div className="flex space-x-4 mt-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <Phone size={16} />
                      <span>Call Shop</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <MessageCircle size={16} />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Services
              </h3>

              <div className="space-y-3">
                {queueData.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {service.duration} minutes
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{service.price}
                    </span>
                  </div>
                ))}

                {queueData.barber && (
                  <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-900 mb-2">
                      Preferred Barber
                    </h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={queueData.barber.avatar}
                        alt={queueData.barber.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-teal-900">
                          {queueData.barber.name}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Star
                            className="text-yellow-400 fill-current"
                            size={14}
                          />
                          <span className="text-sm text-teal-700">
                            {queueData.barber.rating} •{" "}
                            {queueData.barber.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <MessageCircle size={18} />
                  <span>Chat Support</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Phone size={18} />
                  <span>Call Shop</span>
                </button>

                <button
                  onClick={handleLeaveQueue}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle size={18} />
                  <span>Leave Queue</span>
                </button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Queue ID:</span>
                  <span className="font-medium text-gray-900">
                    #{queueData.queueId.slice(-6)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Joined At:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(queueData.joinedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-medium text-gray-900">
                    {queueData.totalDuration} min
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₹{queueData.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Notifications
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    You'll receive a notification when it's your turn.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    SMS updates are enabled for this booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueStatus;
