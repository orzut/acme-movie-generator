import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { faker } from "@faker-js/faker";
import { Provider, connect } from "react-redux";
import store, { generateMovie, fetchMovies } from "./store";
import Movies from "./Movies";

const root = createRoot(document.querySelector("#root"));

class _App extends Component {
  componentDidMount() {
    this.props.loadMovies();
  }
  render() {
    return (
      <main>
        <button onClick={() => this.props.generateMovie()}>
          Generate Random Movie
        </button>
        <Movies />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(fetchMovies()),
    generateMovie: () =>
      dispatch(generateMovie({ name: faker.commerce.productName() })),
  };
};

const App = connect(null, mapDispatchToProps)(_App);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
