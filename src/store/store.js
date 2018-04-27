import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './../reducers';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))