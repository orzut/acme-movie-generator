import React from "react";
import { connect } from "react-redux";
import { deleteMovie, incrementRating, decrementRating } from "./store";

const Movies = ({ movies, deleteMovie, increment, decrement }) => {
  const averageRating = (
    movies.reduce((sum, movie) => {
      return sum + movie.rating;
    }, 0) / movies.length
  ).toFixed(1);
  console.log(averageRating);
  return (
    <div>
      <h2>The average rating is {averageRating}</h2>
      <ul>
        {movies.map((movie) => {
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
  return {
    movies,
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
