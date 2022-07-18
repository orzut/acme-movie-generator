import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const GENERATE_MOVIE = "GENERATE_MOVIE";
const FETCH_MOVIES = "FETCH_MOVIES";
const DELETE_MOVIE = "DELETE_MOVIE";

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
  return state;
};

const reducer = combineReducers({ movies: moviesReducer });

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
