import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  getAllUsers,
  searchUserDb,
  deleteUserRecord,
} from '../../actions/userActions';
import SearchUsers from './SearchUsers.jsx';
import UserCard from '../../components/users/UserCard.jsx';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    $('#deleteModal2').modal();
    this.props
      .getAllUsers()
      .then(() => {
        this.setState({
          allUsers: this.props.allUsers
        });
        Materialize.toast('success', 2000);
      })
      .catch((errorData) => {
        console.log(errorData);
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.allUsers
    });
  }

  deleteUser(id) {
    this.props.deleteUserRecord(id).then(() => {
      Materialize.toast('User deleted', 2000);
    });
    // this.props.getAllUsers();
  }

  render() {
    const { allUsers } = this.state;
    return (
      <div className="dashboardBackground">
        <h2 className="center">All Users</h2>
        <SearchUsers className="searchUser" searchUserDb={this.props.searchUserDb} />
        <UserCard allUsers={allUsers} deleteUser={this.deleteUser} />
      </div>
    );
  }
}

Users.propTypes = {
  currentUser: PropTypes.object.isRequired,
  searchUserDb: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUserRecord: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    allUsers: state.user.user,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  getAllUsers,
  searchUserDb,
  deleteUserRecord
})(Users);
