import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import configureStore from './store/configureStore';
import Routes from './Routes';
import setAuthorizationHeader from './utilities/setAuthorizationHeader';
import { setUser } from './actions/authActions';
import './main.scss';

const root = document.getElementById('root');
const store = configureStore();

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
