import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { userLoginRequest } from '../../actions/authActions';

/**
 * @export
 * @class LoginPage
 * @extends {React.Component}
 */
export class LoginPage extends React.Component {
  /**
   * Creates an instance of LoginPage.
   * @param {object} props
   *
   * @memberOf LoginPage
   */
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

  /**
   * Sets the state of inputs received from user
   *
   * @param {object} event
   * @returns {void}
   * @memberOf LoginPage
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  }

  /**
   * Makes an action call to log a user in
   *
   * @param {object} event
   * @returns {void}
   * @memberOf LoginPage
   */
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

  /**
   * @returns {String} The HTML markup for the LoginForm
   * @memberOf LoginPage
   */
  render() {
    const { logged } = this.state;
    if (logged) {
      return <Redirect to="/document" />;
    }
    return (
      <div className="dashboardBackground">
        <LoginForm
          userLoginRequest={this.props.userLoginRequest}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          error={this.state.error}
          email={this.state.email}
          password={this.state.password}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: Proptypes.func.isRequired,
};


export default connect(null, { userLoginRequest })(LoginPage);

