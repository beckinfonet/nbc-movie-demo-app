import * as actionTypes from './constants/';

export function addNewMovie(data) {
  return {
    type: actionTypes.ADD_NEW_MOVIE,
    payload: data
  }
}