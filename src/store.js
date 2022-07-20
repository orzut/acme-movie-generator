import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const GENERATE_MOVIE = "GENERATE_MOVIE";
const FETCH_MOVIES = "FETCH_MOVIES";
const DELETE_MOVIE = "DELETE_MOVIE";
const INCREMENT_RATING = "INCREMENT_RATING";
const DECREMENT_RATING = "DECREMENT_RATING";

const _generateMovie = (movie) => {
  return {
    type: GENERATE_MOVIE,
    movie,
  };
};

const _fetchMovies = (movies) => {
  return {
    type: FETCH_MOVIES,
    movies,
  };
};

const _deleteMovie = (movie) => {
  return {
    type: DELETE_MOVIE,
    movie,
  };
};

const _incrementRating = (movie) => {
  return {
    type: INCREMENT_RATING,
    movie,
  };
};

const _decrementRating = (movie) => {
  return {
    type: DECREMENT_RATING,
    movie,
  };
};

const moviesReducer = (state = [], action) => {
  if (action.type === GENERATE_MOVIE) {
    return [...state, action.movie];
  }
  if (action.type === FETCH_MOVIES) {
    return action.movies;
  }
  if (action.type === DELETE_MOVIE) {
    return state.filter((movie) => movie.id !== action.movie.id);
  }
  if (action.type === INCREMENT_RATING) {
    return state.map((movie) =>
      movie.id === action.movie.id ? action.movie : movie
    );
  }
  if (action.type === DECREMENT_RATING) {
    return state.map((movie) =>
      movie.id === action.movie.id ? action.movie : movie
    );
  }
  return state;
};

export const generateMovie = (movie) => {
  return async (dispatch) => {
    const newMovie = (await axios.post("/api/movies", movie)).data;
    dispatch(_generateMovie(newMovie));
  };
};

export const fetchMovies = () => {
  return async (dispatch) => {
    const movies = (await axios.get("/api/movies")).data;
    dispatch(_fetchMovies(movies));
  };
};

export const deleteMovie = (movie) => {
  return async (dispatch) => {
    await axios.delete(`/api/movies/${movie.id}`);
    dispatch(_deleteMovie(movie));
  };
};

export const incrementRating = (movie) => {
  return async (dispatch) => {
    try {
      const updatedMovie = { ...movie, rating: movie.rating + 1 };
      const updated = (await axios.put(`/api/movies/${movie.id}`, updatedMovie))
        .data;
      dispatch(_incrementRating(updated));
    } catch (err) {
      console.log(err.response.data);
      alert("Rating should be between 1 and 5");
    }
  };
};

export const decrementRating = (movie) => {
  return async (dispatch) => {
    try {
      const updatedMovie = { ...movie, rating: movie.rating - 1 };
      const updated = (await axios.put(`/api/movies/${movie.id}`, updatedMovie))
        .data;
      dispatch(_decrementRating(updated));
    } catch (err) {
      console.log(err.response.data);
      alert("Rating should be between 1 and 5");
    }
  };
};

const reducer = combineReducers({ movies: moviesReducer });

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
