import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import configureStore from './store/configureStore';
import Routes from './Routes';
import setAuthorizationHeader from './utilities/setHeader';
import { setUser } from './actions/authActions';
import './main.scss';

const root = document.getElementById('root');
const store = configureStore();
// const jsonToken = localStorage.getItem('token');
// setAuthorizationHeader(jsonToken);

if (localStorage.token) {
  setAuthorizationHeader(localStorage.token);
  store.dispatch(setUser(jwtDecode(localStorage.token).userDetails));
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  root
);
