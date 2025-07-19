import { useState } from "react";
import {
  Clock,
  Users,
  User,
  DollarSign,
  QrCode,
  Settings,
  UserX,
  Bell,
  Power,
  CheckCircle,
} from "lucide-react";

import {
  mockBarberShops,
  mockQueueEntries,
  mockServices,
  mockBarbers,
} from "../../data/mockData";
import type { QueueEntry, Service } from "../../types";

import Header from "../../components/common/Header";

function BarberDashboard() {
  const [queueEntries, setQueueEntries] =
    useState<QueueEntry[]>(mockQueueEntries);

  const [services, setServices] = useState<Service[]>(mockServices);

  const [activeTab, setActiveTab] = useState<
    "queue" | "services" | "current" | "analytics"
  >("queue");

  const [showQRCode, setShowQRCode] = useState(false);
  const [shopStatus, setShopStatus] = useState(true);

  // Add these new state variables
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [queueFilters, setQueueFilters] = useState({
    showCompleted: false,
    sortBy: "position" as "position" | "joinTime" | "waitTime",
  });

  const shop = mockBarberShops[0];

  // Enhanced queue actions with loading states
  const completeService = async (entryId: string) => {
    setIsProcessing(entryId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setQueueEntries((prev) =>
      prev
        .map((entry) =>
          entry.id === entryId
            ? { ...entry, status: "completed" as const }
            : entry
        )
        .map((entry, index) => ({
          ...entry,
          position: entry.status === "waiting" ? index + 1 : entry.position,
        }))
    );
    setIsProcessing(null);
  };

  const startService = (entryId: string) => {
    setQueueEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, status: "in-progress" as const }
          : entry
      )
    );
  };

  const removeFromQueue = (entryId: string) => {
    setQueueEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, status: "cancelled" as const }
          : entry
      )
    );
  };

  const generateQRCode = () => {
    return `https://trimly.app/join/${shop.id}`;
  };

  const activeQueue = queueEntries.filter(
    (entry) => entry.status === "waiting"
  );

  const currentServices = queueEntries.filter(
    (entry) => entry.status === "in-progress"
  );

  const totalEarnings = queueEntries
    .filter((entry) => entry.status === "completed")
    .reduce((sum, entry) => {
      const service = services.find((s) => s.id === entry.serviceId);
      return sum + (service?.price || 0);
    }, 0);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-slate-100 to-zinc-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Shop Status */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Barber Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your queue and services at Elite Cuts Barbershop
              </p>
            </div>

            {/* Shop Status Controls */}
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Power
                    className={`${
                      shopStatus ? "text-green-600" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Shop Status
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-semibold ${
                      shopStatus ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {shopStatus ? "Open" : "Closed"}
                  </span>

                  <button
                    onClick={() => setShopStatus(!shopStatus)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      shopStatus ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        shopStatus ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Bell size={16} />
                  <span>Notifications</span>
                </button>

                <button className="gradient-bg text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Updated status cards - removed Current Customer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Queue Length */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 animate-fadeInScale hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setActiveTab("queue")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Queue Length</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeQueue.length}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +{queueEntries.filter((e) => e.status === "completed").length}{" "}
                  completed today
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center animate-pulse-slow">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          {/* Active Services */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 animate-fadeInScale hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setActiveTab("current")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentServices.length}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  {currentServices.length > 0
                    ? "Services in progress"
                    : "No active services"}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          {/* Avg Wait Time */}
          <div className="bg-white rounded-xl shadow-sm p-6 animate-fadeInScale hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeQueue.length > 0
                    ? Math.round(
                        activeQueue.reduce(
                          (sum, entry) => sum + entry.estimatedWaitTime,
                          0
                        ) / activeQueue.length
                      )
                    : 0}{" "}
                  min
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center animate-pulse-slow">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          {/* Today's Earnings */}
          <div
            className="bg-white rounded-xl shadow-sm p-6 animate-fadeInScale hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => setActiveTab("analytics")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalEarnings}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center animate-pulse-slow">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 animate-fadeInUp hover:shadow-xl transition-all duration-300">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "queue", label: "Current Queue", icon: Users },
                { id: "current", label: "Active Services", icon: CheckCircle },
                { id: "services", label: "Services", icon: Settings },
                { id: "analytics", label: "Analytics", icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-all duration-300 hover:scale-105 ${
                      activeTab === tab.id
                        ? "border-teal-500 text-teal-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "current" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Active Services
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{currentServices.length} services in progress</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentServices.length === 0 ? (
                    <div className="text-center py-12 animate-fadeInUp">
                      <CheckCircle
                        className="text-gray-400 mx-auto mb-4"
                        size={48}
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No active services
                      </h3>
                      <p className="text-gray-600">
                        Start services from the queue to see them here
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentServices.map((entry, index) => {
                        const barber = mockBarbers.find(
                          (b) => b.id === entry.barberId
                        );
                        const service = services.find(
                          (s) => s.id === entry.serviceId
                        );

                        return (
                          <div
                            key={entry.id}
                            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200 animate-fadeInScale shadow-md hover:shadow-lg transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                  {entry.customerName.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {entry.customerName}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {service?.name}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-200 text-orange-800 font-medium">
                                  In Progress
                                </span>
                              </div>
                            </div>

                            {/* Barber Assignment */}
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <User size={16} className="text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                  Assigned to: {barber?.name || "Unassigned"}
                                </span>
                              </div>
                              {barber && (
                                <div className="text-xs text-gray-600">
                                  Experience: {barber.experience} • Rating:{" "}
                                  {barber.rating} ⭐
                                </div>
                              )}
                            </div>

                            {/* Service Details */}
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Service Duration:
                                </span>
                                <span className="font-medium">
                                  {service?.duration} min
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium">
                                  ${service?.price}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Started:</span>
                                <span className="font-medium">
                                  {new Date(
                                    entry.joinedAt
                                  ).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>~45% Complete</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-orange-500 h-2 rounded-full animate-pulse"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => completeService(entry.id)}
                              disabled={isProcessing === entry.id}
                              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                              {isProcessing === entry.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Completing...</span>
                                </>
                              ) : (
                                <span>Complete Service</span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "queue" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Current Queue
                    </h2>
                    <select
                      value={queueFilters.sortBy}
                      onChange={(e) =>
                        setQueueFilters((prev) => ({
                          ...prev,
                          sortBy: e.target.value as any,
                        }))
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="position">Sort by Position</option>
                      <option value="joinTime">Sort by Join Time</option>
                      <option value="waitTime">Sort by Wait Time</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowQRCode(!showQRCode)}
                      className="flex items-center space-x-2 gradient-bg text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <QrCode size={18} />
                      <span>QR Code</span>
                    </button>

                    <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300">
                      <Bell size={18} />
                      <span>Notify All</span>
                    </button>
                  </div>
                </div>

                {showQRCode && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 animate-fadeInScale">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Walk-in QR Code
                      </h3>
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4 animate-pulse-slow">
                        <QrCode size={120} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Customers can scan this code to join your queue
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        {generateQRCode()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {activeQueue.length === 0 ? (
                    <div className="text-center py-12 animate-fadeInUp">
                      <Users className="text-gray-400 mx-auto mb-4" size={48} />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No customers in queue
                      </h3>
                      <p className="text-gray-600">
                        Queue entries will appear here as customers join
                      </p>
                    </div>
                  ) : (
                    activeQueue.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`bg-gray-50 rounded-xl p-4 animate-fadeInUp hover:shadow-md transition-all duration-300 ${
                          index === 0 ? "ring-2 ring-teal-500 bg-teal-50" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                                  index === 0 ? "bg-teal-600" : "bg-gray-400"
                                }`}
                              >
                                {entry.position}
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900">
                                  {entry.customerName}
                                </h3>
                                {entry.barberId && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                    Assigned to{" "}
                                    {
                                      mockBarbers.find(
                                        (b) => b.id === entry.barberId
                                      )?.name
                                    }
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="font-medium">
                                  {
                                    services.find(
                                      (s) => s.id === entry.serviceId
                                    )?.name
                                  }
                                </span>
                                <span>•</span>
                                <span>
                                  $
                                  {
                                    services.find(
                                      (s) => s.id === entry.serviceId
                                    )?.price
                                  }
                                </span>
                                <span>•</span>
                                <span>{entry.estimatedWaitTime} min wait</span>
                                <span>•</span>
                                <span>
                                  Joined{" "}
                                  {new Date(
                                    entry.joinedAt
                                  ).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {entry.status === "waiting" && index === 0 && (
                              <button
                                onClick={() => startService(entry.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                              >
                                Start Service
                              </button>
                            )}

                            <button
                              onClick={() => removeFromQueue(entry.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                              title="Remove from queue"
                            >
                              <UserX size={18} />
                            </button>

                            {/* Quick actions dropdown */}
                            <div className="relative group">
                              <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg">
                                <Settings size={16} />
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                                <div className="py-2">
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Send Notification
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Update Wait Time
                                  </button>
                                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Change Service
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Service Management
                  </h2>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                    Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-800">
                              Popular
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {service.description}
                          </p>

                          {/* Service stats */}
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                ${service.price}
                              </p>
                              <p className="text-xs text-gray-500">Price</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                {service.duration}
                              </p>
                              <p className="text-xs text-gray-500">Minutes</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                {
                                  queueEntries.filter(
                                    (e) => e.serviceId === service.id
                                  ).length
                                }
                              </p>
                              <p className="text-xs text-gray-500">
                                Booked Today
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button className="text-teal-600 hover:bg-teal-50 px-3 py-1 rounded text-sm transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Analytics & Insights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Today's Performance
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Customers</span>
                        <span className="font-medium">
                          {
                            queueEntries.filter((e) => e.status === "completed")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-medium">${totalEarnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Service Time</span>
                        <span className="font-medium">32 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Rating</span>
                        <span className="font-medium">4.8 ⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Popular Services
                    </h3>
                    <div className="space-y-3">
                      {services.map((service, index) => (
                        <div
                          key={service.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-600">{service.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-teal-600 h-2 rounded-full"
                                style={{
                                  width: `${(services.length - index) * 25}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {(services.length - index) * 25}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarberDashboard;
