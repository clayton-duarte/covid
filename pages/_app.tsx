import React, { FunctionComponent } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { PageTransition } from "next-page-transitions";
import { AppProps } from "next/app";
import Head from "next/head";

const graphColors = ["#136f63", "#ffba08", "#d00000", "#437f97", "#032b43"];

const colors = {
  primary: graphColors[4],
  secondary: graphColors[3],
  tertiary: graphColors[3],
  text: graphColors[4],
  bg: "#ffffff",
};

const shapes = {
  shadow1: "0 0 1rem rgba(0, 0, 0, 0.1)",
  shadow2: "inset 0 -0.25rem 0 rgba(0, 0, 0, 0.1)",
  border: `1px solid ${colors.tertiary}`,
  radius: "1rem",
};

const theme = {
  graphColors,
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
  * {
    box-sizing: border-box;
  }
}

p, h1, h2, h3, h4, h5, h6 {
  line-height: 1;
  margin: 0;
}

.page-transition-enter {
  position: relative;
  opacity: 0;
}

.page-transition-enter-active {
  transition: 0.2s ease;
  position: relative;
  opacity: 1;
}

.page-transition-exit {
  position: relative;
  opacity: 1;
}

.page-transition-exit-active {
  transition: 0.2s ease;
  position: relative;
  opacity: 0;
}
`;

const Template = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const countryList = router.query.countries as string[];

  return (
    <ThemeProvider theme={theme}>
      <PageTransition timeout={200} classNames="page-transition">
        <Template>
          <Head>
            <title>COVID19 - {countryList.join(" X ")}</title>
          </Head>
          <Component {...pageProps} key={router.route} />
        </Template>
      </PageTransition>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
