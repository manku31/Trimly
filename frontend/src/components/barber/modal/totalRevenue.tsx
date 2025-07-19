import {
  X,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Calendar,
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
  if (!open || !service) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Basic Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Service Name
                </label>
                <p className="text-gray-900 font-medium">{service.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description
                </label>
                <p className="text-gray-900">{service.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                  {service.category}
                </span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <DollarSign className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-2xl font-bold text-blue-600">
                ${service.price}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Clock className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-2xl font-bold text-green-600">
                {service.duration} min
              </p>
            </div>
          </div>

          {/* Today's Statistics */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2 text-teal-600" size={20} />
              Today's Activity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.completedToday}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.inProgress}
                </div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.waiting}
                </div>
                <div className="text-sm text-gray-500">Waiting</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalBookings}
                </div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
            </div>
          </div>

          {/* Revenue Information */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="mr-2 text-green-600" size={20} />
              Revenue Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Revenue:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${stats.totalRevenue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue per Service:</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${service.price.toFixed(2)}
                </span>
              </div>
              {stats.completedToday > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average per Booking:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${(stats.totalRevenue / stats.completedToday).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewServiceModal;
