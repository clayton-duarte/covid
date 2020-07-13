import React, { FunctionComponent } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import { arrayToPath } from "../libs/formatters";
import { CountryData, Data } from "../types";
import GraphLegend from "./GraphLegend";
import PercentBar from "./PercentBar";
import Divider from "./Divider";
import DataRow from "./DataRow";
import Paper from "./Paper";
import Title from "./Title";

const StyledAnchor = styled.a`
  color: ${(props) => props.theme.primary};
`;

const StyledIcon = styled(FiMinusCircle)`
  position: absolute;
  color: ${(props) => props.theme.primary};
  font-size: 1.5rem;
  cursor: pointer;
  left: 1rem;
  top: 1rem;
`;

interface CardProps extends Data {
  country: CountryData["country"];
}

const Card: FunctionComponent<CardProps> = ({
  population,
  country,
  ...props
}) => {
  const stats = ["active", "recovered", "deaths"];
  const router = useRouter();

  const handleClickRemove = () => {
    const countries = router.query.countries as string[];
    const filteredCountries = countries.filter(
      (path) => path !== country.toLowerCase()
    );
    router.push(`/${arrayToPath(filteredCountries)}`);
  };

  return (
    <Paper>
      <StyledIcon role="button" onClick={handleClickRemove} />
      <Link href="/[...countries]" as={`/${country.toLowerCase()}`} passHref>
        <StyledAnchor href="#">
          <Title>{country}</Title>
        </StyledAnchor>
      </Link>
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
  );
};

export default Card;
