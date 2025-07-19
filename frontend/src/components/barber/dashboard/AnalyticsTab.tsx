import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  Star,
} from "lucide-react";
import type { QueueEntry, Service } from "../../../types";

interface AnalyticsTabProps {
  queueEntries: QueueEntry[];
  services: Service[];
}

function AnalyticsTab({ queueEntries, services }: AnalyticsTabProps) {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Filter today's data
  const todayEntries = queueEntries.filter(
    (entry) => new Date(entry.joinedAt) >= todayStart
  );

  const completedToday = todayEntries.filter(
    (entry) => entry.status === "completed"
  );
  const activeToday = todayEntries.filter(
    (entry) => entry.status === "in-progress"
  );
  const waitingToday = todayEntries.filter(
    (entry) => entry.status === "waiting"
  );

  // Calculate metrics
  const totalRevenue = completedToday.reduce((sum, entry) => {
    const service = services.find((s) => s.id === entry.serviceId);
    return sum + (service?.price || 0);
  }, 0);

  const avgWaitTime =
    waitingToday.length > 0
      ? Math.round(
          waitingToday.reduce(
            (sum, entry) => sum + entry.estimatedWaitTime,
            0
          ) / waitingToday.length
        )
      : 0;

  const totalServiceTime = completedToday.reduce((sum, entry) => {
    const service = services.find((s) => s.id === entry.serviceId);
    return sum + (service?.duration || 0);
  }, 0);

  // Popular services
  const serviceStats = services
    .map((service) => {
      const serviceEntries = completedToday.filter(
        (entry) => entry.serviceId === service.id
      );
      return {
        ...service,
        count: serviceEntries.length,
        revenue: serviceEntries.length * service.price,
      };
    })
    .sort((a, b) => b.count - a.count);

  // Hourly data (mock for visualization)
  const hourlyData = [
    { hour: "8:00", customers: 3, revenue: 180 },
    { hour: "9:00", customers: 7, revenue: 420 },
    { hour: "10:00", customers: 8, revenue: 480 },
    { hour: "11:00", customers: 6, revenue: 360 },
    { hour: "12:00", customers: 4, revenue: 240 },
    { hour: "13:00", customers: 9, revenue: 540 },
    { hour: "14:00", customers: 10, revenue: 600 },
    { hour: "15:00", customers: 8, revenue: 480 },
    { hour: "16:00", customers: 7, revenue: 420 },
    { hour: "17:00", customers: 9, revenue: 540 },
    { hour: "18:00", customers: 6, revenue: 360 },
    { hour: "19:00", customers: 4, revenue: 240 },
  ];

  // Calculate max customers for proper scaling
  const maxCustomers = Math.max(...hourlyData.map((data) => data.customers));

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      changeColor: "text-green-600",
    },
    {
      title: "Customers Served",
      value: completedToday.length,
      change: "+8%",
      trend: "up",
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      changeColor: "text-green-600",
    },
    {
      title: "Avg Wait Time",
      value: `${avgWaitTime} min`,
      change: "-5%",
      trend: "down",
      icon: Clock,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      changeColor: "text-green-600",
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      changeColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h2>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendIcon size={16} className={metric.changeColor} />
                    <span
                      className={`text-sm font-medium ml-1 ${metric.changeColor}`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      vs yesterday
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={metric.iconColor} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Services Today
          </h3>
          <div className="space-y-4">
            {serviceStats.slice(0, 5).map((service, index) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">
                      {service.count} customers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${service.revenue}
                  </p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Queue Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current Queue Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Customers Waiting</p>
                <p className="text-sm text-blue-600">In queue right now</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {waitingToday.length}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Active Services</p>
                <p className="text-sm text-green-600">Currently being served</p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {activeToday.length}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-purple-900">
                  Total Service Time
                </p>
                <p className="text-sm text-purple-600">Minutes spent today</p>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {totalServiceTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Activity Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Hourly Activity
        </h3>
        <div className="grid grid-cols-12 gap-2 h-40 items-end">
          {hourlyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center h-full">
              <div className="flex-1 flex items-end w-full">
                <div
                  className="w-full bg-teal-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                  style={{
                    height: `${Math.max(
                      (data.customers / maxCustomers) * 120,
                      8
                    )}px`,
                  }}
                  title={`${data.hour}: ${data.customers} customers, $${data.revenue} revenue`}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-top whitespace-nowrap">
                {data.hour}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span>Customer Volume</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsTab;
