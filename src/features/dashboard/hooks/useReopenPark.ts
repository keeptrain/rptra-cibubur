"use client";

import { useState } from "react";
import { updateParkStatusAction } from "../actions/updateParkStatusAction";

export function useReopenPark() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReopenPark = async (onSuccess?: () => void) => {
    setIsLoading(true);
    setMessage("");

    const res = await updateParkStatusAction("OPEN", "");
    setIsLoading(false);

    if (res.success) {
      setMessage(
        "Berhasil membuka kembali taman. Pengumuman penutupan dibersihkan.",
      );
      if (onSuccess) onSuccess();
    } else {
      setMessage(res.error || "Gagal membuka kembali taman.");
    }
  };

  return {
    isLoading,
    message,
    setMessage,
    handleReopenPark,
  };
}
