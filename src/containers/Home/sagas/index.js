import { call, put } from "redux-saga/effects";
import * as actionTypes from '../constants';
import movies from '../../../mock.json';

function fetchMovies() {
  return movies;
  // return axios({
  //   method: "get",
  //   url: "your nbc movies URL"
  // });
}

function* fetchMoviesSaga() {
  try {
    const response = yield call(fetchMovies);
    yield put({ type: actionTypes.GET_MOVIES_SUCCESS, response });

  } catch (error) {
    yield put({ type: actionTypes.GET_MOVIES_FAILURE, error });
  }
}

export default fetchMoviesSaga;