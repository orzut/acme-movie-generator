import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { faker } from "@faker-js/faker";
import { Provider, connect } from "react-redux";
import store, { generateMovie, fetchMovies, deleteMovie } from "./store";

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
        <ul>
          {this.props.movies.map((movie) => {
            return (
              <li key={movie.id}>
                <button onClick={() => this.props.deleteMovie(movie)}>x</button>
                {movie.name}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(fetchMovies()),
    generateMovie: () =>
      dispatch(generateMovie({ name: faker.commerce.productName() })),
    deleteMovie: (movie) => dispatch(deleteMovie(movie)),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
