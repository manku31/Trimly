import { useState } from "react";
import {
  X,
  Store,
  Users,
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";
import type { BarberShop, Barber } from "../../../types";
import StoreSettingsTab from "./settings/StoreSettingsTab";
import EmployeeSettingsTab from "./settings/EmployeeSettingsTab";
import NotificationSettingsTab from "./settings/NotificationSettingsTab";
import SecuritySettingsTab from "./settings/SecuritySettingsTab";
import PaymentSettingsTab from "./settings/PaymentSettingsTab";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  shop: BarberShop;
  onUpdateShop: (updatedShop: BarberShop) => void;
}

type SettingsTab =
  | "store"
  | "employees"
  | "notifications"
  | "security"
  | "payments";

function SettingsModal({
  open,
  onClose,
  shop,
  onUpdateShop,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("store");

  const tabs = [
    { id: "store" as const, label: "Store Details", icon: Store },
    { id: "employees" as const, label: "Employees", icon: Users },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "payments" as const, label: "Payments", icon: CreditCard },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "store":
        return <StoreSettingsTab shop={shop} onUpdateShop={onUpdateShop} />;
      case "employees":
        return <EmployeeSettingsTab shop={shop} onUpdateShop={onUpdateShop} />;
      case "notifications":
        return <NotificationSettingsTab />;
      case "security":
        return <SecuritySettingsTab />;
      case "payments":
        return <PaymentSettingsTab />;
      default:
        return <StoreSettingsTab shop={shop} onUpdateShop={onUpdateShop} />;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
        open
          ? "opacity-100 visible backdrop-blur-md bg-gray-900/20"
          : "opacity-0 invisible backdrop-blur-none bg-transparent"
      }`}
      onClick={handleBackdropClick}
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] border border-white/30 transition-all duration-500 ease-out transform flex ${
          open
            ? "opacity-100 scale-100 translate-y-0 rotate-0"
            : "opacity-0 scale-90 translate-y-8 rotate-1"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="w-80 bg-gray-50/50 backdrop-blur-sm border-r border-gray-200/50 rounded-l-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <SettingsIcon className="text-teal-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Settings
                </h3>
                <p className="text-sm text-gray-600">Manage your barbershop</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100/50 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? "bg-teal-100/80 text-teal-700 backdrop-blur-sm"
                      : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
