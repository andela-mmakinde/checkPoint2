import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { updateUserDetails } from '../../actions/userActions';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      error: {},
      success: false
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
    const userDetails = {
      currentPassword: this.state.currentPassword,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props
      .updateUserDetails(this.props.currentUser.id, userDetails)
      .then(() => {
        Materialize.toast('Update Successful', 2000);
        this.setState({ success: true });
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data
        });
      });
  }
  render() {
    const { error } = this.state;
    const { success } = this.state;

    if (success) {
      return <Redirect to="/" />;
    }

    return (
      <main className="dashboardBackground">
        <h6 className="welcomeUser">Welcome {this.props.currentUser.email}</h6>
        <center>
          <h5 className="indigo-text">Update Profile</h5>
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
                  <div className="input-field col s12">
                    <input
                      value={this.state.currentPassword}
                      onChange={this.onChange}
                      id="currentPassword"
                      type="password"
                      className="validate"
                      name="currentPassword"
                    />
                    <label htmlFor="currentPassword">Current Password</label>
                  </div>
                  {error.message && Materialize.toast(error.message, 2000)}

                  <div className="input-field col s12">
                    <input
                      value={this.state.password}
                      onChange={this.onChange}
                      id="password"
                      type="password"
                      name="password"
                      className="validate"
                    />
                    <label htmlFor="password">New Password</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      className="validate"
                    />
                    <label htmlFor="confirm password">
                      Confirm New Password
                    </label>
                  </div>
                  <center>
                    <div className="row">
                      <button
                        type="submit"
                        name="btn_signup"
                        className="col s12 btn btn-large waves-effect indigo"
                      >
                        Update Changes
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

UserProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  updateUserDetails
})(UserProfile);
