import { Clock, CheckCircle, User, DollarSign } from "lucide-react";
import type { QueueEntry, Service } from "../../../types";
import { mockBarbers } from "../../../data/mockData";

interface ActiveServicesTabProps {
  queueEntries: QueueEntry[];
  services: Service[];
  onCompleteService: (entryId: string) => void;
  isProcessing: string | null;
}

function ActiveServicesTab({
  queueEntries,
  services,
  onCompleteService,
  isProcessing,
}: ActiveServicesTabProps) {
  const activeServices = queueEntries.filter(
    (entry) => entry.status === "in-progress"
  );

  const getServiceDetails = (serviceId: string) => {
    return services.find((s) => s.id === serviceId);
  };

  const getBarberName = (barberId: string) => {
    return mockBarbers.find((b) => b.id === barberId)?.name || "Unknown Barber";
  };

  if (activeServices.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No active services
        </h3>
        <p className="text-gray-600">
          Services currently being performed will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Active Services</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <CheckCircle size={20} />
          <span>{activeServices.length} services in progress</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeServices.map((entry) => {
          const service = getServiceDetails(entry.serviceId);
          const isCompleting = isProcessing === entry.id;

          return (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {entry.customerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Started: {new Date(entry.joinedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>In Progress</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {service?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {service?.duration} minutes
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="font-semibold">{service?.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Assigned Barber</p>
                      <p className="font-medium text-gray-900">
                        {getBarberName(entry.barberId)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock size={16} />
                      <span className="text-sm">
                        {service?.duration}m service
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onCompleteService(entry.id)}
                  disabled={isCompleting}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isCompleting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isCompleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span>Complete Service</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActiveServicesTab;
