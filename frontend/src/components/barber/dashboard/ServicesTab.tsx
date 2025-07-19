import { useState } from "react";
import {
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import type { Service, QueueEntry } from "../../../types";
import AddServiceModal from "../modal/AddServiceModal";
import ViewServiceModal from "../modal/ViewServiceModal";
import EditServiceModal from "../modal/EditServiceModal";

interface ServicesTabProps {
  services: Service[];
  queueEntries: QueueEntry[];
}

function ServicesTab({ services, queueEntries }: ServicesTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [localServices, setLocalServices] = useState<Service[]>(services);

  const categories = [
    "all",
    ...new Set(
      localServices.map((service) => service.category || "uncategorized")
    ),
  ];

  const filteredServices = localServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (service.category || "uncategorized") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getServiceStats = (serviceId: string) => {
    const completedServices = queueEntries.filter(
      (entry) => entry.serviceId === serviceId && entry.status === "completed"
    );
    const inProgress = queueEntries.filter(
      (entry) => entry.serviceId === serviceId && entry.status === "in-progress"
    );
    const waiting = queueEntries.filter(
      (entry) => entry.serviceId === serviceId && entry.status === "waiting"
    );

    return {
      completedToday: completedServices.length,
      inProgress: inProgress.length,
      waiting: waiting.length,
      totalRevenue:
        completedServices.length *
        (services.find((s) => s.id === serviceId)?.price || 0),
    };
  };

  const handleAddService = (service: Service) => {
    setLocalServices((prev) => [...prev, service]);
  };

  const handleUpdateService = (updatedService: Service) => {
    setLocalServices((prev) =>
      prev.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Services Management
        </h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          <span>Add Service</span>
        </button>
      </div>

      <AddServiceModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddService}
      />

      <ViewServiceModal
        open={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedService(null);
        }}
        service={selectedService}
        queueEntries={queueEntries}
      />

      <EditServiceModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedService(null);
        }}
        service={selectedService}
        onUpdate={handleUpdateService}
      />

      {/* Search and Filters */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const stats = getServiceStats(service.id);

          return (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {service.description}
                    </p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {service.category}
                    </span>
                  </div>

                  <div className="flex space-x-1 ml-2">
                    <button className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-green-600" size={16} />
                      <span className="text-sm text-gray-600">Price</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="text-blue-600" size={16} />
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {service.duration} min
                    </span>
                  </div>
                </div>

                {/* Service Stats */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Today's Activity
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {stats.completedToday}
                      </div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {stats.waiting}
                      </div>
                      <div className="text-xs text-gray-500">Waiting</div>
                    </div>
                  </div>

                  {/* {stats.totalRevenue > 0 && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg text-center">
                      <div className="text-sm font-medium text-green-800">
                        Revenue: ${stats.totalRevenue}
                      </div>
                    </div>
                  )} */}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-lg hover:bg-teal-700 transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                    onClick={() => handleViewDetails(service)}
                  >
                    <Eye size={14} />
                    <span>View Details</span>
                  </button>
                  <button
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit size={14} />
                    <span>Edit Service</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No services found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
}

export default ServicesTab;
