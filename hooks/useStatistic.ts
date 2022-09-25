import { useFetch, UseFetchOptions } from "@vincecao/use-tools";
import iso_countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json"
import { useMemo } from "react";

import { API_KEY } from "../data/constants";
import { Statistics, StatisticsResponse } from "../types";

iso_countries.registerLocale(en);

export default function useStatistic() {
  const statisticOptions = useMemo<UseFetchOptions>(() => {
    const DOMAIN = "covid-193.p.rapidapi.com";
    const HEADERS = {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": DOMAIN,
      "x-rapidapi-key": API_KEY,
      useQueryString: "true",
    };
    
    function parseResponse(response: string): Statistics {
      const parsed = JSON.parse(response);
      return {
        ...parsed,
        response: (parsed.response as StatisticsResponse[]).filter((r) => !['All', 'Europe', 'Asia', 'North-America', 'South-America'].includes(r.country)).map((r) => ({
          ...r,
          alpha2code: iso_countries.getAlpha2Code(r.country.replace(/-/, " "), 'en') || "NA",
          alpha3code: iso_countries.getAlpha3Code(r.country.replace(/-/, " "), 'en') || "NA",
        })).filter((r) => r.alpha3code !== "NA")
      };
    }

    return {
      headers: HEADERS,
      baseURL: `https://${DOMAIN}`,
      parseResponse,
    };
  }, []);

  return useFetch<Statistics>(`/statistics`, statisticOptions);
}
