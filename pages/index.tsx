import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";
import Axios from "axios";

import { WorldData, CountryData } from "../types";
import Title from "../components/Title";
import Card from "../components/Card";

const Template = styled.main`
  grid-template-columns: 1fr;
  display: grid;
  gap: 1rem;
  @media (min-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface PageProps {
  brazil: CountryData;
  canada: CountryData;
  world: WorldData;
}

const Home: NextPage<PageProps> = ({ world, brazil, canada }) => {
  const today = new Date().toJSON().slice(0, 10).split("-").join("/");

  return (
    <>
      <Head>
        <title>C0VID19 - {today}</title>
      </Head>
      <Title>C0VID19 - {today}</Title>
      <Template>
        <Card {...world}></Card>
        <Card {...brazil}></Card>
        <Card {...canada}></Card>
      </Template>
    </>
  );
};

Home.getInitialProps = async () => {
  const baseUrl = "https://corona.lmao.ninja/v2";

  const brazil = Axios.get<CountryData>(`${baseUrl}/countries/brazil`);
  const canada = Axios.get<CountryData>(`${baseUrl}/countries/canada`);
  const world = Axios.get<WorldData>(`${baseUrl}/all`);

  return {
    brazil: (await brazil).data,
    canada: (await canada).data,
    world: (await world).data,
  };
};

export default Home;
