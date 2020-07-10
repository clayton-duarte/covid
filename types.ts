export interface Data {
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  activePerOneMillion: number;
  deathsPerOneMillion: number;
  testsPerOneMillion: number;
  casesPerOneMillion: number;
  oneDeathPerPeople: number;
  oneCasePerPeople: number;
  oneTestPerPeople: number;
  todayRecovered: number;
  todayDeaths: number;
  todayCases: number;
  population: number;
  recovered: number;
  critical: number;
  updated: number;
  active: number;
  deaths: number;
  tests: number;
  cases: number;
}

export interface WorldData extends Data {
  affectedCountries: number;
}

export interface Country {
  flag: string;
  iso2: string;
  iso3: string;
  long: number;
  lat: number;
  _id: number;
}

export interface CountryData extends Data {
  countryInfo: Country;
  continent: string;
  country: string;
}
