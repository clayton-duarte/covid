import React, { FunctionComponent } from "react";

import { CountryData, Data } from "../types";
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
      <DataRow label="cases" value={cases} />
      <DataRow label="active" value={active} />
      <DataRow label="recovered" value={recovered} />
      <DataRow label="deaths" value={deaths} />
    </Paper>
  );
};

export default Card;
