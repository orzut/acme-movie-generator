import React, { Fragment } from "react";
import { connect } from "react-redux";
import { generateMovie } from "../store";
import { faker } from "@faker-js/faker";

const Home = ({ generateMovie }) => {
  return <button onClick={() => generateMovie()}>Generate Random Movie</button>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateMovie: () =>
      dispatch(generateMovie({ name: faker.commerce.productName() })),
  };
};

export default connect(null, mapDispatchToProps)(Home);
