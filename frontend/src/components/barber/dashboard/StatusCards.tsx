import { Users, CheckCircle, Clock, DollarSign } from "lucide-react";
import type { QueueEntry } from "../../../types";

interface StatusCardsProps {
  queueEntries: QueueEntry[];
  activeTab: string;
  onTabChange: (tab: "queue" | "services" | "current" | "analytics") => void;
}

function StatusCards({
  queueEntries,
  activeTab,
  onTabChange,
}: StatusCardsProps) {
  const activeQueue = queueEntries.filter(
    (entry) => entry.status === "waiting"
  );
  const currentServices = queueEntries.filter(
    (entry) => entry.status === "in-progress"
  );
  const completedToday = queueEntries.filter(
    (entry) => entry.status === "completed"
  );

  const totalEarnings = completedToday.reduce((sum, entry) => {
    // This would come from your services data
    return sum + 25; // Mock price
  }, 0);

  const avgWaitTime =
    activeQueue.length > 0
      ? Math.round(
          activeQueue.reduce((sum, entry) => sum + entry.estimatedWaitTime, 0) /
            activeQueue.length
        )
      : 0;

  const cards = [
    {
      id: "queue",
      title: "Queue Length",
      value: activeQueue.length,
      subtitle: `+${completedToday.length} completed today`,
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      subtitleColor: "text-green-600",
    },
    {
      id: "current",
      title: "Active Services",
      value: currentServices.length,
      subtitle:
        currentServices.length > 0
          ? "Services in progress"
          : "No active services",
      icon: CheckCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      subtitleColor: "text-orange-600",
    },
    {
      id: "analytics",
      title: "Avg Wait Time",
      value: `${avgWaitTime} min`,
      subtitle: "",
      icon: Clock,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      subtitleColor: "",
    },
    {
      id: "analytics",
      title: "Today's Earnings",
      value: `$${totalEarnings}`,
      subtitle: "",
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      subtitleColor: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 animate-fadeInScale hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => onTabChange(card.id as any)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.subtitle && (
                  <p className={`text-xs mt-1 ${card.subtitleColor}`}>
                    {card.subtitle}
                  </p>
                )}
              </div>
              <div
                className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center animate-pulse-slow`}
              >
                <Icon className={card.iconColor} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatusCards;
