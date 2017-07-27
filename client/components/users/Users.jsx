/* global Materialize $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getAllUsers,
  searchUserDb,
  deleteUserRecord,
} from '../../actions/userActions';
import Pagination from '../Pagination';
import SearchUsers from './SearchUsers';
import UserCard from '../../components/users/UserCard';

export class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      offset: 0,
      pageCount: 0,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    $('#deleteModal2').modal();
    this.props
      .getAllUsers()
      .then(() => {
        this.setState({
          allUsers: this.props.allUsers,
          pageCount: this.props.pagination.pageCount
        });
        Materialize.toast('success', 2000);
      })
      .catch((errorData) => {
        console.log(errorData);
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.allUsers,
      pageCount: nextProps.pagination.pageCount
    });
  }

  handlePageClick(page) {
    const selected = page.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.getAllUsers(offset, limit).then(() => {
      this.setState({
        users: this.props.allUsers.user
      });
    });
  }

  deleteUser(id) {
    this.props.deleteUserRecord(id).then(() => {
      Materialize.toast('User deleted', 2000);
      this.props.getAllUsers();
    });
  }

  render() {
    const { allUsers } = this.state;
    return (
      <div className="dashboardBackground">
        <h2 className="center">All Users</h2>
        <SearchUsers
          className="searchUser"
          searchUserDb={this.props.searchUserDb}
        />
        <UserCard allUsers={allUsers} deleteUser={this.deleteUser} />
        <div className="paginationContainer">
          <Pagination
            pageCount={this.state.pageCount}
            handlePageClick={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}

Users.defaultProps = {
  allUsers: {},
};

Users.propTypes = {
  pagination: PropTypes.object.isRequired,
  searchUserDb: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUserRecord: PropTypes.func.isRequired,
  allUsers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

function mapStateToProps(state) {
  return {
    allUsers: state.user.userData,
    pagination: state.user.pagination,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  getAllUsers,
  searchUserDb,
  deleteUserRecord
})(Users);
