import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { all } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import rootReducer from '../reducers/rootReducer';
import sagas from '../sagas/index';


let persistedState = {};

if (window.localStorage.getItem('reduxState')) {
  persistedState = JSON.parse(window.localStorage.getItem('reduxState'));

  delete persistedState.api;
  delete persistedState.appConfig;
  delete persistedState.config;
}


const sagaMiddleware = createSagaMiddleware();

const appliedMiddleware = process.env.NODE_ENV === 'development' ?
  applyMiddleware(sagaMiddleware, logger) : applyMiddleware(sagaMiddleware);

const store = createStore(
  rootReducer,
  persistedState,
  appliedMiddleware,
);

function* sagaWatchers() {
  yield all([
    sagas,
  ]);
}

store.subscribe(() => {
  const state = store.getState();
  // Make a clone, don't accidentally mutate the store
  const stateCopy = cloneDeep(state);
  // Make sure to never persist Workflow navigation or UI state
  window.localStorage.setItem('reduxState', JSON.stringify(stateCopy));
});

sagaMiddleware.run(sagaWatchers);

export default store;

