import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Table from "../components/Table";
import Symbols from "../components/Symbols";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Symbols/>
      {/* <Table /> */}
    </div>
  );
};

export default HomePage;
