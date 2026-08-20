import { getAgenda, AgendaData } from "./getAgenda";
import { WibDateDetails } from "../utils/utils";

export type ManagementAgendaData = AgendaData;

/**
 * Management Agenda wrapper delegating to core reusable getAgenda fetcher.
 */
export async function getManagementAgenda(
  wibDate: WibDateDetails,
): Promise<ManagementAgendaData> {
  return await getAgenda(wibDate);
}
