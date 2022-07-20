import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import store, { fetchMovies } from "./store";
import Movies from "./components/Movies";
import Home from "./components/Home";
import { Route, HashRouter as Router } from "react-router-dom";

const root = createRoot(document.querySelector("#root"));

class _App extends Component {
  componentDidMount() {
    this.props.loadMovies();
  }
  render() {
    return (
      <main>
        <Route path="/" component={Home} />
        <Movies />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: () => dispatch(fetchMovies()),
  };
};

const App = connect(null, mapDispatchToProps)(_App);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
