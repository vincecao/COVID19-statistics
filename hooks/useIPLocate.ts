import { useFetch, UseFetchOptions } from "@vincecao/use-tools";
import iso_countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { useMemo } from "react";
import { IPLocateResponse } from "../types";

iso_countries.registerLocale(en);

export default function useIPLocate() {
  const IPLocateOptions = useMemo<UseFetchOptions>(() => {
    const DOMAIN = "iplocate.io";
    function parseResponse(response: string): IPLocateResponse {
      const parsed = JSON.parse(response);
      return {
        ...parsed,
        alpha2code: parsed.country_code,
        alpha3code: iso_countries.alpha2ToAlpha3(parsed.country_code),
      };
    }
    return { baseURL: `https://${DOMAIN}`, parseResponse };
  }, []);

  return useFetch<IPLocateResponse>("/api/lookup/", IPLocateOptions);
}
