import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './../reducers';
import promiseMiddleware from 'redux-promise';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, compose(applyMiddleware(promiseMiddleware),reduxDevTools))