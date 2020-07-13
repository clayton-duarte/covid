import React, { ChangeEvent, FocusEvent, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";

import { formatDate } from "../libs/formatters";
import { CountryData } from "../types";
import Compare from "./Compare";
import api from "../libs/api";
import Paper from "./Paper";
import Card from "./Card";

const PageTemplate = styled.main`
  grid-template-areas: "cards comparison";
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  align-items: start;
  display: grid;
  gap: 1rem;
  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 425px) {
    grid-template-areas: "cards" "comparison";
    grid-template-columns: 1fr;
  }
`;

const CardArea = styled.article`
  grid-template-columns: repeat(3, 1fr);
  grid-area: cards;
  display: grid;
  gap: 1rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonArea = styled.aside`
  grid-area: comparison;
  display: grid;
  gap: 1rem;
`;

const AddCard = styled(Paper)<{ isAdding: boolean }>`
  position: relative;
  min-height: 10rem;
  height: 100%;
  &:before {
    opacity: ${(props) => (props.isAdding ? 0 : 1)};
    border-radius: ${(props) => props.theme.radius};
    background: ${(props) => props.theme.tertiary};
    color: ${(props) => props.theme.tertiary};
    left: calc(50% - 2.5rem);
    top: calc(50% - 0.25rem);
    pointer-events: none;
    position: absolute;
    height: 0.5rem;
    content: "";
    width: 5rem;
    z-index: 9;
  }
  &:after {
    opacity: ${(props) => (props.isAdding ? 0 : 1)};
    border-radius: ${(props) => props.theme.radius};
    background: ${(props) => props.theme.tertiary};
    color: ${(props) => props.theme.tertiary};
    left: calc(50% - 0.25rem);
    top: calc(50% - 2.5rem);
    pointer-events: none;
    position: absolute;
    width: 0.5rem;
    height: 5rem;
    content: "";
  }
`;

const StyledInput = styled.input<{ isAdding: boolean }>`
  opacity: ${(props) => (props.isAdding ? 1 : 0)};
  text-align: center;
  font-size: 1rem;
  border: none;
  :focus {
    outline: none;
  }
`;

interface PageProps {
  countries: CountryData[];
}

const CountriesPage: NextPage<PageProps> = ({ countries }) => {
  const [newCountry, setNewCountry] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const router = useRouter();

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsAdding(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsAdding(false);
    if (newCountry.length > 2) {
      router.push(`/${router.query.countries},${newCountry}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCountry(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${router.query.countries},${newCountry}`);
  };

  return (
    <>
      <Head>
        <title>C0VID19 - {formatDate()}</title>
      </Head>
      <PageTemplate>
        <CardArea>
          {countries.map((country, index) => (
            <Card key={country.countryInfo._id + index} {...country} />
          ))}
          <form onSubmit={handleSubmit}>
            <AddCard isAdding={isAdding}>
              <StyledInput
                onChange={handleChange}
                onFocus={handleFocus}
                isAdding={isAdding}
                onBlur={handleBlur}
                value={newCountry}
              />
            </AddCard>
          </form>
        </CardArea>
        <ComparisonArea>
          {countries.length && countries.length < 10 ? (
            <>
              <Compare dataLabel="casesPerOneMillion" countries={countries} />
              <Compare dataLabel="activePerOneMillion" countries={countries} />
              <Compare dataLabel="deathsPerOneMillion" countries={countries} />
              <Compare dataLabel="testsPerOneMillion" countries={countries} />
              <Compare
                dataLabel="criticalPerOneMillion"
                countries={countries}
              />
              <Compare
                dataLabel="recoveredPerOneMillion"
                countries={countries}
              />
            </>
          ) : (
            <p>Please click at a country to start comparison mode </p>
          )}
        </ComparisonArea>
      </PageTemplate>
    </>
  );
};

CountriesPage.getInitialProps = async (ctx) => {
  const { data } = await api.get<CountryData | CountryData[]>(
    `/countries/${ctx.query?.countries || ""}`
  );

  return {
    countries: Array.isArray(data) ? data : Array(data),
  };
};

export default CountriesPage;
