import { Users, CheckCircle, Settings, DollarSign } from "lucide-react";

interface NavigationTabsProps {
  activeTab: "queue" | "services" | "current" | "analytics";
  onTabChange: (tab: "queue" | "services" | "current" | "analytics") => void;
}

function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: "queue" as const, label: "Current Queue", icon: Users },
    { id: "current" as const, label: "Active Services", icon: CheckCircle },
    { id: "services" as const, label: "Services", icon: Settings },
    { id: "analytics" as const, label: "Analytics", icon: DollarSign },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg mb-8 animate-fadeInUp hover:shadow-xl transition-all duration-300">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
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
    </div>
  );
}

export default NavigationTabs;
