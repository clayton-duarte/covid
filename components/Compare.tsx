import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { roundNumber, formatPercent } from "../libs/formatters";
import { CountryData } from "../types";
import Divider from "./Divider";
import Paper from "./Paper";
import Title from "./Title";

const StyledRow = styled.p`
  grid-template-columns: 1fr auto auto;
  display: grid;
  gap: 0.5rem;
`;

const StyledValue = styled.span``;

const GraphPar = styled.div<{ value1: number; value2: number }>`
  border-radius: ${(props) => props.theme.radius};
  box-shadow: ${(props) => props.theme.shadow2};
  color: ${(props) => props.theme.bg};
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 0.25rem 1rem;
  display: grid;
  gap: 0.5rem;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.secondary} 0%
      ${({ value1, value2 }) => formatPercent(value1, value1 + value2)},
    ${(props) => props.theme.primary}
      ${({ value1, value2 }) => formatPercent(value1, value1 + value2)} 100%
  );
`;

export type DataToCompare = keyof CountryData;

interface CompareProps {
  dataLabel: DataToCompare;
  country1: CountryData;
  country2: CountryData;
}

const Compare: FunctionComponent<CompareProps> = ({
  dataLabel,
  country1,
  country2,
}) => {
  const mapLabels: Partial<{ [key in DataToCompare]: string }> = {
    criticalPerOneMillion: "critical cases / million",
    recoveredPerOneMillion: "recovered / million",
    activePerOneMillion: "active cases / million",
    deathsPerOneMillion: "deaths / million",
    casesPerOneMillion: "cases / million",
    testsPerOneMillion: "tests / million",
  };

  const value1 = Number(country1[dataLabel]);
  const formattedValue1 = roundNumber(value1);
  const value2 = Number(country2[dataLabel]);
  const formattedValue2 = roundNumber(value2);

  return (
    <Paper>
      <Title>{mapLabels[dataLabel]}</Title>
      <Divider />
      <StyledRow>
        <StyledValue>{country1.country}</StyledValue>
        <StyledValue>{country2.country}</StyledValue>
      </StyledRow>
      <GraphPar value1={value1} value2={value2}>
        <StyledValue>{formattedValue1}</StyledValue>
        <StyledValue>{formattedValue2}</StyledValue>
      </GraphPar>
    </Paper>
  );
};

export default Compare;
