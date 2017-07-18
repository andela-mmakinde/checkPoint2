import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  getAllUsers,
  searchUserDb,
  deleteUserRecord,
} from '../../actions/userActions';
import SearchUsers from './SearchUsers';
import UserCard from '../../components/users/UserCard';

class Users extends React.Component {
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
          allUsers: this.props.allUsers.user,
          pageCount: this.props.allUsers.pagination.pageCount
        });
        Materialize.toast('success', 2000);
      })
      .catch((errorData) => {
        console.log(errorData);
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.allUsers.user,
      pageCount: nextProps.allUsers.pagination.pageCount
    });
  }

  handlePageClick(data) {
    const selected = data.selected;
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
    });
  }

  render() {
    const { allUsers } = this.state;
    return (
      <div className="dashboardBackground">
        <h2 className="center">All Users</h2>
        <SearchUsers className="searchUser" searchUserDb={this.props.searchUserDb} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <UserCard allUsers={allUsers} deleteUser={this.deleteUser} />
      </div>
    );
  }
}

Users.defaultProps = {
  allUsers: {},
};

Users.propTypes = {
  currentUser: PropTypes.object.isRequired,
  searchUserDb: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUserRecord: PropTypes.func.isRequired,
  allUsers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

function mapStateToProps(state) {
  return {
    allUsers: state.user,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  getAllUsers,
  searchUserDb,
  deleteUserRecord
})(Users);
