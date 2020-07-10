import styled from "styled-components";

import { Data } from "../types";

export enum LabelColor {
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
  box-shadow: inset 0 -0.25rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  height: 1rem;
  background: linear-gradient(
    90deg,
    ${LabelColor.active} 0% ${({ active, cases }) => (active / cases) * 100}%,
    ${LabelColor.recovered} ${({ active, cases }) => (active / cases) * 100}%
      ${({ recovered, active, cases }) => ((recovered + active) / cases) * 100}%,
    ${LabelColor.deaths}
      ${({ recovered, active, cases }) => ((recovered + active) / cases) * 100}%
      100%
  );
`;
