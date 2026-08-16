"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export interface OperationLogItem {
  id: string;
  override_date: string;
  status: "CLOSED" | "MODIFIED" | "OPEN";
  custom_open_time: string | null;
  custom_close_time: string | null;
  reason_notice: string | null;
  created_at: string;
}

export interface GetOperationLogsResponse {
  logs: OperationLogItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function getOperationLogsAction(page = 1, pageSize = 10): Promise<GetOperationLogsResponse> {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase
      .from("park_operation_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error || !data) {
      return { logs: [], totalCount: 0, totalPages: 1, currentPage: 1 };
    }

    const total = count || 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      logs: data as OperationLogItem[],
      totalCount: total,
      totalPages,
      currentPage: page,
    };
  } catch {
    return { logs: [], totalCount: 0, totalPages: 1, currentPage: 1 };
  }
}
