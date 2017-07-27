/* global Materialize */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * SignUpForm component.
 * @returns {String} The HTML markup for the sign up component
 */
const SignUpForm = ({
  error,
  onChange,
  onSubmit,
  fullName,
  email,
  password,
  confirmPassword
}) => (
  <main>
    <div className="section" />
    <center>
      <h5 className="indigo-text">Create a new account</h5>
      <div className="section" />
      <div className="container">
        <div
          className="z-depth-1 grey authForm lighten-4 row"
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
                  required
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
                  required
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
                  required
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
                  required
                />
                <label htmlFor="confirm password">Confirm Password</label>
              </div>
              <ul>
                <li>
                  <Link to="/login">Have an account? &ensp; Sign in</Link>
                </li>
              </ul>
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
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: '' }).isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
};

export default SignUpForm;
