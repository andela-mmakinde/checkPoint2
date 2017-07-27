/* global Materialize */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * LoginForm component.
 * @returns {String} The HTML markup for the login component
 */
const LoginForm = ({ onSubmit, onChange, error, password, email }) => (
  <div>
    <div className="section" />
    <main>
      <center>
        <h5 className="indigo-text">Login into your account</h5>
        <div className="section" />

        <div className="container">
          <div
            className="z-depth-1 grey authForm lighten-4 row"
          >
            {error.message && Materialize.toast(error.message, 2000)}
            <form
              className="col s12"
              method="post"
              onSubmit={onSubmit}
            >

              <div className="input-field col s12">
                <input
                  className="validate required"
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  id="email"
                  required
                />
                <label htmlFor="email">Enter your email</label>
              </div>

              <div className="input-field col s12">
                <input
                  className="validate required"
                  type="password"
                  onChange={onChange}
                  value={password}
                  name="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Enter your password</label>
              </div>
              <button
                type="submit"
                name="btn_login"
                className="col s12 btn btn-large waves-effect indigo"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <ul>
          <li>
            <Link to="/signup">Create a new account </Link>
          </li>
        </ul>
      </center>
    </main>
  </div>
);
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({ message: '' }).isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default LoginForm;
