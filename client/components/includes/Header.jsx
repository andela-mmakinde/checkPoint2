import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }
  logout() {
    localStorage.removeItem('token');
    this.setState({ logged: false });
  }

  render() {
    return (
      <nav>
        <div className="col s12 nav-wrapper indigo">
          <Link to="/document" className="brand-logo">DOC-GARAGE</Link>
          <ul id="nav-mobile" className="right ">
            <li>
              <Link
                className="dropdown-button"
                to="/document"
                data-beloworigin="true"
                data-activates="dropdown1"
              >
                  Documents
                  <i className="material-icons right">
                    arrow_drop_down
                  </i>
              </Link>
            </li>
            <li><Link id="updateProfile" to="/profile">Update Profile</Link></li>
            {this.props.currentUser.roleId === 1 && <li><Link className="users" to="/user">Users</Link></li>}
            <li><Link id="logout" to="" onClick={this.logout}>Logout</Link></li>
          </ul>

          <div>
            <ul id="dropdown1" className="dropdown-content">
              <li><Link id="myDocs" to="/docs">Owned by Me</Link></li>
              <li><Link to="/document">All documents</Link></li>
              <li>
                <Link id="createNewDoc" to="/create">Create Document</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  logout
})(Header);
