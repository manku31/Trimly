import { Phone, Mail, Calendar, ChevronUp, MessageCircle } from "lucide-react";
import type { QueueEntry } from "../../../types";
import { mockBarbers } from "../../../data/mockData";

interface CustomerDetailsProps {
  entry: QueueEntry;
  onClose: () => void;
}

function CustomerDetails({ entry, onClose }: CustomerDetailsProps) {
  // Mock customer details - in real app, this would come from your data
  const customerDetails = {
    phone: "+1 (555) 123-4567",
    email: "customer@example.com",
    joinDate: "Member since Jan 2023",
    lastVisit: "2 weeks ago",
    totalVisits: 12,
    preferredBarber:
      mockBarbers.find((b) => b.id === entry.barberId)?.name || "No preference",
    notes: "Prefers short haircuts, allergic to certain hair products",
  };

  return (
    <div className="border-t border-gray-200 bg-white rounded-b-xl animate-fadeInUp">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
          >
            <ChevronUp size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 mb-3">
              Contact Information
            </h4>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {customerDetails.phone}
                </p>
                <p className="text-xs text-gray-500">Phone</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail size={18} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {customerDetails.email}
                </p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar size={18} className="text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {customerDetails.joinDate}
                </p>
                <p className="text-xs text-gray-500">Member since</p>
              </div>
            </div>
          </div>

          {/* Visit History & Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 mb-3">
              Visit History & Preferences
            </h4>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Total Visits</span>
                <span className="font-semibold text-gray-900">
                  {customerDetails.totalVisits}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Visit</span>
                <span className="text-sm text-gray-900">
                  {customerDetails.lastVisit}
                </span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Preferred Barber</p>
              <p className="font-medium text-gray-900">
                {customerDetails.preferredBarber}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Notes</p>
              <p className="text-sm text-gray-900">{customerDetails.notes}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
              <Phone size={16} />
              <span>Call</span>
            </button>

            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              <MessageCircle size={16} />
              <span>Message</span>
            </button>

            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              <Mail size={16} />
              <span>Email</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
