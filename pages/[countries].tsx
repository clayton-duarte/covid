import React from "react";
import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";

import { formatDate } from "../libs/formatters";
import { CountryData } from "../types";
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
  countries: CountryData[];
}

const CountriesPage: NextPage<PageProps> = ({ countries }) => {
  return (
    <>
      <Head>
        <title>C0VID19 - {formatDate()}</title>
      </Head>
      <Template>
        {countries.slice(0, 3).map((country) => (
          <Card {...country} />
        ))}
      </Template>
    </>
  );
};

CountriesPage.getInitialProps = async (ctx) => {
  const { data } = await api.get<CountryData | CountryData[]>(
    `/countries/${ctx.query.countries}`
  );

  return {
    countries: Array.isArray(data) ? data : Array(data),
  };
};

export default CountriesPage;
