import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { formatNumber } from "../libs/formatters";

const StyledRow = styled.p`
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  display: grid;
  gap: 0.5rem;
`;

const StyledLabel = styled.strong`
  text-transform: capitalize;
`;

const StyledValue = styled.span``;

interface DataRowProps {
  label: string;
  value: number;
}

const DataRow: FunctionComponent<DataRowProps> = ({ label, value }) => {
  return (
    <StyledRow>
      <StyledLabel>{label}:</StyledLabel>
      <StyledValue>{formatNumber(value)}</StyledValue>
    </StyledRow>
  );
};

export default DataRow;
