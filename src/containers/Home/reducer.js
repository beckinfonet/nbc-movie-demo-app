import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getMovies: ['data'],
  getMoviesSuccess: ['data'],
  getMoviesFailure: null
});

export const campaignTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  getMovies: null,
  fetching: null,
  error: null
});

const getMovies = state => ({
  ...state,
})

const getMoviesSuccess = (state, action) => ({
  ...state,
})

const getMoviesFailure = (state, action) => ({
  ...state,
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MOVIES]: getMovies,
  [Types.GET_MOVIES_SUCCESS]: getMoviesSuccess,
  [Types.GET_MOVIES_FAILURE]: getMoviesFailure,
})