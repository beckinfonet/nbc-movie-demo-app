import { takeLatest } from "redux-saga/effects";
import fetchMoviesSaga from '../containers/Home/sagas';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
  yield takeLatest("MOVIE_LIST_REQUEST", fetchMoviesSaga);
}

export default watcherSaga;