/* global Materialize */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { updateUserDetails } from '../../actions/authActions';

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.currentUser.fullName,
      email: this.props.currentUser.email,
      currentPassword: '',
      password: '',
      confirmPassword: '',
      error: {},
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
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
      password: this.state.password,
      fullName: this.state.fullName,
      email: this.state.email
    };
    if (this.state.password !== this.state.confirmPassword) {
      return Materialize.toast('passwords do not match', 2000);
    }
    this
      .props
      .updateUserDetails(this.props.currentUser.id, userDetails)
      .then(() => {
        this.setState({ success: true });
        Materialize.toast('Success', 2000);
      })
      .catch((errorData) => {
        this.setState({ error: errorData.response.data });
      });
  }
  render() {
    const { error } = this.state;
    const { success } = this.state;

    if (success) {
      return <Redirect to="/document" />;
    }

    return (
      <main className="dashboardBackground">
        <h6 className="welcomeUser">Welcome {this.props.currentUser.fullName}</h6>
        <center>
          <div className="container">
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header active">Update Details</div>
                <div className="collapsible-body">
                  <div className="row">
                    <form className="col s12" onSubmit={this.onSubmit}>
                      {error.message && Materialize.toast(error.message, 2000)}

                      <div className="input-field col s12">
                        <input
                          id="fullName"
                          value={this.state.fullName}
                          onChange={this.onChange}
                          type="text"
                          className="validate"
                          name="fullName"
                          placeholder="Change Full Name"
                        />
                      </div>

                      <div className="input-field col s12">
                        <input
                          id="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          type="email"
                          className="validate"
                          name="email"
                          placeholder="Update Email"
                        />
                      </div>

                      <button className="waves-effect waves-light btn right indigo">
                        Update Changes
                      </button>
                    </form>
                  </div>
                </div>
              </li>
              <li>
                <div className="collapsible-header">Change Password</div>
                <div className="collapsible-body">
                  <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="modal-content">
                      <div className="input-field col s12">
                        <input
                          value={this.state.password}
                          onChange={this.onChange}
                          id="password"
                          type="password"
                          name="password"
                          className="validate"
                        />
                        <label htmlFor="last_name">New Password</label>
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
                        <label htmlFor="Confirm New Password">Confirm New Password</label>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="waves-effect waves-light btn right indigo">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
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
  return { currentUser: state.auth.user };
}

export default connect(mapStateToProps, { updateUserDetails })(UserProfile);
