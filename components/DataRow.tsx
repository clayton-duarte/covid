import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { LabelColor } from "./PercentBar";

const StyledRow = styled.p`
  grid-template-columns: auto 1fr auto;
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

interface DataRowProps {
  label: string;
  value: number;
}

const DataRow: FunctionComponent<DataRowProps> = ({ label, value }) => {
  return (
    <StyledRow>
      <StyledCircle color={LabelColor[label]} />
      <StyledLabel>{label}:</StyledLabel>
      <StyledValue>
        {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledValue>
    </StyledRow>
  );
};

export default DataRow;
