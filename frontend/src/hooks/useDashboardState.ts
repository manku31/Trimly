import { useState } from "react";

export type TabType = "queue" | "services" | "current" | "analytics";

export function useDashboardState() {
  const [activeTab, setActiveTab] = useState<TabType>("queue");
  const [shopStatus, setShopStatus] = useState(true);

  return {
    activeTab,
    setActiveTab,
    shopStatus,
    setShopStatus,
  };
}
