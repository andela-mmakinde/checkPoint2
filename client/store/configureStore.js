/* eslint no-underscore-dangle: 0 */ /* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = initialState =>
createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  );

export default configureStore;
