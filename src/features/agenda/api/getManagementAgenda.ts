import { getAgenda, AgendaData } from "./getAgenda";

export type ManagementAgendaData = AgendaData;

/**
 * Management Agenda wrapper delegating to core reusable getAgenda fetcher.
 */
export async function getManagementAgenda(): Promise<ManagementAgendaData> {
  return await getAgenda();
}
