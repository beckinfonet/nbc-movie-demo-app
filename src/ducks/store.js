import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

/* ---------- Configuration ----------- */ 
const middleware = [];
const enhancers = [];

/* ---------- create saga middleware ----------- */ 
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

/* ---------- assemble middleware ----------- */ 
enhancers.push(applyMiddleware(...middleware));

/* ---------- create store dev -------------- */ 
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
console.log('STORE: ', store.getState());

/* ---------- kick off root saga ----------- */ 
sagaMiddleware.run(rootSaga);

export default store;