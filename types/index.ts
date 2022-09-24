// IPLocate

export type IPLocateResponse = {
  asn: string;
  city: string;
  continent: string;
  country: string;
  country_code: string;
  ip: string;
  latitude: number;
  longitude: number;
  org: string;
  postal_code: string;
  subdivision: string;
  subdivision2: string | null;
  time_zone: string;

  alpha2code: string;
  alpha3code: string;
};

// statistics

export type StatisticsResponseDeaths = {
  "1M_pop": string;
  new: number | null;
  total: number | null;
};

export type StatisticsResponseTests = {
  "1M_pop": string;
  total: number | null;
};

export type StatisticsResponseCases = {
  "1M_pop": string;
  active: number;
  critical: number;
  new: number | null;
  recovered: number | null;
  total: number | null;
};

export type StatisticsResponse = {
  cases: StatisticsResponseCases;
  continent: "Africa" | "North-America" | "Oceania" | "Europe" | "Asia" | "South-America" | "All" | null;
  country: string;
  day: string; // "2022-09-16"
  deaths: StatisticsResponseDeaths;
  population: number | null;
  tests: StatisticsResponseTests;
  time: Date; // "2022-09-16T20:45:06+00:00"

  alpha2code: string;
  alpha3code: string;
};

export type Statistics = {
  errors: Error[];
  get: string;
  parameters: unknown[];
  response: StatisticsResponse[];
  results: number;
};

// reports

export type ReportRegion = {
  iso: string;
  name: string;
  province: string;
  lat: string;
  long: string;
  cities: unknown[];

  alpha2code: string;
  alpha3code: string;
}

export type Report = {
  date: string | Date;
  region: ReportRegion;
  last_update: Date;
} & ReportNumberField;

export type ReportNumberField = {
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmed_diff: number;
  deaths_diff: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

export type ReportsResponse = {
  data: Report[];
};

// normalized

export type NormalizedCountry = {
  name: string;
  "code-3": string;
  "code-2": string;
};

export type NormalizedData = {
  name: string;
  id: string;
  alpha2code: string;
  alpha3code: string;
  country: NormalizedCountry;
  value: number | null;
  cases: StatisticsResponseCases;
  death: StatisticsResponseDeaths;
  tests: StatisticsResponseTests;
  population: number | null;
  time: Date;
};

export type NormalizedWithoutData = {
  name: string;
  id: string;
  alpha2code: null;
  alpha3code: null;
};
