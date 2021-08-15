import { takeLatest, call, put } from "redux-saga/effects";
import movies from '../mock.json';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  yield takeLatest("MOVIE_LIST_REQUEST", workerSaga);
}

// make api request and return a Promise
function fetchMovies() {
    return movies;
  // return axios({
  //   method: "get",
  //   url: "your nbc movies URL"
  // });

}


// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchMovies);
    // const movieResponse = response.data.message;

    // dispatch a success action to the store with the new dog
    yield put({ type: "GET_MOVIES_SUCCESS", response });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "GET_MOVIES_FAILURE", error });
  }
}

export default watcherSaga;