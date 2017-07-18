import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import DocumentCard from './DocumentCard';

export default class GetAccessDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      offset: 0,
      pageCount: 0,
      singleDocument: {},
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUserDocument().then(() => {
      this.setState({
        documents: this.props.documentsFromReducer
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const documents = nextProps.documentsFromReducer;
    const pageCount = nextProps.pagination.pageCount;
    this.setState({
      documents,
      pageCount,
    });
  }

  handlePageClick(data) {
    const selected = data.selected;
    const limit = 6;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.fetchAllUserDocument(offset, limit).then(() => {
      this.setState({
        documents: this.props.documentsFromReducer
      });
    });
  }


  render() {
    const { documents } = this.state;

    return (
      <div>
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
        <div className="paginationContainer">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

GetAccessDocuments.defaultProps = {
  documentsFromReducer: {},
  pagination: {}
};

GetAccessDocuments.propTypes = {
  fetchAllUserDocument: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  documentsFromReducer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentUser: PropTypes.object.isRequired
};
