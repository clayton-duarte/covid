import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { formatPercent, formatNumber } from "../libs/formatters";
import { LabelColor } from "./PercentBar";

const StyledRow = styled.p`
  grid-template-columns: auto 1fr auto auto;
  justify-content: space-between;
  align-items: center;
  display: grid;
  gap: 0.5rem;
`;

const StyledCircle = styled.span<{ color: string }>`
  box-shadow: inset 0 -0.125rem 0 rgba(0, 0, 0, 0.2);
  background: ${(props) => props.color};
  border-radius: 0.5rem;
  height: 0.5rem;
  width: 0.5rem;
`;

const StyledLabel = styled.strong`
  text-transform: capitalize;
`;

const StyledValue = styled.span``;

const StyledPercent = styled.span`
  text-align: right;
  color: grey;
  width: 3ch;
`;

interface DataRowProps {
  label: string;
  value: number;
  total: number;
}

const DataRow: FunctionComponent<DataRowProps> = ({ label, value, total }) => {
  const percent = formatPercent(value, total);

  return (
    <StyledRow>
      <StyledCircle color={LabelColor[label]} />
      <StyledLabel>{label}:</StyledLabel>
      <StyledValue>{formatNumber(value)}</StyledValue>
      <StyledPercent>{percent}</StyledPercent>
    </StyledRow>
  );
};

export default DataRow;
