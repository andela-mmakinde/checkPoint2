import React from 'react';
import Proptypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: {},
      logged: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  }
  onSubmit(event) {
    this.setState({ error: {} });
    event.preventDefault();
    this.props
      .userSignUpRequest(this.state)
      .then(() => {
        this.setState({ logged: true });
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data
        });
      });
  }
  render() {
    const { error } = this.state;
    const { logged } = this.state;
    if (logged) {
      return <Redirect to="/" />;
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
                <form className="col s12" onSubmit={this.onSubmit}>
                  {error.message && Materialize.toast(error.message, 2000)}
                  <div className="input-field col s12">
                    <input
                      id="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      className="validate"
                      name="email"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      type="password"
                      name="password"
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      id="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
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
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: Proptypes.func.isRequired
};
