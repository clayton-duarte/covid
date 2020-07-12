import React, { FunctionComponent } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";

const colors = {
  primary: "tomato",
  secondary: "grey",
  tertiary: "silver",
  text: "black",
  bg: "white",
};

const shapes = {
  shadow1: "0 0 1rem rgba(0, 0, 0, 0.2)",
  shadow2: "inset 0 -0.25rem 0 rgba(0, 0, 0, 0.2)",
  border: `1px solid ${colors.tertiary}`,
  radius: "1rem",
};

const theme = {
  ...colors,
  ...shapes,
};

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
body, html, #__next {
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  font-family: 'Baloo 2', sans-serif;
  align-content: start;
  font-size: 16px;
  display: grid;
  height: 100%;
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
