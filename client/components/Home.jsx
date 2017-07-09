import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div className="section homepage no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          <h1 className="header center indigo-text">
            Create impactful and meaningful documents
          </h1>
          <h3 className="center indigo-text">
            With DOC-GARAGE, you can write, edit, and read documents wherever you are. For free.
          </h3>
        </div>
        <div className="row center">
          <Link
            to="/login"
            id="download-button"
            className="btn-large waves-effect waves-light indigo"
          >
            GO TO DOC-GARAGE
          </Link>
        </div>
        <br />
      </div>
    );
  }
}
