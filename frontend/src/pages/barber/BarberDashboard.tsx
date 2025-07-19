import { useState } from "react";
import { mockBarberShops, mockServices } from "../../data/mockData";
import type { Service } from "../../types";
import Header from "../../components/common/Header";
import DashboardHeader from "../../components/barber/dashboard/DashboardHeader";
import StatusCards from "../../components/barber/dashboard/StatusCards";
import NavigationTabs from "../../components/barber/dashboard/NavigationTabs";
import { useQueueManagement } from "../../hooks/useQueueManagement";
import { useDashboardState } from "../../hooks/useDashboardState";
import QueueTab from "../../components/barber/dashboard/QueueTab";
import ActiveServicesTab from "../../components/barber/dashboard/ActiveServicesTab";
import ServicesTab from "../../components/barber/dashboard/ServicesTab";
import AnalyticsTab from "../../components/barber/dashboard/AnalyticsTab";
import DashboardLayout from "../../components/barber/dashboard/DashboardLayout";

function BarberDashboard() {
  const [services] = useState<Service[]>(mockServices);
  const shop = mockBarberShops[0];

  const {
    queueEntries,
    isProcessing,
    completeService,
    startService,
    removeFromQueue,
  } = useQueueManagement();

  const { activeTab, setActiveTab, shopStatus, setShopStatus } =
    useDashboardState();

  const renderTabContent = () => {
    switch (activeTab) {
      case "queue":
        return (
          <QueueTab
            queueEntries={queueEntries}
            services={services}
            onStartService={startService}
            onRemoveFromQueue={removeFromQueue}
            shop={shop}
          />
        );
      case "current":
        return (
          <ActiveServicesTab
            queueEntries={queueEntries}
            services={services}
            onCompleteService={completeService}
            isProcessing={isProcessing}
          />
        );
      case "services":
        return <ServicesTab services={services} queueEntries={queueEntries} />;
      case "analytics":
        return <AnalyticsTab queueEntries={queueEntries} services={services} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-slate-100 to-zinc-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          shopStatus={shopStatus}
          onShopStatusChange={setShopStatus}
        />

        <StatusCards
          queueEntries={queueEntries}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <DashboardLayout>{renderTabContent()}</DashboardLayout>
      </div>
    </div>
  );
}

export default BarberDashboard;
