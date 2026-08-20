import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { AgendaStatus } from "../constants/agendas";

export const agendaSearchParams = {
  status: parseAsStringEnum<AgendaStatus>([
    "ALL",
    "UPCOMING",
    "COMPLETED",
    "PENDING",
  ]).withDefault("ALL"),
  month: parseAsString,
  year: parseAsString,
  q: parseAsString.withDefault(""),
};

export const agendaSearchParamsCache = createSearchParamsCache(agendaSearchParams);
