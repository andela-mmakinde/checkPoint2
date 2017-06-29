import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

class Header extends React.Component {
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
      <div>
        <nav>
          <div className="col s12 nav-wrapper indigo">
            <a href="/" className="brand-logo left">DOC-GARAGE</a>
            <ul id="nav-mobile" className="right ">
              <li>
                <Link
                  className="dropdown-button"
                  to="/document"
                  data-beloworigin="true"
                  data-activates="dropdown1"
                >
                  Documents
                  <i className="material-icons right">arrow_drop_down</i>
                </Link>
              </li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="" onClick={this.logout}>Logout</Link></li>
            </ul>
            <div>
              <ul id="dropdown1" className="dropdown-content">
                <li><Link to="/docs">Owned by Me</Link></li>
                <li><Link to="/document">Owned by Anyone</Link></li>
                <li><Link to="/document/create">Create Document</Link></li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

export default connect(null, {
  logout
})(Header);
