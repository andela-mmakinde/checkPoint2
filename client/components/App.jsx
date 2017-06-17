import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <nav>
    <div className="col s12 nav-wrapper indigo">
      <a href="/" className="brand-logo left">Logo</a>
      <ul id="nav-mobile" className="right ">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/document">Documents</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </div>
  </nav>
  );

export default App;
