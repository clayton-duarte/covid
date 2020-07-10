import styled from "styled-components";

import { Data } from "../types";

export enum LabelColor {
  cases = "transparent",
  recovered = "silver",
  deaths = "tomato",
  active = "gray",
}

interface PercentBarProps {
  recovered: Data["recovered"];
  active: Data["active"];
  deaths: Data["deaths"];
  cases: Data["cases"];
}

export default styled.div<PercentBarProps>`
  background: linear-gradient(
    90deg,
    ${LabelColor.active} 0% ${({ active, cases }) => (active / cases) * 100}%,
    ${LabelColor.recovered} ${({ active, cases }) => (active / cases) * 100}%
      ${({ recovered, active, cases }) => ((recovered + active) / cases) * 100}%,
    ${LabelColor.deaths}
      ${({ recovered, active, cases }) => ((recovered + active) / cases) * 100}%
      100%
  );
  border-radius: 1rem;
  height: 1rem;
`;
