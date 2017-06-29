import React from 'react';
import Proptypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
      logged: false
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
      .userLoginRequest(this.state)
      .then(() => this.setState({ logged: true }))
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
      return <Redirect to="/document" />;
    }
    return (
      <div>
        <div className="section" />
        <main>
          <center>
            <h5 className="indigo-text">Login into your account</h5>
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
                {error.message && Materialize.toast(error.message, 2000)}
                <form
                  className="col s12"
                  method="post"
                  onSubmit={this.onSubmit}
                >

                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="email"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      id="email"
                    />
                    <label>Enter your email</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      name="password"
                      id="password"
                    />
                    <label>Enter your password</label>
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
            <ul><li><Link to="/signup">Create a new account </Link></li> </ul>
          </center>
        </main>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: Proptypes.func.isRequired
};
