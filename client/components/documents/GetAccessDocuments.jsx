import React from 'react';
import PropTypes from 'prop-types';
import DocumentCard from './DocumentCard.jsx';

export default class GetAccessDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    this.props.fetchAllUserDocument().then(() => {
      this.setState({
        documents: this.props.documentsFromReducer,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const newDocument = nextProps.documentsFromReducer;
    this.setState({
      documents: newDocument,
    });
  }

  render() {
    const { deleteDocument } = this.props;
    const { documents } = this.state;
    return (
      <div className="container">
        <div className="row">
          {documents.map(docs => (
            <DocumentCard key={docs.title} UserDocuments={docs} deleteDocument={deleteDocument} />
          ))}
        </div>
      </div>
    );
  }
}

GetAccessDocuments.defaultProps = {
  document: null
};

GetAccessDocuments.propTypes = {
  fetchAllUserDocument: PropTypes.func.isRequired,
  documentsFromReducer: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};
