import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import { userLoginRequest } from '../../actions/authActions';

class LoginPage extends React.Component {

  render() {
    const { userLoginRequest } = this.props;
    return (
      <div className="welcome">
        <LoginForm userLoginRequest={userLoginRequest} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: Proptypes.func.isRequired,
};


export default connect(null, { userLoginRequest })(LoginPage);

