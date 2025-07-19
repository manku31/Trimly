import { useState } from "react";
import { Plus, Edit, Trash2, User, Star, Award } from "lucide-react";
import type { BarberShop, Barber } from "../../../../types";

interface EmployeeSettingsTabProps {
  shop: BarberShop;
  onUpdateShop: (updatedShop: BarberShop) => void;
}

function EmployeeSettingsTab({ shop, onUpdateShop }: EmployeeSettingsTabProps) {
  const [employees, setEmployees] = useState<Barber[]>(shop.barbers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    specialties: "",
    experience: "",
    isAvailable: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee: Barber = {
      id: Math.random().toString(36).slice(2),
      name: formData.name,
      avatar:
        formData.avatar ||
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 0,
      specialties: formData.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isAvailable: formData.isAvailable,
      experience: formData.experience,
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    onUpdateShop({ ...shop, barbers: updatedEmployees });

    // Reset form
    setFormData({
      name: "",
      avatar: "",
      specialties: "",
      experience: "",
      isAvailable: true,
    });
    setShowAddForm(false);
  };

  const handleEditEmployee = (employee: Barber) => {
    setEditingEmployee(employee.id);
    setFormData({
      name: employee.name,
      avatar: employee.avatar,
      specialties: employee.specialties.join(", "),
      experience: employee.experience,
      isAvailable: employee.isAvailable,
    });
  };

  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEmployees = employees.map((emp) =>
      emp.id === editingEmployee
        ? {
            ...emp,
            name: formData.name,
            avatar: formData.avatar,
            specialties: formData.specialties
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            experience: formData.experience,
            isAvailable: formData.isAvailable,
          }
        : emp
    );

    setEmployees(updatedEmployees);
    onUpdateShop({ ...shop, barbers: updatedEmployees });
    setEditingEmployee(null);
    setFormData({
      name: "",
      avatar: "",
      specialties: "",
      experience: "",
      isAvailable: true,
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm("Are you sure you want to remove this employee?")) {
      const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
      setEmployees(updatedEmployees);
      onUpdateShop({ ...shop, barbers: updatedEmployees });
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      avatar: "",
      specialties: "",
      experience: "",
      isAvailable: true,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Employee Management
          </h2>
          <p className="text-gray-600">Manage your barbershop staff</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Add/Edit Employee Form */}
      {(showAddForm || editingEmployee) && (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingEmployee ? "Edit Employee" : "Add New Employee"}
          </h3>

          <form
            onSubmit={
              editingEmployee ? handleUpdateEmployee : handleAddEmployee
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="e.g., 5+ years"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties *
                </label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  placeholder="e.g., Classic Cuts, Beard Styling (comma separated)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isAvailable: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Currently Available
                  </span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center space-x-2"
              >
                {editingEmployee ? <Edit size={16} /> : <Plus size={16} />}
                <span>
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </span>
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Employee List */}
      <div className="space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {employee.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star
                        className="text-yellow-500"
                        size={16}
                        fill="currentColor"
                      />
                      <span className="text-sm text-gray-600">
                        {employee.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-600">
                        {employee.experience}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {employee.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditEmployee(employee)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                  title="Edit employee"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                  title="Remove employee"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {employees.length === 0 && (
          <div className="text-center py-12">
            <User className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No employees added
            </h3>
            <p className="text-gray-600 mb-4">
              Add your first employee to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeSettingsTab;
