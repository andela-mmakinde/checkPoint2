import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentCard from './DocumentCard.jsx';
import { myDocuments, deleteDocuments } from '../../actions/documentActions';

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentWillMount() {
    this.props.myDocuments(this.props.currentUser.id);
  }

  deleteDocument(id) {
    this.props
      .deleteDocuments(id)
      .then(() => Materialize.toast('Document deleted', 2000));
  }

  render() {
    const { documentsFromReducer } = this.props;
    return (
      <div className="container">
        <h1>All documents I created</h1>
        <div className="row">
          {documentsFromReducer.map(docs => (
            <DocumentCard
              key={docs.title}
              UserDocuments={docs}
              deleteDocument={this.deleteDocument}
            />
          ))}
        </div>
      </div>
    );
  }
}

UserDocuments.propTypes = {
  currentUser: PropTypes.object.isRequired,
  documentsFromReducer: PropTypes.array.isRequired,
  myDocuments: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, { myDocuments, deleteDocuments })(
  UserDocuments
);
