import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { CountryData } from "../types";
import GraphLegend from "./GraphLegend";
import PercentBar from "./PercentBar";
import Paper from "./Paper";
import Title from "./Title";

const SubTitle = styled(Title)`
  font-size: 1rem;
`;

export type DataToCompare = keyof CountryData;

interface CompareProps {
  dataLabel: DataToCompare;
  countries: CountryData[];
}

const Compare: FunctionComponent<CompareProps> = ({ dataLabel, countries }) => {
  const mapLabels: Partial<{ [key in DataToCompare]: string }> = {
    criticalPerOneMillion: "critical cases / million",
    recoveredPerOneMillion: "recovered / million",
    activePerOneMillion: "active cases / million",
    deathsPerOneMillion: "deaths / million",
    casesPerOneMillion: "cases / million",
    testsPerOneMillion: "tests / million",
  };

  const dataList = countries.map((country) => Number(country[dataLabel]));
  const total = dataList.reduce((a, b) => a + b, 0);

  return (
    <Paper>
      <SubTitle>{mapLabels[dataLabel]}</SubTitle>
      {countries.map((country, index) => (
        <GraphLegend
          value={Number(country[dataLabel])}
          key={country.country + index}
          label={country.country}
          total={total}
          index={index}
        />
      ))}
      <PercentBar dataList={dataList} />
    </Paper>
  );
};

export default Compare;
