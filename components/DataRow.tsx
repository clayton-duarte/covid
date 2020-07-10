import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledRow = styled.p`
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  display: grid;
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
      <StyledValue>
        {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </StyledValue>
    </StyledRow>
  );
};

export default DataRow;
