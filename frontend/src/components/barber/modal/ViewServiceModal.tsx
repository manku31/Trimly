import {
  X,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Eye,
} from "lucide-react";
import type { Service, QueueEntry } from "../../../types";

interface ViewServiceModalProps {
  open: boolean;
  onClose: () => void;
  service: Service | null;
  queueEntries: QueueEntry[];
}

function ViewServiceModal({
  open,
  onClose,
  service,
  queueEntries,
}: ViewServiceModalProps) {
  if (!service) return null;

  const getServiceStats = () => {
    const completedServices = queueEntries.filter(
      (entry) => entry.serviceId === service.id && entry.status === "completed"
    );
    const inProgress = queueEntries.filter(
      (entry) =>
        entry.serviceId === service.id && entry.status === "in-progress"
    );
    const waiting = queueEntries.filter(
      (entry) => entry.serviceId === service.id && entry.status === "waiting"
    );

    const totalRevenue = completedServices.length * service.price || 0;

    return {
      completedToday: completedServices.length,
      inProgress: inProgress.length,
      waiting: waiting.length,
      totalRevenue,
      totalBookings:
        completedServices.length + inProgress.length + waiting.length,
    };
  };

  const stats = getServiceStats();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        open
          ? "opacity-100 visible backdrop-blur-md bg-white/20"
          : "opacity-0 invisible backdrop-blur-none bg-transparent"
      }`}
      onClick={handleBackdropClick}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className={`bg-white backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] border border-gray-200 transition-all duration-500 ease-out transform flex flex-col ${
          open
            ? "opacity-100 scale-100 translate-y-0 rotate-0"
            : "opacity-0 scale-90 translate-y-8 rotate-1"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Eye className="text-teal-600" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600">
                Service Details & Analytics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Service Overview */}
          <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">
              Service Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">
                      ${service.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {service.duration} min
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">
                      {service.category || "Uncategorized"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <p className="text-gray-900">{service.description}</p>
            </div>
          </div>

          {/* Today's Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-600" size={16} />
                </div>
                <h4 className="font-semibold text-gray-900">
                  Today's Activity
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {stats.completedToday}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">In Progress</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {stats.inProgress}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Waiting</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {stats.waiting}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Total Bookings
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {stats.totalBookings}
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Analytics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={16} />
                </div>
                <h4 className="font-semibold text-gray-900">Revenue Details</h4>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${stats.totalRevenue.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700">Today's Revenue</div>
                  <div className="text-xs text-green-600 mt-1">
                    {stats.completedToday} services completed
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                    <div className="text-lg font-bold text-gray-900">
                      ${service.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">Per Service</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
                    <div className="text-lg font-bold text-gray-900">
                      $
                      {stats.completedToday > 0
                        ? (stats.totalRevenue / stats.completedToday).toFixed(2)
                        : "0.00"}
                    </div>
                    <div className="text-xs text-gray-500">Avg per Booking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Performance */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">
              Service Performance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {(
                    (stats.completedToday / (stats.totalBookings || 1)) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {service.duration}
                </div>
                <div className="text-sm text-gray-600">Avg Duration (min)</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  ${(stats.totalRevenue / (service.duration / 60)).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Revenue per Hour</div>
              </div>
            </div>
          </div>

          {/* Add some extra space at the bottom for better scrolling */}
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}

export default ViewServiceModal;
