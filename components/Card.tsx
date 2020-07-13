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

interface CardProps {
  countries: CountryData[];
  country: CountryData;
}

const Card: FunctionComponent<CardProps> = ({ countries, country }) => {
  const stats = ["active", "recovered", "deaths"];
  const router = useRouter();

  const handleClickRemove = () => {
    const filteredCountries = countries
      .map((a) => a.country.toLowerCase())
      .filter((path) => path !== country.country.toLowerCase());
    console.log(filteredCountries);
    router.push(`/${arrayToPath(filteredCountries)}`);
  };

  return (
    <Paper>
      <StyledIcon role="button" onClick={handleClickRemove} />
      <Link
        as={`/${country.country.toLowerCase()}`}
        href="/[...countries]"
        passHref
      >
        <StyledAnchor href="#">
          <Title>{country.country}</Title>
        </StyledAnchor>
      </Link>
      <Divider />
      <DataRow label="population" value={country.population} />
      <DataRow label="cases" value={country.cases} />
      <Divider />
      {stats.map((stat, index) => (
        <GraphLegend
          value={country[stat]}
          total={country.cases}
          key={stat + index}
          index={index}
          label={stat}
        />
      ))}
      <PercentBar dataList={stats.map((stat) => country[stat])} />
    </Paper>
  );
};

export default Card;
