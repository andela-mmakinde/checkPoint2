/* global Materialize */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

const SignUpForm = ({
  logged,
  error,
  onChange,
  onSubmit,
  fullName,
  email,
  password,
  confirmPassword
}) => {
  if (logged) {
    return <Redirect to="/document" />;
  }
  return (
    <main>
      <div className="section" />
      <center>
        <h5 className="indigo-text">Create a new account</h5>
        <div className="section" />
        <div className="container">
          <div
            className="z-depth-1 grey lighten-4 row"
            style={{
              display: 'inline-block',
              padding: '32px 48px 0px 48px',
              border: '1px solid #EEE'
            }}
          >
            <div className="row">
              <form className="col s12" onSubmit={onSubmit}>
                {error.message && Materialize.toast(error.message, 2000)}
                <div className="input-field col s12">
                  <input
                    id="fullName"
                    value={fullName}
                    onChange={onChange}
                    type="text"
                    className="validate"
                    name="fullName"
                  />
                  <label htmlFor="fullName">Full Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="email"
                    value={email}
                    onChange={onChange}
                    type="email"
                    className="validate"
                    name="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="password"
                    value={password}
                    onChange={onChange}
                    type="password"
                    name="password"
                    className="validate"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="input-field col s12">
                  <input
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    type="password"
                    name="confirmPassword"
                    className="validate"
                  />
                  <label htmlFor="confirm password">Confirm Password</label>
                </div>
                <ul> <li><Link to="/login">Have an account? &ensp; Sign in</Link></li> </ul>
                <center>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_signup"
                      className="col s12 btn btn-large waves-effect indigo"
                    >
                      Sign Up
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </div>
      </center>
    </main>
  );
};
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default SignUpForm;
