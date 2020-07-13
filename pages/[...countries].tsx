import React, {
  ChangeEvent,
  FocusEvent,
  useState,
  FormEvent,
  useEffect,
} from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NextPage } from "next";

import GraphLegend from "../components/GraphLegend";
import { arrayToPath } from "../libs/formatters";
import Compare from "../components/Compare";
import Title from "../components/Title";
import Paper from "../components/Paper";
import { CountryData } from "../types";
import Card from "../components/Card";
import api from "../libs/api";

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

const ComparisonArea = styled(Paper)`
  grid-area: comparison;
  display: grid;
  gap: 1rem;
`;

const StyledIcon = styled(FiPlusCircle)<{ hidden: boolean }>`
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  color: ${(props) => props.theme.tertiary};
  left: calc(50% - 2.5rem);
  top: calc(50% - 2.5rem);
  pointer-events: none;
  position: absolute;
  font-size: 5rem;
`;

const AddCard = styled(Paper)`
  min-height: 10rem;
  height: 100%;
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

  const correctPath = `/${arrayToPath(
    countries.map(({ country }) => country)
  )}/${newCountry}`;

  useEffect(() => {
    window.history.replaceState({}, "", correctPath);
  }, []);

  const pushNewCountry = () => {
    router.push(correctPath);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsAdding(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsAdding(false);
    if (newCountry.length > 2) pushNewCountry();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCountry(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pushNewCountry();
  };

  return (
    <PageTemplate>
      <CardArea>
        {countries.map((country, index) => (
          <Card
            key={country.countryInfo._id + index}
            countries={countries}
            country={country}
          />
        ))}
        <form onSubmit={handleSubmit}>
          <AddCard>
            <StyledIcon hidden={isAdding} />
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
      {countries.length > 1 && (
        <ComparisonArea>
          <Title>Comparing</Title>
          {countries.map((country, index) => (
            <GraphLegend
              key={country.country + index}
              label={country.country}
              index={index}
            />
          ))}
          <Compare dataLabel="casesPerOneMillion" countries={countries} />
          <Compare dataLabel="activePerOneMillion" countries={countries} />
          <Compare dataLabel="deathsPerOneMillion" countries={countries} />
          <Compare dataLabel="testsPerOneMillion" countries={countries} />
          <Compare dataLabel="criticalPerOneMillion" countries={countries} />
          <Compare dataLabel="recoveredPerOneMillion" countries={countries} />
        </ComparisonArea>
      )}
    </PageTemplate>
  );
};

CountriesPage.getInitialProps = async (ctx) => {
  const countries = ctx.query?.countries as string[];
  const path = `/countries/${countries.join(",")}`;
  const { data } = await api.get<CountryData | CountryData[]>(path);

  return {
    countries: Array.isArray(data) ? data : Array(data),
  };
};

export default CountriesPage;
