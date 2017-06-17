import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Routes from './Routes';


const root = document.getElementById('root');
const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render(<Provider store={store}>
  <Routes />
</Provider>, root);
