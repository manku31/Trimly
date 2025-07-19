import { useState } from "react";
import { mockQueueEntries } from "../data/mockData";
import type { QueueEntry } from "../types";

export function useQueueManagement() {
  const [queueEntries, setQueueEntries] =
    useState<QueueEntry[]>(mockQueueEntries);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const completeService = async (entryId: string) => {
    setIsProcessing(entryId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setQueueEntries((prev) =>
      prev
        .map((entry) =>
          entry.id === entryId
            ? { ...entry, status: "completed" as const }
            : entry
        )
        .map((entry, index) => ({
          ...entry,
          position: entry.status === "waiting" ? index + 1 : entry.position,
        }))
    );
    setIsProcessing(null);
  };

  const startService = (entryId: string) => {
    setQueueEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, status: "in-progress" as const }
          : entry
      )
    );
  };

  const removeFromQueue = (entryId: string) => {
    setQueueEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? { ...entry, status: "cancelled" as const }
          : entry
      )
    );
  };

  return {
    queueEntries,
    isProcessing,
    completeService,
    startService,
    removeFromQueue,
  };
}
