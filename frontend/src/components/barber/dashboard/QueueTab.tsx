import { useState } from "react";
import { Clock, Users, Play, X, Eye, QrCode } from "lucide-react";
import type { QueueEntry, Service, BarberShop } from "../../../types";
import CustomerDetails from "./CustomerDetails";
import QRCodeSection from "./QRCodeSection";

interface QueueTabProps {
  queueEntries: QueueEntry[];
  services: Service[];
  onStartService: (entryId: string) => void;
  onRemoveFromQueue: (entryId: string) => void;
  shop: BarberShop;
}

function QueueTab({
  queueEntries,
  services,
  onStartService,
  onRemoveFromQueue,
  shop,
}: QueueTabProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const waitingCustomers = queueEntries.filter(
    (entry) => entry.status === "waiting"
  );

  const getServiceName = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.name || "Unknown Service";
  };

  const getServicePrice = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.price || 0;
  };

  if (waitingCustomers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="text-gray-400" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No customers in queue
        </h3>
        <p className="text-gray-600 mb-6">
          Share your QR code to let customers join the queue
        </p>
        <button
          onClick={() => setShowQRCode(true)}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
        >
          <QrCode size={20} />
          <span>Show QR Code</span>
        </button>

        {showQRCode && (
          <QRCodeSection shop={shop} onClose={() => setShowQRCode(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Current Queue</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users size={20} />
            <span>{waitingCustomers.length} customers waiting</span>
          </div>
          <button
            onClick={() => setShowQRCode(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <QrCode size={16} />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {waitingCustomers.map((entry, index) => (
          <div
            key={entry.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {entry.position}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {entry.customerName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Service: {getServiceName(entry.serviceId)}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock size={14} />
                        <span className="text-xs">
                          ~{entry.estimatedWaitTime} min wait
                        </span>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        ${getServicePrice(entry.serviceId)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      setSelectedCustomer(
                        selectedCustomer === entry.id ? null : entry.id
                      )
                    }
                    className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    title="View customer details"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onStartService(entry.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Play size={16} />
                    <span>Start Service</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromQueue(entry.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                    title="Remove from queue"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {selectedCustomer === entry.id && (
              <CustomerDetails
                entry={entry}
                onClose={() => setSelectedCustomer(null)}
              />
            )}
          </div>
        ))}
      </div>

      {showQRCode && (
        <QRCodeSection shop={shop} onClose={() => setShowQRCode(false)} />
      )}
    </div>
  );
}

export default QueueTab;
