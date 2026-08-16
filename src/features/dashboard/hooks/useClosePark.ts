"use client";

import { useState } from "react";
import { updateParkStatusAction } from "../actions/updateParkStatusAction";

export function useClosePark() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClosePark = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsLoading(true);
    setMessage("");

    const res = await updateParkStatusAction("CLOSED", reason);
    setIsLoading(false);

    if (res.success) {
      setMessage("Berhasil mencatat penutupan taman hari ini.");
      setReason("");
      setIsFormOpen(false);
    } else {
      setMessage(res.error || "Gagal mengubah status taman.");
    }
  };

  return {
    isFormOpen,
    setIsFormOpen,
    reason,
    setReason,
    isLoading,
    message,
    setMessage,
    handleClosePark,
  };
}
