import { Power, Bell } from "lucide-react";
import { useState } from "react";
import SettingsModal from "../modal/SettingsModal";
import type { BarberShop } from "../../../types";

interface DashboardHeaderProps {
  shopStatus: boolean;
  onShopStatusChange: (status: boolean) => void;
  shop: BarberShop;
  onUpdateShop: (updatedShop: BarberShop) => void;
}

function DashboardHeader({
  shopStatus,
  onShopStatusChange,
  shop,
  onUpdateShop,
}: DashboardHeaderProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="mb-8 animate-fadeInUp">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Barber Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your queue and services at {shop.name}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Power
                className={`${shopStatus ? "text-green-600" : "text-gray-400"}`}
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
                onClick={() => onShopStatusChange(!shopStatus)}
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

          <div className="flex items-center space-x-2">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Bell size={16} />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="gradient-bg text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        shop={shop}
        onUpdateShop={onUpdateShop}
      />
    </div>
  );
}

export default DashboardHeader;
