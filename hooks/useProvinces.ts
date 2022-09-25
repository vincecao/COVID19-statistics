import { format, subMonths } from "date-fns";
import iso_countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { useEffect, useMemo, useState } from "react";

import { Report, ReportNumberField } from "../types";
import { fetchReport } from "./useReport";

iso_countries.registerLocale(en);

type Province = { [province in string]: number }

export default function useProvince(selected: string, type: keyof ReportNumberField):  [Province[], string[]] {
  const [provinces, setProvinces] = useState<Province[]>([]);
  useEffect(() => {
    async function getPastXDaysReports(days: number): Promise<Province> {
      try {
        const reducer = (acc: Province, cur: Report): Province => ({
          ...acc,
          [cur.region.province || 'N/A']: cur[type] || 0,
        });

        const data = await fetchReport({
          iso: selected,
          date: format(subMonths(new Date(), days), "yyyy-MM-dd"),
        });

        return data
          ?.filter((r) => r.region.alpha3code === selected)
          .sort((r1, r2) => r2.confirmed - r1.confirmed)
          .slice(0, 6)
          .reduce(reducer, {});
      } catch (e) {
        throw e as Error;
      }
    }

    const delayIncrement = 500;
    let delay = 0;

    const promiseChain = Array.from(Array(10)).map((_, i) => {
      const p = new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
        try {
          return getPastXDaysReports(i);
        } catch (err) {
          console.error(err);
          return {};
        }
      });
      delay += delayIncrement;
      return p;
    });

    Promise.all(promiseChain).then(setProvinces);
  }, [selected, type]);

  const normalizedProvinces = useMemo(() => (provinces.filter((p) => Object.keys(p).length !== 0).reverse()), [provinces])
  const keys = useMemo(() => (Object.keys(normalizedProvinces?.[0] || {})), [normalizedProvinces])

  // if some key is not shown in all data, stream graph will show error
  const validatedProvinces = useMemo(() => {
    return normalizedProvinces.map((item) => {
      const province = {}
      keys.forEach((key) => {
        province[key] = item[key] || 0
      })
      return province;
    })
  }, [normalizedProvinces, keys] )

  return [validatedProvinces, keys];
}
