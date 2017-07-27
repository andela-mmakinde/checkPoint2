import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import SignUpForm from './SignupForm';
import { userSignUpRequest } from '../../actions/authActions';

export class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullName: '',
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
    const userDetailsToSave = {
      email: this.state.email,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props
      .userSignUpRequest(userDetailsToSave)
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
    const { logged } = this.state;
    if (logged) {
      return <Redirect to="/document" />;
    }
    return (
      <div className="dashboardBackground">
        <SignUpForm
          userSignUpRequest={this.props.userSignUpRequest}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          error={this.state.error}
          email={this.state.email}
          fullName={this.state.fullName}
          confirmPassword={this.state.confirmPassword}
          password={this.state.password}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: Proptypes.func.isRequired,
};

export default connect(null, { userSignUpRequest })(SignUpPage);
