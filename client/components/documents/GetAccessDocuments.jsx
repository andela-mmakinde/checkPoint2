import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import DocumentCard from './DocumentCard.jsx';

export default class GetAccessDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      singleDocument: {},
    };
  }

  componentDidMount() {
    this.props.fetchAllUserDocument().then(() => {
      this.setState({
        documents: this.props.documentsFromReducer
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const newDocument = nextProps.documentsFromReducer;
    this.setState({
      documents: newDocument
    });
  }

  render() {
    const { documents } = this.state;

    return (
      <div className="container">
        <div className="row">
          {documents.map(docs => (
            <DocumentCard
              key={docs.id}
              id={docs.id}
              document={docs}
              currentUser={this.props.currentUser}
            />
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
  currentUser: PropTypes.object.isRequired
};
