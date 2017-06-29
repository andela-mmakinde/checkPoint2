import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateDocument from './CreateDocument.jsx';
import SearchDocuments from './SearchDocuments.jsx';
import GetAccessDocuments from './GetAccessDocuments.jsx';
import {
  saveDocumentRequest,
  fetchAllUserDocument,
  myDocuments,
  deleteDocuments,
  searchDocuments
} from '../../actions/documentActions';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  deleteDocument(id) {
    this.props.deleteDocuments(id).then(() => {
      Materialize.toast('Document deleted', 2000);
    });
  }

  render() {
    return (
      <div>
        <SearchDocuments
          searchDocuments={this.props.searchDocuments}
          documentsFromReducer={this.props.documentsFromReducer}
        />
        <CreateDocument
          saveDocumentRequest={this.props.saveDocumentRequest}
          currentUser={this.props.currentUser}
          fetchAllUserDocument={this.props.fetchAllUserDocument}
        />
        <GetAccessDocuments
          fetchAllUserDocument={this.props.fetchAllUserDocument}
          documentsFromReducer={this.props.documentsFromReducer}
          deleteDocument={this.deleteDocument}
        />

      </div>
    );
  }
}

Documents.propTypes = {
  saveDocumentRequest: PropTypes.func.isRequired,
  fetchAllUserDocument: PropTypes.func.isRequired,
  documentsFromReducer: PropTypes.array.isRequired,
  deleteDocuments: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  searchDocuments: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents,
    apiCall: state.loading,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  saveDocumentRequest,
  fetchAllUserDocument,
  myDocuments,
  deleteDocuments,
  searchDocuments
})(Documents);
