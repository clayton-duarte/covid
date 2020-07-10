import React, { FunctionComponent } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";

const theme = {
  primary: "tomato",
};

const GlobalStyle = createGlobalStyle`
body, html, #__next {
  font-family: monospace;
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

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
