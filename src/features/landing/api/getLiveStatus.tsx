export const getLiveStatus = async () => {
  // TODO: Implement actual park live status
  // from database
  const isOpen = null;

  // Set initial value for closeNotice
  const closeNotice = "Sedang ada acara mendadak, harap menunggu";
  const timeZone = "Asia/Jakarta";

  // If isOpen is not set, check current time
  const isParkOpen =
    isOpen ??
    (() => {
      const nowWib = new Date(new Date().toLocaleString("en-US", { timeZone }));
      const hours = nowWib.getHours();
      
      // RPTRA Cibubur open hours: 06:00 - 18:00 WIB
      return hours >= 6 && hours < 18;
    })();

  // Dynamic repetition calculation based on text length
  const repeatCount = Math.max(8, Math.ceil(180 / (closeNotice.length || 1)));
  const noticeItems = Array.from({ length: repeatCount }, () => closeNotice);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    isOpen: isParkOpen,
    closeNotice: noticeItems,
  };
};

export type ParkLiveStatusResponse = Awaited<ReturnType<typeof getLiveStatus>>;
