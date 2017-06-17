import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import { userLoginRequest } from '../actions/loginActions';

class LoginPage extends React.Component {
  render() {
    const { userLoginRequest } = this.props;
    return (
      <div>
        <LoginForm userLoginRequest={userLoginRequest} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: Proptypes.func.isRequired,
};


export default connect((state) => { return {}; }, { userLoginRequest })(LoginPage);
