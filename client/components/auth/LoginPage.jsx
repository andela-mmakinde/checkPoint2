import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
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
      isLogged: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Checks if user is logged in
   * @method ComponentDidMount
   * @return {void}
   * @memberOf LoginPage
   */
  componentDidMount() {
    if (this.props.isLogged) {
      this.props.history.push('/document');
    }
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
      .then(() => this.setState({ isLogged: this.props.isLogged }))
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
    const { isLogged } = this.state;
    if (isLogged) {
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
  isLogged: Proptypes.bool.isRequired,
  history: Proptypes.shape({ push: '' }).isRequired,
};
const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps,
  { userLoginRequest })(withRouter(LoginPage));

