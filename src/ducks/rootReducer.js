import { combineReducers } from 'redux';
import { reducer as movieHomeReducer } from '../containers/Home/reducer';

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

const appReducer = combineReducers({
  movieHomeReducer,
})

export default rootReducer; 