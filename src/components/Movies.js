import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteMovie, incrementRating, decrementRating } from "../store";

const Movies = ({
  movies,
  deleteMovie,
  increment,
  decrement,
  averageRating,
  rankedMovies,
}) => {
  return (
    <div>
      <h2>The average rating is {!movies.length ? 0 : averageRating}</h2>
      <ul>
        {rankedMovies.map((movie) => {
          return (
            <li key={movie.id}>
              <button onClick={() => deleteMovie(movie)}>x</button>
              {movie.name} ({movie.rating})
              <button onClick={() => increment(movie)}>+</button>
              <button onClick={() => decrement(movie)}>-</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ movies }) => {
  const rankedMovies = movies.sort((a, b) => b.rating - a.rating);
  const averageRating = (
    movies.reduce((sum, movie) => {
      return sum + movie.rating;
    }, 0) / movies.length
  ).toFixed(1);
  return {
    movies,
    averageRating,
    rankedMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovie: (movie) => dispatch(deleteMovie(movie)),
    increment: (movie) => dispatch(incrementRating(movie)),
    decrement: (movie) => dispatch(decrementRating(movie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
