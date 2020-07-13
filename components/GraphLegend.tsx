import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { formatPercent, formatNumber } from "../libs/formatters";

const StyledRow = styled.p`
  grid-template-columns: auto 1fr auto auto;
  justify-content: space-between;
  align-items: center;
  display: grid;
  gap: 0.5rem;
`;

const StyledCircle = styled.span<{ index: number }>`
  background: rgba(0, 0, 0, ${(props) => (props.index + 1) / 10});
  box-shadow: ${(props) => props.theme.shadow2};
  border-radius: 0.5rem;
  height: 0.5rem;
  width: 0.5rem;
`;

const StyledLabel = styled.strong`
  text-transform: capitalize;
`;

const StyledValue = styled.span``;

const StyledPercent = styled.span`
  color: ${(props) => props.theme.secondary};
  text-align: right;
  width: 3ch;
`;

interface DataRowProps {
  value?: number;
  total?: number;
  label: string;
  index: number;
}

const DataRow: FunctionComponent<DataRowProps> = ({
  label,
  value,
  total,
  index,
}) => {
  return (
    <StyledRow>
      <StyledCircle index={index} />
      <StyledLabel>{label}</StyledLabel>
      {value && <StyledValue>{formatNumber(value)}</StyledValue>}
      {value && total && (
        <StyledPercent>{formatPercent(value, total)}</StyledPercent>
      )}
    </StyledRow>
  );
};

export default DataRow;
