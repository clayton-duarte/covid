import React, { FunctionComponent } from "react";

import { CountryData, Data } from "../types";
import PercentBar from "./PercentBar";
import DataRow from "./DataRow";
import Paper from "./Paper";
import Title from "./Title";

interface CardProps extends Data {
  country?: CountryData["country"];
}

const Card: FunctionComponent<CardProps> = ({
  recovered,
  country,
  deaths,
  active,
  cases,
}) => {
  return (
    <Paper>
      <Title>{country || "World"}</Title>
      <DataRow label="cases" value={cases} total={cases} />
      <DataRow label="active" value={active} total={cases} />
      <DataRow label="recovered" value={recovered} total={cases} />
      <DataRow label="deaths" value={deaths} total={cases} />
      <PercentBar
        recovered={recovered}
        active={active}
        deaths={deaths}
        cases={cases}
      />
    </Paper>
  );
};

export default Card;
