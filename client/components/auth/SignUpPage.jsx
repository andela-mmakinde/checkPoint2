import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import SignUpForm from './SignUpForm.jsx';
import { userSignUpRequest } from '../../actions/authActions';

class SignUpPage extends React.Component {

  render() {
    const { userSignUpRequest } = this.props;
    return (
      <div className="dashboardBackground">
        <SignUpForm userSignUpRequest={userSignUpRequest} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: Proptypes.func.isRequired,
};

export default connect(null, { userSignUpRequest })(SignUpPage);
