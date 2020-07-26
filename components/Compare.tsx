import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { CountryData } from "../types";
import PercentBar from "./PercentBar";
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
    criticalPerOneMillion: "critical cases per million",
    recoveredPerOneMillion: "recovered per million",
    activePerOneMillion: "active cases per million",
    deathsPerOneMillion: "deaths per million",
    casesPerOneMillion: "cases per million",
    testsPerOneMillion: "tests per million",
  };

  const dataList = countries.map((country) => Number(country[dataLabel]));

  return (
    <>
      <SubTitle>{mapLabels[dataLabel]}</SubTitle>
      <PercentBar dataList={dataList} />
    </>
  );
};

export default Compare;
