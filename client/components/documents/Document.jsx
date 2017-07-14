import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GetAccessDocuments from './GetAccessDocuments.jsx';
import { fetchAllUserDocument } from '../../actions/documentActions';

class Documents extends React.Component {
  render() {
    return (
      <div className="dashboardBackground">
        {!this.props.currentUser.id
          ? <h2>Log in to view documents</h2>
          : <div>
            <Link
              to="/create"
              style={{
                margin: '30px',
                position: 'absolute',
                left: '75rem'
              }}
              className="btn-floating btn-large waves-effect waves-light right indigo"
            >
              <i className="material-icons">
                add
              </i>
            </Link>
            <GetAccessDocuments
              fetchAllUserDocument={this.props.fetchAllUserDocument}
              documentsFromReducer={this.props.documentsFromReducer}
              currentUser={this.props.currentUser}
              pagination={this.props.pagination}
            />
          </div>
        }
      </div>
    );
  }
}

Documents.propTypes = {
  fetchAllUserDocument: PropTypes.func.isRequired,
  documentsFromReducer: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents.documents,
    pagination: state.documents.pagination,
    apiCall: state.loading,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  fetchAllUserDocument,
})(Documents);
