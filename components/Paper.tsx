import styled from "styled-components";

export default styled.section`
  border-radius: ${(props) => props.theme.radius};
  box-shadow: ${(props) => props.theme.shadow1};
  position: relative;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;
