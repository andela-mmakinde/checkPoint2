import React from 'react';
import Proptypes from 'prop-types'
import SignUpForm from './SignUpForm.jsx';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../actions/signUpActions'

class SignUpPage extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    const { userSignUpRequest } = this.props;
    return (
      <div>
        <SignUpForm userSignUpRequest = { userSignUpRequest }/>
      </div>
    )
  }
}

SignUpPage.propTypes = {
  userSignUpRequest: Proptypes.func.isRequired,
}

export default connect((state) => { return {}}, { userSignUpRequest })(SignUpPage);