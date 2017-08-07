import React from 'react';
import PropTypes from 'prop-types';
import DocumentCard from './DocumentCard';

/**
 * GetAccessDocuments component.
 * @returns {String} The HTML markup for the document card component
 */
const GetAccessDocuments = ({ documents, currentUser, deleteDocument }) => (
  <div>
    {documents.length > 0 ? (
      <div className="container">
        <div className="row">
          {documents.map(docs => (
            <DocumentCard
              key={docs.id}
              id={docs.id}
              document={docs}
              currentUser={currentUser}
              deleteDocument={deleteDocument}
            />
          ))}
        </div>
      </div>
    ) : (
      <h3 className="notFound">No document found</h3>
    )}
  </div>
);

GetAccessDocuments.defaultProps = {
  documents: {},
  currentUser: {}
};

GetAccessDocuments.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  deleteDocument: PropTypes.func.isRequired
};

export default GetAccessDocuments;

