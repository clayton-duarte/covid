import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";

import { WorldData, CountryData } from "../types";
import { formatDate } from "../libs/formatters";
import Compare from "../components/Compare";
import Card from "../components/Card";
import api from "../libs/api";

const Template = styled.main`
  grid-template-columns: 1fr;
  display: grid;
  gap: 1rem;
  @media (min-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface PageProps {
  brazil: CountryData;
  canada: CountryData;
  world: WorldData;
}

const HomePage: NextPage<PageProps> = ({ world, brazil, canada }) => {
  return (
    <>
      <Head>
        <title>C0VID19 - {formatDate()}</title>
      </Head>
      <Template>
        <Card {...world}></Card>
        <Card {...brazil}></Card>
        <Card {...canada}></Card>
        <Compare
          dataLabel="casesPerOneMillion"
          country1={brazil}
          country2={canada}
        />
        <Compare
          dataLabel="activePerOneMillion"
          country1={brazil}
          country2={canada}
        />
        <Compare
          dataLabel="deathsPerOneMillion"
          country1={brazil}
          country2={canada}
        />
        <Compare
          dataLabel="testsPerOneMillion"
          country1={brazil}
          country2={canada}
        />
        <Compare
          dataLabel="criticalPerOneMillion"
          country1={brazil}
          country2={canada}
        />
        <Compare
          dataLabel="recoveredPerOneMillion"
          country1={brazil}
          country2={canada}
        />
      </Template>
    </>
  );
};

HomePage.getInitialProps = async () => {
  const brazil = api.get<CountryData>("/countries/brazil");
  const canada = api.get<CountryData>("/countries/canada");
  const world = api.get<WorldData>("/all");

  return {
    brazil: (await brazil).data,
    canada: (await canada).data,
    world: (await world).data,
  };
};

export default HomePage;
