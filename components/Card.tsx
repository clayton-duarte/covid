import React, { FunctionComponent } from "react";

import { CountryData, Data } from "../types";
import GraphLegend from "./GraphLegend";
import PercentBar from "./PercentBar";
import Divider from "./Divider";
import DataRow from "./DataRow";
import Paper from "./Paper";
import Title from "./Title";

interface CardProps extends Data {
  country?: CountryData["country"];
}

const Card: FunctionComponent<CardProps> = ({
  population,
  recovered,
  country,
  deaths,
  active,
  cases,
}) => {
  return (
    <Paper>
      <Title>{country || "World"}</Title>
      <Divider />
      <DataRow label="population" value={population} />
      <DataRow label="cases" value={cases} />
      <Divider />
      <GraphLegend label="active" value={active} total={cases} />
      <GraphLegend label="recovered" value={recovered} total={cases} />
      <GraphLegend label="deaths" value={deaths} total={cases} />
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
