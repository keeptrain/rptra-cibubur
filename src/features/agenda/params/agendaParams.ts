import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { AgendaStatus } from "../constants/agendas";
import { getCurrentWibDateDetails } from "../utils/utils";

const wibDate = getCurrentWibDateDetails();

export const agendaSearchParams = {
  status: parseAsStringEnum<AgendaStatus>([
    "ALL",
    "UPCOMING",
    "COMPLETED",
    "PENDING",
  ]).withDefault("ALL"),
  month: parseAsString.withDefault(wibDate.month),
  year: parseAsString.withDefault(wibDate.year),
  q: parseAsString.withDefault(""),
};

export const agendaSearchParamsCache = createSearchParamsCache(agendaSearchParams);
