/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ConnectedHeader from '../components/includes/Header';
import Footer from '../components/includes/Footer';

const Protect = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('token') ? (
      <div>
        <ConnectedHeader />
        <div className="myContents">
          <Component {...props} />
        </div>
        <Footer />
      </div>
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
  location: PropTypes.shape({ fullName: '' }),
};

export default Protect;
