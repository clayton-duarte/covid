import styled from "styled-components";

interface PercentBarProps {
  dataList: number[];
  theme: any;
}

const createGradient = ({ dataList, theme }: PercentBarProps): string => {
  return dataList
    .map((data) => (data / dataList.reduce((a, b) => a + b, 0)) * 100)
    .map((data, index, arr) => {
      const subTotal = arr.slice(0, index).reduce((a, b) => a + b, 0);
      return `${subTotal}% ${subTotal + data}%`;
    })
    .map((data, index) => {
      return `${theme.graphColors[index]} ${data}`;
    })
    .join(",");
};

export default styled.div<PercentBarProps>`
  background: linear-gradient(90deg, ${(props) => createGradient(props)});
  border-radius: ${(props) => props.theme.radius};
  box-shadow: ${(props) => props.theme.shadow2};
  color: ${(props) => props.theme.bg};
  grid-template-columns: auto auto;
  justify-content: space-between;
  display: grid;
  height: 1rem;
  gap: 0.5rem;
`;
