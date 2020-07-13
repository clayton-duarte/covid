import Router from "next/router";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return null;
};

HomePage.getInitialProps = async ({ req, res }) => {
  if (req) {
    // is on server
    res.writeHead(302, { location: "/brazil" });
    res.end();
  } else {
    // is on client
    Router.push("/brazil");
  }
};

export default HomePage;
