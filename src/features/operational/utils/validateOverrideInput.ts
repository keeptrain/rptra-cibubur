export interface CreateOverrideInput {
  overrideDate: string; // YYYY-MM-DD
  status: "CLOSED" | "MODIFIED" | "OPEN";
  customOpenTime?: string | null;
  customCloseTime?: string | null;
  reasonNotice?: string | null;
}

export function validateOverrideInput(input: CreateOverrideInput): {
  isValid: boolean;
  message?: string;
} {
  if (!input.overrideDate) {
    return { isValid: false, message: "Tanggal override wajib diisi." };
  }

  if (
    input.status === "CLOSED" &&
    (!input.reasonNotice || !input.reasonNotice.trim())
  ) {
    return {
      isValid: false,
      message: "Alasan penutupan wajib diisi untuk status CLOSED.",
    };
  }

  if (
    input.status === "MODIFIED" &&
    (!input.customOpenTime || !input.customCloseTime)
  ) {
    return {
      isValid: false,
      message: "Jam buka & jam tutup khusus wajib diisi untuk status MODIFIED.",
    };
  }

  return { isValid: true };
}
