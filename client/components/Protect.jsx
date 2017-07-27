/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


const Protect = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);

Protect.defaultProps = {
  component: null,
  location: null
};
Protect.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

export default Protect;
