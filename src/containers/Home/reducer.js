import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getMovies: ['data'],
  getMoviesSuccess: ['data'],
  getMoviesFailure: null,
});

export const campaignTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  moviesList: null,
  fetching: null,
  error: null,
  errorDetails: []
});

const getMovies = state => ({
  ...state,
  fetching: true,
  error: false
})

const getMoviesSuccess = (state, action) => {
  return {
    ...state,
    fetching: false,
    error: false,
    moviesList: action.response.items
  }
}

const getMoviesFailure = (state, action) => ({
  ...state,
  fetching: false,
  error: true,
  errorDetails: action,
  moviesList: []
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MOVIES]: getMovies,
  [Types.GET_MOVIES_SUCCESS]: getMoviesSuccess,
  [Types.GET_MOVIES_FAILURE]: getMoviesFailure,
})