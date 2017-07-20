import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { userLoginRequest } from '../../actions/authActions';

export class LoginPage extends React.Component {
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
    return (
      <div className="dashboardBackground">
        <LoginForm
          userLoginRequest={this.props.userLoginRequest}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          error={this.state.error}
          email={this.state.email}
          password={this.state.password}
          logged={this.state.logged}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: Proptypes.func.isRequired,
};


export default connect(null, { userLoginRequest })(LoginPage);

