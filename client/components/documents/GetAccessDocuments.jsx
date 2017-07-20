import React from 'react';
import PropTypes from 'prop-types';
import DocumentCard from './DocumentCard';

const GetAccessDocuments = ({ documents, currentUser }) => (
  <div>
    <div className="container">
      <div className="row">
        {documents.map(docs => (
          <DocumentCard
            key={docs.id}
            id={docs.id}
            document={docs}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  </div>
);

GetAccessDocuments.defaultProps = {
  documents: {},
  currentUser: {}
};

GetAccessDocuments.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default GetAccessDocuments;

