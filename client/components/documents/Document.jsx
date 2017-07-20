import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import GetAccessDocuments from './GetAccessDocuments';
import { fetchAllUserDocument } from '../../actions/documentActions';

export class Documents extends React.Component {
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
    return (
      <div className="dashboardBackground">
        <div>
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
            
            currentUser={this.props.currentUser}
            documents={this.state.documents}
          />
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

Documents.defaultProps = {
  documentsFromReducer: [],
  currentUser: {},
  pagination: {}
};

Documents.propTypes = {
  fetchAllUserDocument: PropTypes.func.isRequired,
  documentsFromReducer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
