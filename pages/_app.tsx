import React, { FunctionComponent } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";

const theme = {
  primary: "tomato",
};

const GlobalStyle = createGlobalStyle`
body, html, #__next {
  font-family: 'Baloo 2', sans-serif;
  align-content: start;
  background: white;
  font-size: 16px;
  display: grid;
  height: 100%;
  color: black;
  margin: 0;
}

p, h1, h2, h3, h4, h5, h6 {
  line-height: 1;
  margin: 0;
}
`;

const Template = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Template>
        <Component {...pageProps} />
      </Template>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
