import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { LabelColor } from "./PercentBar";

const StyledRow = styled.p`
  grid-template-columns: auto 1fr auto auto;
  justify-content: space-between;
  align-items: center;
  display: grid;
  gap: 0.5rem;
`;

const StyledCircle = styled.span<{ color: string }>`
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
  color: grey;
  width: 4ch;
`;

interface DataRowProps {
  label: string;
  value: number;
  total: number;
}

const DataRow: FunctionComponent<DataRowProps> = ({ label, value, total }) => {
  const percent = ((value / total) * 100).toFixed(0);

  return (
    <StyledRow>
      <StyledCircle color={LabelColor[label]} />
      <StyledLabel>{label}:</StyledLabel>
      <StyledValue>
        {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledValue>
      <StyledPercent>{percent}%</StyledPercent>
    </StyledRow>
  );
};

export default DataRow;
