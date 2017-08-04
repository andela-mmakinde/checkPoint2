import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="error-template">
          <h1>Oops!</h1>
          <h2>Page Not Found</h2>
          <div className="error-details">
            Sorry, an error has occured, Requested page was not found!
          </div>
          <div className="error-actions">
            <Link
              to="/document"
              className="btn-large waves-effect waves-light indigo"
            >
              Take Me Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default NotFound;
