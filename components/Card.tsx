import React, { FunctionComponent } from "react";
import Link from "next/link";

import { CountryData, Data } from "../types";
import GraphLegend from "./GraphLegend";
import PercentBar from "./PercentBar";
import Divider from "./Divider";
import DataRow from "./DataRow";
import Paper from "./Paper";
import Title from "./Title";

interface CardProps extends Data {
  country: CountryData["country"];
}

const Card: FunctionComponent<CardProps> = ({
  population,
  country,
  ...props
}) => {
  const stats = ["active", "recovered", "deaths"];

  return (
    <Link href="/[countries]" as={`/${country}`}>
      <Paper>
        <Title>{country}</Title>
        <Divider />
        <DataRow label="population" value={population} />
        <DataRow label="cases" value={props.cases} />
        <Divider />
        {stats.map((stat, index) => (
          <GraphLegend
            value={props[stat]}
            total={props.cases}
            key={stat + index}
            index={index}
            label={stat}
          />
        ))}
        <PercentBar dataList={stats.map((stat) => props[stat])} />
      </Paper>
    </Link>
  );
};

export default Card;
