import { usePromiseState } from "@vincecao/use-tools";
import iso_countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { $fetch } from "ohmyfetch";
import { useCallback } from "react";

import { API_KEY } from "../data/constants";
import { Report } from "../types";

iso_countries.registerLocale(en);

const DOMAIN = "covid-19-statistics.p.rapidapi.com";
const HEADERS = {
  "content-type": "application/octet-stream",
  "x-rapidapi-host": DOMAIN,
  "x-rapidapi-key": API_KEY,
  useQueryString: "true",
};
function parseResponse(response: string): Report[] {
  const parsed = JSON.parse(response);
  return (parsed.data as Report[]).map((report) => ({
    ...report,
    region: {
      ...report.region,
      alpha2code: iso_countries.alpha3ToAlpha2(report.region.iso),
      alpha3code: report.region.iso,
    },
  }));
}

export type ReportParams = {
  iso: string;
  date: string;
};

export default function useReport(reportParams: ReportParams) {
  return usePromiseState<Report[]>(useCallback(() => fetchReport(reportParams), [reportParams]));
}

export function fetchReport(reportParams: ReportParams): Promise<Report[]> {
  return $fetch("/reports", {
    headers: HEADERS,
    baseURL: `https://${DOMAIN}`,
    params: reportParams,
    parseResponse,
  });
}
